import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        let userData = await JSON.parse(req.body);
        userData.price = parseInt(userData.price);
        const savedUser = await prisma.Products.create({
            data: userData,
        })
        return res.json()
    } catch (e) {
        console.log(e);
    }
}
