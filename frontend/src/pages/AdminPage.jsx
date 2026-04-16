import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from "../utils/api";
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/auth/users').then(res => res.data.data),
  });

  // Filter logic for the search bar
  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-slate-200">
      <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
      <p className="text-slate-400 font-medium tracking-widest">LOADING DIRECTORY</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center gap-4 text-red-400">
        <AlertCircle size={32} />
        <div>
          <h2 className="font-bold text-lg">Connection Error</h2>
          <p className="text-sm opacity-80">Failed to fetch the user directory. Please check your admin privileges.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <ShieldCheck size={18} />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Internal Access</span>
            </div>
            <h1 className="text-4xl font-black text-white">User Directory</h1>
            <p className="text-slate-500 mt-1">Managing {users?.length || 0} registered accounts</p>
          </div>
        </div>

        <div className="bg-slate-800/20 border border-slate-700/50 rounded-3xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/40 border-b border-slate-700">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredUsers?.map((user) => (
                  <tr key={user.userId} className="hover:bg-blue-500/5 transition-colors group">
                    {/* User Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-100">{user.username}</div>
                        </div>
                      </div>
                    </td>


                    <td className="px-6 py-5">
                      <div>
                          <div className="text-lg text-white flex items-center gap-2 mt-0.5">
                            {user.email}
                          </div>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}