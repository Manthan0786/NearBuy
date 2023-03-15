import SellerProductCard from "../../src/components/SellerProductCard/sellerproductcard";
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { PrismaClient } from "@prisma/client";
import { getSession } from 'next-auth/react'
import { promises as fs } from 'fs'
import path from 'path'


export default function HomePage({ products }) {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
      <div>
        <p className="title">Inventory</p>
        <div className="inventory_container">
          {
            products.map((product, index) => {
              return <SellerProductCard id={product.id} image={product.url[0]} name={product.name} price={'$' + product.price} quantity={product.quantity + " Pcs"} />
            })
          }
        </div>
      </div>
      <Link href="/seller/product/addproduct">
        <div className="add_button"><AddIcon /></div>
      </Link>

    </>
  )
}


export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const { req } = context;
  const session = await getSession({ req });
  const products = await prisma.products.findMany(
    {
      where: {
        seller: {
          user: {
            email: {
              equals: session.user.email
            }
          }
        }


      },
      orderBy: {
        id: "desc"
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
  return {
    props: {
      products: products
    },
  }
}