import Header from "../src/components/SellerHeader/header"
import SellerProductCard from "../src/components/SellerProductCard/sellerproductcard";
import AddIcon from '@mui/icons-material/Add';
export default function SellerHomePage() {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
      <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet' />
      <div>
        <Header />
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
      <div className="add_inventory"><AddIcon /></div>
      <style jsx>{`
        .title{
          font-family:'Work Sans';
          font-weight:600;
          font-size:1.8rem;
        }
        .inventory_container{
          display:flex;
          justify-content:flex-start;
          width:100%;
          flex-wrap:wrap;
          background:F9FAFB;
        }
        .add_inventory{
          position:absolute;
          bottom:10px;
          right:10px;
          background:black;
          display:flex;
          justify-content:center;
          align-items:center;
          width:50px;
          height:50px;
          border-radius:50% 50%;
          color:white;
          padding:0;
          
        }

      
      `}
      </style>
    </>

  )
}