import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {loginSchema} from "../schemas/auth.schema.js"
import { useLogin } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const LoginPage = () => {

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
    } = useForm({
            resolver: zodResolver(loginSchema),
    });

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Login successful");
        navigate("/user");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-[#1a1a1a] border border-[#333333] p-10 rounded-2xl shadow-2xl backdrop-blur-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 mt-2 text-sm">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              {...register("email", { 
                required: "Email is required", 
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
              })}
              className={`w-full bg-[#0a0a0a] border ${errors.email ? 'border-red-500' : 'border-[#333333]'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
              placeholder="name@company.com"
            />
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Minimum 6 characters" } 
              })}
              className={`w-full bg-[#0a0a0a] border ${errors.password ? 'border-red-500' : 'border-[#333333]'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
              placeholder="••••••••"
            />
            {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
