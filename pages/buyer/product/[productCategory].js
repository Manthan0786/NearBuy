import ProductsCard from "../../../src/components/BuyerProductCard/productsCard";
import { PrismaClient } from "@prisma/client";
import DistancefromUser from "../../../src/components/distanceCalculation";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../../src/components/Context/locationContext";

function Products(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const data = props.res;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                if (position.coords) {
                    const coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    setLocation(coordinates);
                } else {
                    console.error("Error: Position does not have coords property");
                }
                setIsLoading(false);
            },
            error => console.error(error)
        );
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <LocationContext.Provider value={location}>
                <div className="inventory_container">
                    {
                        data.map(p => {
                            return (
                                <ProductsCard key={p.id} id={p.id} image={1} name={p.name} location={p.location} />
                            )
                        })
                    }
                </div>
            </LocationContext.Provider>
        </>
    )
}

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const { productCategory } = context.params;
    const res = await prisma.Products.findMany({
        where: { category: productCategory },
    });
    return { props: { res } }
}

export default Products;