# Task Management System - Full Stack Application

A comprehensive full-stack task management application with role-based authentication, featuring a scalable REST API backend and a modern React frontend.

## 🚀 Features

### Authentication & Authorization
- **User Registration & Login** with JWT tokens
- **Role-based Access Control** (User/Admin roles)
- **Protected Routes** with automatic redirects
- **Secure Password Hashing** with bcrypt
- **Session Management** with HTTP-only cookies

### Task Management
- **CRUD Operations** for tasks (Create, Read, Update, Delete)
- **Task Status Tracking** (Pending, In Progress, Done)
- **User-specific Tasks** with admin oversight
- **Real-time Updates** with optimistic UI
- **Form Validation** with Zod schemas

### User Interface
- **Responsive Design** with Tailwind CSS
- **Role-based Dashboards** (User/Admin)
- **Interactive Forms** with React Hook Form
- **Toast Notifications** for user feedback
- **Loading States** and error handling

### API Features
- **RESTful API** with versioning (`/api/v1`)
- **Comprehensive Documentation** with Swagger UI
- **Input Validation** and sanitization
- **Error Handling** with custom middleware
- **Rate Limiting** and security headers

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js with Express 5
- **Database**: MySQL with connection pooling
- **Authentication**: JWT with bcrypt hashing
- **Validation**: Zod schemas
- **Security**: Helmet, CORS, rate limiting
- **Documentation**: Swagger/OpenAPI
- **Development**: Nodemon for hot reload

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
assignment-1/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # MySQL connection pool
│   │   │   ├── env.js         # Environment validation
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── task.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── task.model.js
│   │   ├── routes/
│   │   │   ├── index.js       # API versioning
│   │   │   ├── auth.route.js
│   │   │   └── task.route.js
│   │   ├── schemas/
│   │   │   ├── auth.schema.js
│   │   │   └── task.schema.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── task.service.js
│   │   └── utils/
│   │       ├── AppError.js
│   │       └── jwt.js
│   ├── app.js                 # Express app setup
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── task.api.js    # Task API client
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js     # Auth hooks
│   │   │   └── useTask.js     # Task CRUD hooks
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── UserPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── schemas/
│   │   │   └── auth.schema.js
│   │   ├── App.jsx
│   │   ├── api.js             # Axios instance
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Task Table
```sql
CREATE TABLE task (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	title VARCHAR(120) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed'),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT task_ref FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE      
);
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your MySQL credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=assignment
   JWT_SECRET_KEY=your_jwt_secret
   ENCRYPTION_SECRET=your_encryption_secret
   ```

4. **Start MySQL service** (if not running)
   ```bash
   # On Windows
   net start mysql

   # On macOS
   brew services start mysql

   # On Linux
   sudo systemctl start mysql
   ```

5. **Create database**
   ```sql
   CREATE DATABASE assignment;
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | User login | Public |
| GET | `/api/v1/auth/me` | Get current user info | Authenticated |
| GET | `/api/v1/auth/users` | Get all users | Admin only |

### Tasks
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/tasks` | Get user's tasks | Authenticated |
| POST | `/api/v1/tasks` | Create new task | Authenticated |
| PUT | `/api/v1/tasks/:id` | Update task | Owner/Admin |
| DELETE | `/api/v1/tasks/:id` | Delete task | Owner/Admin |

## 🎨 Frontend Features

### User Dashboard
- **Task Management**: Create, view, edit, and delete tasks
- **Status Tracking**: Visual status indicators (Pending/In Progress/Done)
- **User Profile**: Display username and email
- **Responsive Design**: Works on desktop and mobile

### Admin Dashboard
- **User Overview**: Card-based layout showing all users
- **Task Insights**: View tasks for each user
- **Management Tools**: Admin controls for oversight

### Authentication Flow
- **Login Form**: Email/password with validation
- **Role-based Redirects**: Automatic routing based on user role
- **Protected Routes**: Unauthorized access prevention
- **Session Persistence**: Automatic login state management

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **HTTP-only Cookies**: XSS protection for tokens
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: API protection against abuse
- **CORS Configuration**: Restricted cross-origin access
- **Helmet Headers**: Security headers for production

## 📚 API Documentation

Access the interactive API documentation at:
```
http://localhost:5000/api/docs
```

The documentation includes:
- Detailed endpoint descriptions
- Request/response examples
- Authentication requirements
- Schema definitions

## 🧪 Testing the Application

### Default Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123` (or check your seed data)

### Sample User Registration
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123ABC"
}
```

### Sample Task Creation
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "in_progress"
}
```

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment
2. Use a process manager like PM2
3. Configure production database
4. Set up SSL certificates
5. Enable rate limiting and monitoring

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Serve static files from `dist/` directory
3. Configure API base URL for production


## 🔧 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests (if implemented)

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- ESLint configuration for code linting
- Prettier for code formatting
- TypeScript-ready structure for future migration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Failed**
- Ensure MySQL is running
- Check `.env` credentials
- Verify database exists

**CORS Errors**
- Check backend CORS configuration
- Ensure correct frontend base URL

**Authentication Issues**
- Verify JWT secret in `.env`
- Check token expiration
- Clear browser cookies/localStorage

**Build Errors**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are installed

## 📞 Support

For questions or issues:
1. Check the API documentation
2. Review the code comments
3. Open an issue on GitHub
4. Check the troubleshooting section above

---

**Happy coding! 🎉**

this line is add to test the FlowAI
