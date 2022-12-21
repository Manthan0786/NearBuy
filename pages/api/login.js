import { PrismaClient } from '@prisma/client';
import cookieSession from 'cookie-session';
import bcrypt from 'bcrypt';


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
    const { email, password } = userdata;
    try {
        if (req.method !== 'POST' || req.method !== 'GET') {
            return res.status(405).json({ message: 'Method not allowed' });
        }
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({ error: 'User not registered, please sign up' });
        }

        // const token = signJWT(user);
        return res.json();
    } catch (err) {
        console.log(err);
    }
}





// app.use(
//     cookieSession({
//         name: 'session',
//         secret: 'secret',
//         maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     })
// );

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const prisma = new PrismaClient();
//     console.log(email);
//     try {
//         const user = await prisma.user.findOne({
//             where: {
//                 email,
//             },
//         });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             returnapp res.status(401).send('Invalid email or password');
//         }

//         req.session.userId = user.id;
//         res.send('Logged in');
//     } catch (error) {
//         res.status(500).send(error);
//     } finally {
//         await prisma.disconnect();
//     }
// });