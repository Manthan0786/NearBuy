import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();
export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    } else {
        console.log(JSON.stringify(session, null, 2))
    }
    const userData = req.body;
    const sellerId = await prisma.seller.findMany(
        {
            where: {
                user: {
                    email: {
                        equals: session.user.email
                    }
                }
            },
            select: {
                id: true
            },
        }
    )
    const product = await prisma.products.create({
        data: {
            price: userData.price,
            quantity: userData.quantity,
            description: userData.description,
            name: userData.name,
            category: {
                connect: {
                    id: userData.category
                }
            },
            seller: {
                connect: {
                    id: sellerId[0].id
                }
            }
        }
    })
    return res.status(200).json({ product: product })
}
