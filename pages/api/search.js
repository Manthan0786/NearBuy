import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const query = String(Object.values(req.query));
    try {
        if (query === '') {
            return
        }
        const result = await prisma.Products.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error searching' });
    }
}