import mongoose from "mongoose";
import config from "../src/Config/config.js";
import User from "../src/models/user.models.js";

const required = ["OWNER_NAME", "OWNER_EMAIL", "OWNER_PASSWORD", "OWNER_DOB", "OWNER_MOBILE"];
const missing = required.filter((key) => !process.env[key]?.trim());

if (missing.length) {
  console.error(`Missing environment variable(s): ${missing.join(", ")}`);
  console.error("Set these values in Backend/.env temporarily, then run npm run create-owner.");
  process.exit(1);
}

const email = process.env.OWNER_EMAIL.trim().toLowerCase();
const fullName = process.env.OWNER_NAME.trim();
const password = process.env.OWNER_PASSWORD;
const dob = new Date(process.env.OWNER_DOB);
const mobile = process.env.OWNER_MOBILE.trim();

if (Number.isNaN(dob.getTime()) || dob > new Date()) {
  console.error("OWNER_DOB must be a valid date in YYYY-MM-DD format and cannot be in the future.");
  process.exit(1);
}
if (!/^[6-9]\d{9}$/.test(mobile)) {
  console.error("OWNER_MOBILE must be a valid 10-digit Indian mobile number.");
  process.exit(1);
}
if (password.length < 12) {
  console.error("OWNER_PASSWORD must be at least 12 characters long.");
  process.exit(1);
}

try {
  await mongoose.connect(config.MONGODB_URI);

  const existing = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existing) {
    console.error("An account with this email or mobile already exists. No account was changed.");
    process.exitCode = 1;
  } else {
    const owner = new User({ email, fullName, role: "owner", dob, mobile });
    await User.register(owner, password);
    console.log(`Owner account created successfully for ${email}.`);
    console.log("Remove OWNER_PASSWORD and the other OWNER_* values from Backend/.env now.");
  }
} catch (error) {
  console.error("Could not create owner account:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect().catch(() => {});
}
