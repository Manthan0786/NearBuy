import Header from "../../../src/components/BuyerHeader/header";
import ProductsCard from "../../../src/components/BuyerProductCard/productsCard";

function Products() {
    return(
        <>
        <Header />
        <div className="inventory_container">
         <ProductsCard image={0} name='Vans' location='300 m'/>
         <ProductsCard image={1} name='Nike' location='500 m'/>
         <ProductsCard image={2} name='Nike1' location='800 m'/>
         <ProductsCard image={3} name='Nautica' location='850 m'/>
         <ProductsCard image={4} name='Reebok' location='970 m.'/>
         <ProductsCard image={5} name='Reebok1' location='1.1 Km'/>
         <ProductsCard image={6} name='Fila' location='1.4 Km'/>
         <ProductsCard image={7} name='Nike Jordan' location='1.7 Km'/>
         <ProductsCard image={8} name='Adidas' location='2 Km'/>
        </div>
        </>
    )
}

export default Products;