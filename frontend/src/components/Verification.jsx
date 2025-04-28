"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Shield, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

// Blue theme colors with extended palette
const COLORS = {
  primary: "#1E90FF",       // Dodger blue
  secondary: "#4169E1",     // Royal blue
  accent: "#4682B4",        // Steel blue
  success: "#1E90FF",       // Success blue
  background: "#F5FAFF",    // Very light blue
  text: "#1A3C5A",          // Dark blue
  lightText: "#5A789A",     // Light blue
  gradientStart: "#1E90FF",
  gradientEnd: "#00C4FF",
}

const Verification = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    role: "",
    scoutType: "",
    club: "",
    currentClub: "",
    currentAgency: "",
    dateOfBirth: "",
    organizationName: "",
    jobTitle: "",
    coachingLicense: "",
    yearsExperience: "",
    agencyName: "",
    licenseNumber: "",
    referral: "",
    agreeToPolicy: false,
  })
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Parallax effect for background
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100])

  // Check authentication status
  const authUserData = queryClient.getQueryData(["authUser"])
  const authUser = authUserData?.data || {}

  useEffect(() => {
    if (authUser?.isVerified) {
      navigate("/dashboard")
    }
  }, [authUser, navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const requiredFields = ["firstName", "lastName", "country", "phoneNumber", "role", "referral"]
      if (formData.role === "scout") {
        requiredFields.push("scoutType", "club")
      } else if (formData.role === "player") {
        requiredFields.push("currentClub", "dateOfBirth")
      } else if (formData.role === "club_staff") {
        requiredFields.push("organizationName", "jobTitle")
      } else if (formData.role === "coach") {
        requiredFields.push("coachingLicense", "yearsExperience")
      } else if (formData.role === "agent") {
        requiredFields.push("agencyName", "licenseNumber")
      }

      const missingFields = requiredFields.filter(field => !formData[field])
      if (missingFields.length > 0) {
        throw new Error("Please fill in all required fields")
      }
      if (!formData.agreeToPolicy) {
        throw new Error("You must agree to the Privacy Policy")
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    } catch (err) {
      setError(err.message || "Failed to submit details")
    }
  }

  const handleContinue = () => {
    navigate("/dashboard")
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[url('/football-pattern.png')] opacity-5"
      />

      {/* Form Section - Left Half */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center px-4 py-12 sm:px-8 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-10 h-10" style={{ color: COLORS.primary }} />
            <span className="text-3xl font-extrabold tracking-tight" style={{ color: COLORS.primary }}>
              FUTBOL
              <span style={{ color: COLORS.accent }}>CONECT</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm" />

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="absolute top-6 left-6 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200 transition-colors"
            style={{ color: COLORS.lightText }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Header */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-8"
            style={{ color: COLORS.primary }}
          >
            Join Futbol Conect
          </motion.h1>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium shadow-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Icon Header */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center mb-6"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100"
                    style={{ backgroundColor: `${COLORS.primary}10` }}
                  >
                    <Shield className="w-8 h-8" style={{ color: COLORS.primary }} />
                  </div>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-center text-gray-600 mb-6"
                  style={{ color: COLORS.lightText }}
                >
                  Complete your profile to join the Futbol Conect network
                </motion.p>

                {/* Form Fields */}
                {[
                  { id: "firstName", label: "First Name", type: "text", placeholder: "John" },
                  { id: "lastName", label: "Last Name", type: "text", placeholder: "Doe" },
                  { id: "country", label: "Country", type: "text", placeholder: "United States" },
                  { id: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "+1 123 456 7890" },
                ].map(field => (
                  <motion.div variants={itemVariants} key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium mb-2"
                      style={{ color: COLORS.text }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                      style={{
                        borderColor: `${COLORS.primary}40`,
                        color: COLORS.text,
                      }}
                      placeholder={field.placeholder}
                      required
                    />
                  </motion.div>
                ))}

                {/* Role Selection */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.text }}
                  >
                    Which best describes you?
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                    style={{
                      borderColor: `${COLORS.primary}40`,
                      color: COLORS.text,
                    }}
                    required
                  >
                    <option value="">Select a role</option>
                    {["coach", "agent", "scout", "player", "club_staff"].map(role => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1).replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Role-specific Fields */}
                <AnimatePresence>
                  {formData.role === "scout" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="scoutType"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          What do you scout for?
                        </label>
                        <select
                          id="scoutType"
                          name="scoutType"
                          value={formData.scoutType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          required
                        >
                          <option value="">Select scouting type</option>
                          {["player", "coach", "agent"].map(type => (
                            <option key={type} value={type}>
                              Scout for {type.charAt(0).toUpperCase() + type.slice(1)}s
                            </option>
                          ))}
                        </select>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="club"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Club/Organization
                        </label>
                        <select
                          id="club"
                          name="club"
                          value={formData.club}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          required
                        >
                          <option value="">Select a club</option>
                          {[
                            "fc_barcelona",
                            "real_madrid",
                            "manchester_united",
                            "chelsea_fc",
                            "other",
                          ].map(club => (
                            <option key={club} value={club}>
                              {club
                                .split("_")
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    </motion.div>
                  )}

                  {formData.role === "player" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="currentClub"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Current Club
                        </label>
                        <input
                          type="text"
                          id="currentClub"
                          name="currentClub"
                          value={formData.currentClub}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          placeholder="e.g., FC Barcelona"
                          required
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="currentAgency"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Current Agency (Optional)
                        </label>
                        <input
                          type="text"
                          id="currentAgency"
                          name="currentAgency"
                          value={formData.currentAgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          placeholder="e.g., Stellar Group"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="dateOfBirth"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          required
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {formData.role === "club_staff" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="organizationName"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Organization Name
                        </label>
                        <input
                          type="text"
                          id="organizationName"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          placeholder="e.g., Manchester United"
                          required
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="jobTitle"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          placeholder="e.g., Director of Football"
                          required
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {formData.role === "coach" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="coachingLicense"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Coaching License
                        </label>
                        <select
                          id="coachingLicense"
                          name="coachingLicense"
                          value={formData.coachingLicense}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          required
                        >
                          <option value="">Select license type</option>
                          {["uefa_pro", "uefa_a", "uefa_b", "other"].map(license => (
                            <option key={license} value={license}>
                              {license
                                .split("_")
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="yearsExperience"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Years of Coaching Experience
                        </label>
                        <input
                          type="number"
                          id="yearsExperience"
                          name="yearsExperience"
                          value={formData.yearsExperience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          placeholder="e.g., 5"
                          required
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {formData.role === "agent" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="agencyName"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          Agency Name
                        </label>
                        <input
                          type="text"
                          id="agencyName"
                          name="agencyName"
                          value={formData.agencyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          placeholder="e.g., Stellar Group"
                          required
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="licenseNumber"
                          className="block text-sm font-medium mb-2"
                          style={{ color: COLORS.text }}
                        >
                          License Number
                        </label>
                        <input
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                          style={{
                            borderColor: `${COLORS.primary}40`,
                            color: COLORS.text,
                          }}
                          placeholder="e.g., AG123456"
                          required
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Referral */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="referral"
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.text }}
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="referral"
                    name="referral"
                    value={formData.referral}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                    style={{
                      borderColor: `${COLORS.primary}40`,
                      color: COLORS.text,
                    }}
                    required
                  >
                    <option value="">Select an option</option>
                    {["social_media", "friend", "event", "advertisement", "other"].map(source => (
                      <option key={source} value={source}>
                        {source
                          .split("_")
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Policy Agreement */}
                <motion.div variants={itemVariants} className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToPolicy"
                    name="agreeToPolicy"
                    checked={formData.agreeToPolicy}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded focus:ring-blue-300"
                    style={{ accentColor: COLORS.primary }}
                    required
                  />
                  <label
                    htmlFor="agreeToPolicy"
                    className="ml-2 text-sm"
                    style={{ color: COLORS.text }}
                  >
                    I agree to the processing of my personal data as described in the{" "}
                    <a
                      href="/privacy"
                      className="underline hover:text-blue-500 transition-colors"
                      style={{ color: COLORS.accent }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg"
                  style={{
                    background: `linear-gradient(to right, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
                  }}
                >
                  Submit Details
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex justify-center mb-6"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100"
                    style={{ backgroundColor: `${COLORS.success}10` }}
                  >
                    <CheckCircle className="w-10 h-10" style={{ color: COLORS.success }} />
                  </div>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-2xl font-semibold mb-4"
                  style={{ color: COLORS.success }}
                >
                  Welcome Aboard!
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-600 mb-8"
                  style={{ color: COLORS.lightText }}
                >
                  Your profile has been successfully created. Lets kick off your journey!
                </motion.p>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinue}
                  className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg"
                  style={{
                    background: `linear-gradient(to right, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
                  }}
                >
                  Go to Dashboard
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-4 border-t text-center text-sm"
            style={{ borderColor: `${COLORS.primary}20`, color: COLORS.lightText }}
          >
            <p className="flex items-center justify-center gap-1">
              <Shield className="w-4 h-4" />
              Secured by Futbol Conect
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Section - Right Half */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div
            className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            }}
          >
            {/* Animated Football Pattern */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-20 bg-[url('/football-texture.png')] bg-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.img
                src="/3d-football.png"
                alt="3D Football"
                className="w-3/4"
                animate={{ y: [-10, 10] }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Verification