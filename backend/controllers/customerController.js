import Customers from "../models/Customers.js";

// create customer
export const createCustomer = async (request, reply) => {
  try {
    const { name, phone, vehicleNumber, vehicleType, address } = request.body;

    if (!name || !phone) {
      return reply.code(400).send({
        success: false,
        message: "Name and phone are required",
      });
    }

    const customer = await Customers.create({
      name,
      phone,
      vehicleNumber,
      vehicleType,
      address,
    });

    return reply.code(201).send({
      success: true,
      customer,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get all customers
export const getCustomers = async (request, reply) => {
  try {
    const customers = await Customers.find();

    return reply.code(200).send({
      success: true,
      customers,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get single customer
export const getCustomerById = async (request, reply) => {
  try {
    const { id } = request.params;

    const customer = await Customers.findById(id);

    if (!customer) {
      return reply.code(404).send({
        success: false,
        message: "Customer not found",
      });
    }

    return reply.code(200).send({
      success: true,
      customer,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// update customer
export const updateCustomer = async (request, reply) => {
  try {
    const { id } = request.params;

    const updated = await Customers.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    return reply.code(200).send({
      success: true,
      updated,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// delete customer
export const deleteCustomer = async (request, reply) => {
  try {
    const { id } = request.params;

    await Customers.findByIdAndDelete(id);

    return reply.code(200).send({
      success: true,
      message: "Customer deleted",
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};
