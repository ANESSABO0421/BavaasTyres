import jwt from "jsonwebtoken";

export const verifyToken = async (request, reply) => {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return reply.code(401).send({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded;

    } catch (error) {
        return reply.code(401).send({
            success: false,
            message: "Invalid or expired token"
        });
    }
};