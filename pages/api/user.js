import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function userExists(email) {
    const user = await prisma.User.findFirst({
      where: { email: email }
    });
    return user;
}

export default async (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method not allowed' });
        }
        const userData = await JSON.parse(req.body);
        const { email } = userData;
        if (await userExists(email)) {
            throw new Error('Email address already in use');
        }
        const savedUser = await prisma.User.create({
            data: userData,
        })
        if(savedUser) {
            return res.status(201).json({ message: 'User created!' });
        }
    } catch (err) {
        console.error('An error occurred:', err.message);
    }
}