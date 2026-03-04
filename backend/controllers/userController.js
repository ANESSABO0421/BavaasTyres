import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUser = async (request, reply) => {
  try {
    const { name, email, phoneNumber, password } = request.body;

    if (!name || !email || !phoneNumber || !password) {
      return reply.code(400).send({
        success: false,
        message: "Required fields missing"
      });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return reply.code(400).send({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword
    });

    return reply.code(201).send({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message
    });
  }
};

// get users
export const getUsers = async (request, reply) => {
  try {
    const allUsers = await Users.find();
    return reply.code(200).send({ success: true, users: allUsers });
  } catch (error) {
    return reply.code(500).send({ success: false, message: "Server error" });
  }
};


// login
export const loginUser = async (request, reply) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.code(400).send({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return reply.code(400).send({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return reply.code(400).send({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return reply.code(200).send({
      success: true,
      token
    });

  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message
    });
  }
};