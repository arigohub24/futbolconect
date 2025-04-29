import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiGlobe, FiPhone, FiUser, FiArrowRight } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const onboardingSchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  phoneNumber: yup.string().required("Phone number is required").matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  role: yup.string().required("Role is required"),
  roleDetails: yup.object().shape({
    player: yup.object().when('$role', {
      is: 'player',
      then: yup.object({
        currentClub: yup.string().required("Current club is required"),
        agency: yup.string().required("Agency is required"),
        dateOfBirth: yup.string().required("Date of birth is required"),
      }),
      otherwise: yup.object(),
    }),
    coach: yup.object().when('$role', {
      is: 'coach',
      then: yup.object({
        currentClub: yup.string().required("Current club is required"),
        coachingLicense: yup.string().required("Coaching license is required"),
      }),
      otherwise: yup.object(),
    }),
    clubStaff: yup.object().when('$role', {
      is: 'clubStaff',
      then: yup.object({
        club: yup.string().required("Club is required"),
        position: yup.string().required("Position is required"),
      }),
      otherwise: yup.object(),
    }),
    agent: yup.object().when('$role', {
      is: 'agent',
      then: yup.object({
        agency: yup.string().required("Agency is required"),
        licenseNumber: yup.string().required("License number is required"),
      }),
      otherwise: yup.object(),
    }),
    footballManager: yup.object().when('$role', {
      is: 'footballManager',
      then: yup.object({
        currentClub: yup.string().required("Current club is required"),
        yearsOfExperience: yup.number().required("Years of experience is required").min(0),
      }),
      otherwise: yup.object(),
    }),
  }),
  referralSource: yup.string().required("Referral source is required"),
  termsAccepted: yup.boolean().oneOf([true], "You must accept the terms and privacy policy"),
});

const OnboardingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(onboardingSchema),
    context: { role }
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await fetch("/api/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, email: location.state?.email }),
        });

        const responseData = await res.json();
        if (!res.ok) throw new Error(responseData.error || "Failed to save onboarding data");
        return responseData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Onboarding completed successfully");
      navigate("/welcome");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const roleFields = {
    player: (
      <>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Club</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.player?.currentClub ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your current club"
            {...register("roleDetails.player.currentClub")}
          />
          {errors.roleDetails?.player?.currentClub && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.player.currentClub.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.player?.agency ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your agency"
            {...register("roleDetails.player.agency")}
          />
          {errors.roleDetails?.player?.agency && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.player.agency.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.player?.dateOfBirth ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            {...register("roleDetails.player.dateOfBirth")}
          />
          {errors.roleDetails?.player?.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.player.dateOfBirth.message}</p>
          )}
        </motion.div>
      </>
    ),
    coach: (
      <>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Club</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.coach?.currentClub ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your current club"
            {...register("roleDetails.coach.currentClub")}
          />
          {errors.roleDetails?.coach?.currentClub && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.coach.currentClub.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Coaching License</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.coach?.coachingLicense ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your coaching license"
            {...register("roleDetails.coach.coachingLicense")}
          />
          {errors.roleDetails?.coach?.coachingLicense && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.coach.coachingLicense.message}</p>
          )}
        </motion.div>
      </>
    ),
    clubStaff: (
      <>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Club</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.clubStaff?.club ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your club"
            {...register("roleDetails.clubStaff.club")}
          />
          {errors.roleDetails?.clubStaff?.club && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.clubStaff.club.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.clubStaff?.position ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your position"
            {...register("roleDetails.clubStaff.position")}
          />
          {errors.roleDetails?.clubStaff?.position && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.clubStaff.position.message}</p>
          )}
        </motion.div>
      </>
    ),
    agent: (
      <>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.agent?.agency ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your agency"
            {...register("roleDetails.agent.agency")}
          />
          {errors.roleDetails?.agent?.agency && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.agent.agency.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.agent?.licenseNumber ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your license number"
            {...register("roleDetails.agent.licenseNumber")}
          />
          {errors.roleDetails?.agent?.licenseNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.agent.licenseNumber.message}</p>
          )}
        </motion.div>
      </>
    ),
    footballManager: (
      <>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Club</label>
          <input
            type="text"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.footballManager?.currentClub ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter your current club"
            {...register("roleDetails.footballManager.currentClub")}
          />
          {errors.roleDetails?.footballManager?.currentClub && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.footballManager.currentClub.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
          <input
            type="number"
            className={`w-full py-3 px-4 rounded-lg border ${
              errors.roleDetails?.footballManager?.yearsOfExperience ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
            } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
            placeholder="Enter years of experience"
            {...register("roleDetails.footballManager.yearsOfExperience")}
          />
          {errors.roleDetails?.footballManager?.yearsOfExperience && (
            <p className="mt-1 text-sm text-red-500">{errors.roleDetails.footballManager.yearsOfExperience.message}</p>
          )}
        </motion.div>
      </>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900"
          >
            Futbol<span className="text-blue-800">Connect</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-800 mt-2"
          >
            Step 2: Complete Your Profile
          </motion.h2>
        </div>

        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm"
          >
            {error.message}
          </motion.div>
        )}

        <div onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiGlobe className="text-gray-400" />
              </div>
              <select
                className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                  errors.country ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
                } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
                {...register("country")}
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="BR">Brazil</option>
                <option value="DE">Germany</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            {errors.country && (
              <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                type="text"
                className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                  errors.phoneNumber ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
                } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
                placeholder="+1234567890"
                {...register("phoneNumber")}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                  errors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
                } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
                placeholder="Enter your first name"
                {...register("firstName")}
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                  errors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
                } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
                placeholder="Enter your last name"
                {...register("lastName")}
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
            <select
              className={`w-full py-3 px-4 rounded-lg border ${
                errors.role ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
              } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
              {...register("role")}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="player">Player</option>
              <option value="coach">Coach</option>
              <option value="clubStaff">Club Staff</option>
              <option value="agent">Agent</option>
              <option value="footballManager">Football Manager</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </motion.div>

          {role && roleFields[role]}

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Where did you hear about us?</label>
            <select
              className={`w-full py-3 px-4 rounded-lg border ${
                errors.referralSource ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
              } focus:ring-2 focus:border-blue-800 outline-none transition text-base`}
              {...register("referralSource")}
            >
              <option value="">Select an option</option>
              <option value="socialMedia">Social Media</option>
              <option value="friend">Friend/Colleague</option>
              <option value="advertisement">Advertisement</option>
              <option value="event">Event/Conference</option>
              <option value="other">Other</option>
            </select>
            {errors.referralSource && (
              <p className="mt-1 text-sm text-red-500">{errors.referralSource.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 text-blue-800 border-gray-300 rounded focus:ring-blue-800"
                {...register("termsAccepted")}
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <a href="/terms" className="text-blue-800 hover:underline">Terms of Service</a> and{' '}
                <a href="/privacy" className="text-blue-800 hover:underline">Privacy Policy</a>
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="mt-1 text-sm text-red-500">{errors.termsAccepted.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="pt-2"
          >
            <button
              type="submit"
              disabled={isPending}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-800 text-white font-medium shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 transition-all duration-200 text-base ${
                isPending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Book a Demo <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;