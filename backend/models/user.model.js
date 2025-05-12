import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["player", "scout", "club_staff", "coach", "agent"],
    default: "player",
  },
  country: { type: String, trim: true },
  phoneNumber: { type: String, trim: true },
  dateOfBirth: { type: Date },
  currentClub: { type: String, trim: true },
  club: { type: String, trim: true },
  organizationName: { type: String, trim: true },
  jobTitle: { type: String, trim: true },
  coachingLicense: { type: String, trim: true },
  yearsExperience: { type: Number, min: 0 },
  agencyName: { type: String, trim: true },
  licenseNumber: { type: String, trim: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);