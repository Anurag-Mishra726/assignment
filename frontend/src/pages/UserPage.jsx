import { useState } from 'react';
import { useTask } from '../hooks/useTask';
import { useQuery } from '@tanstack/react-query';
import { aboutMe } from '../hooks/useAuth';
import api from "../utils/api";
import { Plus, Pencil, Trash2, User, ClipboardList, CheckCircle2, Clock, Loader2 } from 'lucide-react'; // Optional: for better icons

const UserPage = () => {
  const { tasks, isLoadingTasks, createTask, isCreatingTask, updateTask, isUpdatingTask, deleteTask, isDeletingTask } = useTask();
  
  const { data: userData } = aboutMe();

  const [taskInput, setTaskInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [statusInput, setStatusInput] = useState('pending');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    if (editingId) {
      updateTask({ id: editingId, data: { title: taskInput, description: descInput, status: statusInput } });
      setEditingId(null);
    } else {
      createTask({ title: taskInput, description: descInput, status: statusInput });
    }
    setTaskInput('');
    setDescInput('');
    setStatusInput('pending');
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTaskInput(task.title);
    setDescInput(task.description || '');
    setStatusInput(task.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  if (isLoadingTasks) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-slate-200">
      <Loader2 className="animate-spin mr-2" /> Loading your workspace...
    </div>
  );
  

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Task Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Manage your productivity efficiently.</p>
          </div>
          {userData && (
            <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
              <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                <User size={20} />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold leading-none">{userData['data'].data.username}</p>
                <p className="text-xs text-slate-500">{userData['data'].data.email}</p>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Form Section --- */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 rounded-3xl sticky top-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Plus size={20} className="text-blue-400" />
                {editingId ? 'Edit Task' : 'Create New Task'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Title</label>
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="E.g. Design Landing Page"
                    className="w-full mt-1 bg-slate-900/50 border border-slate-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    placeholder="Details about this task..."
                    className="w-full mt-1 bg-slate-900/50 border border-slate-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Status</label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full mt-1 bg-slate-900/50 border border-slate-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="in_progress">🚀 In Progress</option>
                    <option value="done">✅ Done</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isCreatingTask || isUpdatingTask}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {(isCreatingTask || isUpdatingTask) ? <Loader2 className="animate-spin" size={18} /> : (editingId ? 'Update Task' : 'Add Task')}
                </button>
                {editingId && (
                  <button 
                    type="button"
                    onClick={() => {setEditingId(null); setTaskInput(''); setDescInput('');}}
                    className="w-full bg-transparent border border-slate-600 text-slate-400 py-2 rounded-xl hover:bg-slate-700 transition-all"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* --- Tasks List Section --- */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ClipboardList size={20} className="text-emerald-400" />
              Your Tasks ({tasks?.length || 0})
            </h2>
            
            {tasks && tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="group bg-slate-800/30 border border-slate-700/50 p-5 rounded-2xl hover:border-blue-500/50 transition-all hover:bg-slate-800/50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h3>
                      <StatusBadge status={task.status} />
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 italic">
                      {task.description || "No description provided."}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-700/50 pt-4">
                      <div className="flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                        <span className="flex items-center gap-1"><Clock size={12}/> Updated {new Date(task.updated_at).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleEdit(task)} 
                          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                          title="Edit Task"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(task.id)} 
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                          disabled={isDeletingTask}
                          title="Delete Task"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-800/20 border border-dashed border-slate-700 rounded-3xl">
                <CheckCircle2 size={48} className="mx-auto text-slate-600 mb-4" />
                <p className="text-slate-500">No tasks found. Time to relax or create one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    pending: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles.pending}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default UserPage;