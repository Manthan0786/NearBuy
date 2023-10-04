import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { productId, quantity } = req.body;
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ error: 'Invalid request.' });
        }

        try {
            const updatedCartItem = await prisma.cartItem.update({
                where: { productId },
                data: { quantity },
            });

            return res.status(200).json(updatedCartItem);
        } catch (error) {
            console.error('Error updating cart item:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.status(405).end(); // Method not allowed
    }
}