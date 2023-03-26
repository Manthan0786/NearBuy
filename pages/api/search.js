import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const query = req.query.q;
  if(query === '') {
    return
  }
  console.log(query);
  const result = await prisma.products.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  })
  console.log(result);
  res.status(200).json(result);
}