import { PrismaClient } from "@prisma/client";
import { authOptions } from './auth/[...nextauth]'
import { getSession } from 'next-auth/react'
const prisma = new PrismaClient();
export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const session = await getSession({ req });
    const userData = JSON.parse(req.body);
    const sellerId = await prisma.seller.findMany(
        {
            select: {
                id: true
            },
            where: {
                user: {
                    email: {
                        equals: session.user.email
                    }
                }
            }

        }
    )
    const product= await prisma.products.create({
        data:{
            price:parseFloat(userData.price),
            quantity:userData.quantity,
            Description:userData.description,
            name:userData.name,
            seller:{
                connect:{
                    id:sellerId[0].id
                }
            }
        }
    })
 


    return res.status(200).json({product:product})
}
