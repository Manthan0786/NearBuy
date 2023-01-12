import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET;

// function to sign JWT
function signJWT(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
}

// function to verify JWT
function verifyJWT(token) {
    return jwt.verify(token, JWT_SECRET);
}

export default async function login(req, res) {
    const prisma = new PrismaClient();
    const userdata = JSON.parse(req.body);
    console.log(userdata)
    const { email, password } = userdata;
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method not allowed' });
        }
        if (req.method === 'POST') {
            const user = await prisma.user.findFirst({
                where: {
                    email,
                },
            });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email' })
            }
            const passwordIsValid = await bcrypt.compare(password, user.password)
            if (!passwordIsValid) {
                return res.status(401).json({ error: 'Invalid password' })
            }
            return res.json();
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return res.status(200).json({ token })
    } catch (err) {
        console.log(err);
    }
}