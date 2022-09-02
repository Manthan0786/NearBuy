import SellerProductCard from "../../src/components/SellerProductCard/sellerproductcard";
import AddIcon from '@mui/icons-material/Add';
import { PrismaClient } from '@prisma/client'

export default function HomePage(props) {
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
          <SellerProductCard image={0} name='Shoes' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={1} name='Bag' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={2} name='Watch' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={0} name='Shoes' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={1} name='Bag' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={2} name='Watch' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={0} name='Shoes' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={1} name='Bag' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={2} name='Watch' price='$200' quantity='15 Pcs' />
          <SellerProductCard image={0} name='Shoes' price='$200' quantity='15 Pcs' />
        </div>
      </div>
      <div className="add_button"><AddIcon /></div>
    </>
  )
}


export async function getStaticProps() {
  const prisma = new PrismaClient();
  const newUser = await prisma.user.create({
    data: {
      name: 'Manthan Bhardwaj',
      email: 'manthanbhardwaj@manthan.com',
    },
  })

  const users = await prisma.user.findMany()
  console.log(users);

  return {
    props: {}, // will be passed to the page component as props
  }
}