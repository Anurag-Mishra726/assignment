import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {registerSchema} from "../schemas/auth.schema"
import { useSignup } from '../hooks/useAuth';
import {toast} from 'react-hot-toast';

const SignupPage = () => {

    const signupMutation = useSignup();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async(data) => {
      console.log(data);
      signupMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Account Created Successfully");
          navigate("/login");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Signup failed");
        }
      });
    };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-[#333333] p-10 rounded-2xl shadow-2xl backdrop-blur-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-gray-400 mt-2 text-sm">Join FlowAI and start automating.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              {...register("username", { required: "Name is required" })}
              className={`w-full bg-[#0a0a0a] border ${errors.name ? 'border-red-500' : 'border-[#333333]'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
              placeholder="John Doe"
            />
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              {...register("email", { 
                required: "Email is required", 
              })}
              className={`w-full bg-[#0a0a0a] border ${errors.email ? 'border-red-500' : 'border-[#333333]'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
              placeholder="name@company.com"
            />
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { 
                required: "Password is required", 
              })}
              className={`w-full bg-[#0a0a0a] border ${errors.password ? 'border-red-500' : 'border-[#333333]'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
              placeholder="••••••••"
            />
            {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", { 
                required: "Please confirm your password",
              })}
              className={`w-full bg-[#0a0a0a] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#333333]'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98] mt-4"
          >
            Create Free Account
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#333333] pt-6">
          <p className="text-gray-500 text-sm">
            Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
