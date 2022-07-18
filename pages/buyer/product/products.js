import Header from "../../../src/components/BuyerHeader/header";
import Image from "next/dist/client/image";
import Buyerproduct from "../../../src/components/BuyerProductCard/buyerProducts";

function Products() {
    return(
        <>
        <Header />
        <div className="inventory_container">
         <Buyerproduct image={0} name='Vans' location='300 m'/>
         <Buyerproduct image={1} name='Nike' location='500 m'/>
         <Buyerproduct image={2} name='Nike1' location='800 m'/>
         <Buyerproduct image={3} name='Nautica' location='850 m'/>
         <Buyerproduct image={4} name='Reebok' location='970 m.'/>
         <Buyerproduct image={5} name='Reebok1' location='1.1 Km'/>
         <Buyerproduct image={6} name='Fila' location='1.4 Km'/>
         <Buyerproduct image={7} name='Nike Jordan' location='1.7 Km'/>
         <Buyerproduct image={8} name='Adidas' location='2 Km'/>
        </div>
        </>
    )
}

export default Products;