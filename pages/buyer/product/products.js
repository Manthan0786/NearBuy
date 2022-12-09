import ProductsCard from "../../../src/components/BuyerProductCard/productsCard";
import { PrismaClient } from "@prisma/client";

function Products(props) {
    const data = props.res;
    console.log(data);
    return (
        <>
            <div className="inventory_container">
                {
                    data.map(p => {
                        return (
                            <ProductsCard key={p.id} id={p.id} image={4} name={p.name} />
                        )
                    })
                }
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const res = await prisma.Products.findMany({
        where: { category: 'Other' },
    });
    return { props: { res } }
}

export default Products;