import ProductsCard from "../../../src/components/BuyerProductCard/productsCard";
import { PrismaClient } from "@prisma/client";
import path from 'path';
import { promises as fs } from 'fs';

function Products(props) {
    const { products } = props;
    return (
        <>
            <div className="inventory_container">
                {
                    products.map(p => {
                        return (
                            <ProductsCard key={p.id} id={p.id} image={p.url[0]} name={p.name} price={p.price}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const { productCategory } = context.params;
    const products = await prisma.Products.findMany({
        where: {
            category: {
                name: productCategory
            },
        },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
        }
    });
    
    for (var i = 0; i < products.length; i++) {
        var productImage = []
        const dir = "public/uploads/product-" + products[i].id
        const imageDirectory = path.join(process.cwd(), dir);
        const filenames = await fs.readdir(imageDirectory)
        filenames.forEach(file => {
            const url = "http://localhost:3000/uploads/product-" + products[i].id + "/" + file;
            productImage.push(url);
        });
        products[i].url = productImage;
    }
    return { props: { products } }
}

export default Products;