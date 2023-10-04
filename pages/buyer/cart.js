import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import path from 'path';
import { promises as fs } from 'fs';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

function Cart(props) {
    const [products, setProducts] = useState(props.res);
    const [total, setTotal] = useState();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setTotal(products.reduce((total, curr) => total + (curr.product.price), 0));
    }, [products])

    const handledelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/cart/${id}`, { method: 'DELETE' });
            if (!response) {
                throw new Error(response.statusText);
            }
            let data = await response.json();
            const result = products.filter((p) => p.id !== id )
            setProducts(result);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='cart_container'>
                <div style={{ width: '70%' }}>
                    {
                        products.map((p, index) => {
                            return (
                                <div key={index} className='productcontainer'>
                                    <img src={p.product.url} alt={`Image of ${p.product.name}`} width={200} height={200} />
                                    <div>
                                        <p>{p.product.name}</p>
                                        <p>${p.product.price}</p>
                                    </div>
                                    <div className="remove_product">
                                        <IconButton aria-label="delete" onClick={() => handledelete(p.id)}>
                                            <ClearIcon color="error" />
                                        </IconButton>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='cart_summary'>
                    <h2>Summary</h2>
                    <p>Your total is: <span style={{ fontWeight: 'bold' }}>${total}</span></p>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const products = await prisma.cart.findMany({
        where: {
            user: {
                email: {
                    equals: session.user.email
                }
            }
        },
        select: {
            id: true,
            product: true,
            userId: false,
            productId: false
        }
    });
    async function fetchImages() {
        for (let i = 0; i < products.length; i++) {
            const productImage = {}
            const dir = "public/uploads/product-" + products[i].product.id
            const imageDirectory = path.join(process.cwd(), dir);
            const filenames = await fs.readdir(imageDirectory)
            if (filenames.length > 0) {
                const firstFile = filenames[0];
                const url = "http://localhost:3000/uploads/product-" + products[i].product.id + "/" + firstFile;
                products[i].product.url = url
            }
        }
        return products
    }

    const res = await fetchImages();
    return {
        props: {
            res
        }
    }
}

export default Cart;