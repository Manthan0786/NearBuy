import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const userData = JSON.parse(req.body)
    const savedUser = await prisma.Products.create({
        data: userData,
    })

    return res.json(savedUser)
}
