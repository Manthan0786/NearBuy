import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function Deletefromcart(req, res) {
    if(req.method == 'DELETE') {
        const { productId } = req.query;
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!productId) {
            return res.status(400).json({ error: 'Invalid request Kutya.' });
        }
        try {
            await prisma.cart.delete({
                where: {
                    id: parseInt(productId)
                }
            })
            res.status(200).json({ message: `Product ${productId} has been deleted from the cart.` });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the product.' });
        }
    }
}