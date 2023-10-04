import { PrismaClient } from '@prisma/client';
import path from 'path';
import { promises as fs } from 'fs';
import Buyerproductcategorycard from '../../src/components/BuyerProductCard/buyerProductCategoryCard';

function Homepage(props) {
    const { category } = props;
    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
            <div className='inventory_container'>
                {
                    category.map((cat)=> {
                       return <Buyerproductcategorycard key={cat.id} name={cat.name} image={cat.url}/>
                    })
                }
            </div>
        </>
    );
}

export default Homepage;

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const category = await prisma.category.findMany();
    for (var i = 0; i < category.length; i++) {
        var productImage = []
        const dir = `public/category/${category[i].name}`
        const imageDirectory = path.join(process.cwd(), dir);
        const filenames = await fs.readdir(imageDirectory)
        filenames.forEach(file => {
            const url = `http://localhost:3000/category/${category[i].name}` + "/" + file;
            productImage.push(url);
        });
        category[i].url = productImage;
    }
    return {
        props: {
            category
        }
    }
}