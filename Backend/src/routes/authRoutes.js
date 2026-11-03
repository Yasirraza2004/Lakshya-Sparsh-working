import express from "express";
import passport from "../Config/passport.js";
import User from "../models/user.models.js";

const router = express.Router();

const publicUser = (user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  dob: user.dob,
  mobile: user.mobile,
  role: user.role,
});

// SIGNUP
router.post("/signup", async (req, res, next) => {
  try {
    const { fullName, email, password, dob, mobile } = req.body;

    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password ||
      typeof dob !== "string" ||
      !dob ||
      typeof mobile !== "string" ||
      !mobile.trim()
    ) {
      return res.status(400).json({
        message:
          "Full name, email, password, date of birth, and mobile are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = mobile.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Enter a valid email address",
      });
    }

    if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
      return res.status(400).json({
        message: "Enter a valid 10-digit Indian mobile number",
      });
    }

    const parsedDob = new Date(`${dob}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDob.getTime()) ||
      parsedDob.toISOString().slice(0, 10) !== dob ||
      parsedDob > new Date()
    ) {
      return res.status(400).json({
        message: "Enter a valid date of birth",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { mobile: normalizedMobile },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === normalizedEmail
            ? "Email is already registered"
            : "Mobile number is already registered",
      });
    }

    const user = new User({
      fullName: fullName.trim(),
      email: normalizedEmail,
      dob: parsedDob,
      mobile: normalizedMobile,
      role: "user",
    });

    const registeredUser = await User.register(user, password);

    req.logIn(registeredUser, (error) => {
      if (error) return next(error);

      return res.status(201).json({
        message: "Signup successful",
        user: publicUser(registeredUser),
      });
    });
  } catch (error) {
    if (
      error.name === "UserExistsError" ||
      error.code === 11000
    ) {
      return res.status(409).json({
        message: "Email or mobile number is already registered",
      });
    }

    return next(error);
  }
});

// LOGIN
router.post("/login", (req, res, next) => {
  const requestedRole = req.body?.role;
  const allowedRoles = ["user", "admin", "owner"];

  if (!allowedRoles.includes(requestedRole)) {
    return res.status(400).json({
      message: "Choose User Login, Admin Login, or Owner Login.",
    });
  }

  passport.authenticate("local", (error, user, info) => {
    if (error) return next(error);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Invalid email or password",
      });
    }

    // The selected login type is only a request, never a privilege grant.
    // The stored role in MongoDB decides which portal this account can access.
    if (user.role !== requestedRole) {
      return res.status(403).json({
        message: `This account is not authorized for ${requestedRole} login. Select the correct login option.`,
      });
    }

    req.logIn(user, (loginError) => {
      if (loginError) return next(loginError);

      return res.json({
        message: "Login successful",
        user: publicUser(user),
      });
    });
  })(req, res, next);
});

// CURRENT USER
router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  return res.json({
    user: publicUser(req.user),
  });
});

// LOGOUT
router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);

    if (!req.session) {
      res.clearCookie("connect.sid", { path: "/" });
      return res.json({ message: "Logout successful" });
    }

    req.session.destroy((sessionError) => {
      if (sessionError) return next(sessionError);

      res.clearCookie("connect.sid", { path: "/" });
      return res.json({ message: "Logout successful" });
    });
  });
});

export default router;
