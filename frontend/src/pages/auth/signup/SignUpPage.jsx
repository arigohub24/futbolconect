import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  fullName: yup.string().required("Full name is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/verify", { state: { email: data.email } });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Panel - Form Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-center md:text-left mb-6">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-blue-600"
            >
              Welcome to
            </motion.h3>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-900"
            >
              Futbol<span className="text-blue-600">Connect</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-gray-600"
            >
              The ultimate football community platform
            </motion.p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-gray-800 mb-6"
            >
              Create Account
            </motion.h2>
            
            {isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm"
              >
                {error.message}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                    placeholder="your@email.com"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                      errors.username ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                    placeholder="Choose a username"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                      errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                    placeholder="Your full name"
                    {...register("fullName")}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                      errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-blue-500 outline-none transition text-base`}
                    placeholder="Create a password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-500 hover:text-gray-700" />
                    ) : (
                      <FiEye className="text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isPending}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-base ${
                    isPending ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Sign Up <FiArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Visual Side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center relative overflow-hidden">
          <div className="absolute w-full h-full">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 w-full max-w-lg px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-4xl font-bold mb-4"
              >
                Revolutionize Your Transfer Strategy
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl mb-8"
              >
                Direct access to the global football marketplace - buy, sell and discover talent efficiently
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="flex flex-wrap justify-center gap-6 max-w-md mx-auto"
              >
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 w-32 text-center">
                  <div className="text-3xl mb-1">85%</div>
                  <div className="text-sm opacity-80">Faster Deals</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 w-32 text-center">
                  <div className="text-3xl mb-1">150+</div>
                  <div className="text-sm opacity-80">Countries</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 w-32 text-center">
                  <div className="text-3xl mb-1">24/7</div>
                  <div className="text-sm opacity-80">Support</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 w-32 text-center">
                  <div className="text-3xl mb-1">4.9⭐</div>
                  <div className="text-sm opacity-80">Agent Rating</div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 flex items-center text-white text-sm">
            <div className="mr-1 font-bold">Transfer</div>
            <div className="text-blue-300">Pro</div>
          </div>
        </div>
    </div>
  );
};

export default SignUpPage;