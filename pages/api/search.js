import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const query = String(Object.values(req.query)[0]);
  try {
    if(query === '') {
      return
    }
    const result = await prisma.Products.findMany({
      where: {
        name: {
          startsWith: query,
          mode: 'insensitive',
        },
      },
    })
    res.status(200).json(result);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Error searching' });
  }
}