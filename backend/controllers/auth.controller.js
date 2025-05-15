import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


// Existing controllers (assumed)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, username, fullName, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate role
    const validRoles = ['player', 'scout', 'coach', 'agent', 'club_staff', 'manager'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      username,
      fullName,
      password: hashedPassword,
      role,
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ')[1] || ''
    });

    if (newUser) {
      await newUser.save();
      
      // Create welcome message
      const welcomeMessage = {
        title: "Welcome to FutbolConnect!",
        message: `Welcome to FutbolConnect! You're now part of the ultimate football community platform as a ${role}.`,
        type: "success"
      };

      // Store welcome message in user's notifications
      newUser.notifications = [welcomeMessage];
      await newUser.save();

      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.fullName,
          role: newUser.role,
        },
      });
    } else {
      res.status(400).json({ error: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
// New update controller
export const update = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      phoneNumber,
      dateOfBirth,
      currentClub,
      club,
      organizationName,
      jobTitle,
      coachingLicense,
      yearsExperience,
      agencyName,
      licenseNumber,
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      email,
      country,
      phoneNumber,
      dateOfBirth,
      currentClub,
      club,
      organizationName,
      jobTitle,
      coachingLicense,
      yearsExperience,
      agencyName,
      licenseNumber,
    };

    // Remove undefined fields to prevent overwriting with undefined
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};