import { PrismaClient } from "@prisma/client";
import { authOptions } from './auth/[...nextauth]'
import { getSession } from 'next-auth/react'
import * as fs from 'fs';
const prisma = new PrismaClient();
export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const {file, id} = JSON.parse(req.body);
    const fileContents = file.base64.split(",")[1];
    fs.mkdirSync("public/uploads/product-"+id, { recursive: true });
    const fileName = `./public/uploads/product-${id+"/" + Date.now().toString() + file.fileName}`
    fs.writeFile(fileName, fileContents, 'base64', function (err) { console.log(err) });

    return res.status(200).json()
}
