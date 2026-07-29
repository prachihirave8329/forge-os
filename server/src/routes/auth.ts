import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { requireAuth } from "../middleware/requireAuth";
const router = express.Router();

// register
/*async:Very important.

MongoDB is slow compared to CPU.
When doing
User.findOne()
JavaScript doesn't know when MongoDB will finish.
So
async
allows
await
async goes before the function definition and forces it to return a Promise.

await goes before an asynchronous operation (like an API fetch) and pauses the function until the data arrives.

Non-blocking: While await pauses your function, it doesn't freeze the screen or block other code outside that function from running.

Pairing: You cannot use await inside a regular function; it must have the async tag on the parent function.


*/
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user 
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || "member",
    });

    // generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
//get the login user

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;