import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful");
      navigate("/dashboard"); // Redirect to dashboard for existing users
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Panel - Form Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center md:text-left mb-6">
            <h3 className="text-lg font-medium text-blue-600">Welcome to</h3>
            <Link to="/" className="no-underline">
              <h1 className="text-3xl font-bold text-gray-900">
                Futbol<span className="text-blue-600">Connect</span>
              </h1>
            </Link>
            <p className="mt-2 text-gray-600">The ultimate football community platform</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your password"
                    required
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
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-600 font-medium hover:text-blue-800">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center relative overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 w-full max-w-lg px-6">
            <h2 className="text-4xl font-bold mb-4">The Premium Football Transfer Marketplace</h2>
            <p className="text-xl mb-8">Connect directly with clubs, players, and agents worldwide</p>
            <div className="flex flex-wrap justify-center gap-6 max-w-md mx-auto">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 w-32 text-center">
                <div className="text-3xl mb-1">10K+</div>
                <div className="text-sm opacity-80">Player Profiles</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 w-32 text-center">
                <div className="text-3xl mb-1">2,500+</div>
                <div className="text-sm opacity-80">Clubs Connected</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 w-32 text-center">
                <div className="text-3xl mb-1">1,800+</div>
                <div className="text-sm opacity-80">Transfers Made</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center text-white text-sm">
          <div className="mr-1 font-bold">Futbol</div>
          <div className="text-blue-300">Connect</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;