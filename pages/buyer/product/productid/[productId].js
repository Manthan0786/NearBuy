import { useSession } from 'next-auth/react';
import { Button } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]';
import path from 'path';
import { promises as fs } from 'fs';
import { useRouter } from 'next/router';
import Imageslider from '../../../../src/components/imageSlider';

function ProductDescription(props) {
    const [{ id: productId, ...product }, { id: userId }] = props.data;
    const router = useRouter();
    
    const handlebuynow = async () => {
        try {
            const response = await fetch('/api/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, userId })
            });
            const data = await response.json();
            if (response.status == 200) {
                router.push('/buyer/cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }

    return (
        <>
            <div className="product-images-description-container">
                <div className="product-images-container">
                    <Imageslider images={product.url} />
                </div> 
                <div className="product-information">
                    <h2>Model Name</h2>
                    <p rows="8" cols={70}>{product.name}</p>

                    <Button sx={{ backgroundColor: "black", width: '100%' }} onClick={() => handlebuynow(product.id)}>Buy Now</Button>
                    <h2>Product Information</h2>
                    <p>{product.description}</p>
                    <h2>Price</h2>
                    <p>${product.price}</p>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    const prisma = new PrismaClient();
    const { productId } = context.params;
    const pid = JSON.parse(productId);
    const session = await getServerSession(context.req, context.res, authOptions)

    async function fetchUserID() {
        const res = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                id: true,
            }
        })
        return res
    }
    async function fetchProduct() {
        const product = await prisma.products.findUnique({
            where: { id: pid },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
            }
        })
        const fetchImages = async () => {
            const productImage = []
            const dir = "public/uploads/product-" + product.id
            const imageDirectory = path.join(process.cwd(), dir);
            const filenames = await fs.readdir(imageDirectory)
            filenames.forEach(file => {
                const url = "http://localhost:3000/uploads/product-" + product.id + "/" + file;
                productImage.push(url);
            });
            product.url = productImage;
            return product
        }
        const res = await fetchImages();
        return res
    }
    const data = await Promise.all([fetchProduct(), fetchUserID()]).then(res => { return res })
    return {
        props: {
            data
        }
    }
}

export default ProductDescription;
