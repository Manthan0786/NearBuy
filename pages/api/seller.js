import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const data = JSON.parse(req.body)
    const seller = await prisma.seller.create({
        data: {
            user: {
                connect: {
                    email: data.email
                }
            },
            address: data.address,
            companyName: data.companyName
        }

    })

    return res.status(200).json(seller)
}