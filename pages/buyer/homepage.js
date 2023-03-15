import ProductsCard from "../../src/components/BuyerProductCard/productsCard";
import { PrismaClient } from "@prisma/client";
import { getSession } from 'next-auth/react'
import { promises as fs } from 'fs'
import path from 'path'
import { useEffect, useState } from "react";

function Homepage({ products }) {
    const [position, setPosition]=useState({})
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => { 
            setPosition({
                latitude:position.coords.latitude,
                longitude: position.coords.longitude
            })
         });
    }, []);
    console.log(position)

    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
            <div className='inventory_container'>
                {products.map((product, index) => {
                    return <ProductsCard image={product.url[0]} name={product.name} location='300 m' />
                })}
            </div>
        </>
    );
}

export default Homepage;

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const { req } = context;
    const session = await getSession({ req });
    const products = await prisma.products.findMany(
        {
            orderBy: {
                id: "desc"
            },
            include: {
                seller: true
            }
        }
    )
    for (var i = 0; i < products.length; i++) {
        var productImages = []
        const dir = "public/uploads/product-" + products[i].id
        const imageDirectory = path.join(process.cwd(), dir);
        const filenames = await fs.readdir(imageDirectory)
        filenames.forEach(file => {
            const url = "http://localhost:3000/uploads/product-" + products[i].id + "/" + file;
            productImages.push(url);
        });
        products[i].url = productImages;
    }
    console.log(products)
    return {
        props: {
            products: products
        },
    }
}