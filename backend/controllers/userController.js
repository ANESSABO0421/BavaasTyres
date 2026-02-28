import Users from "../models/Users.js";

export const createUser = async (request, reply) => {
  try {
    const { name, email, phoneNumber, password } = request.body;
    if (!name || !email || !phoneNumber || !password) {
      return reply
        .code(400)
        .send({ success: false, message: "required fields missing" });
    }
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return reply.code(400).send({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await Users.create({
      name,
      email,
      phoneNumber,
      password,
    });

    return reply.code(200).send({ success: true, users: user });
  } catch (error) {}
  return reply.code(500).send({ success: false, message: "Server error" });
};

export const getUsers = async (request, reply) => {
  try {
    const allUsers = await Users.find();
    return reply.code(200).send({ success: true, users: allUsers });
  } catch (error) {
    return reply.code(500).send({ success: false, message: "Server error" });
  }
};
