import airmax90shoesimg1 from '../../../public/images/NikeAirMax90/airmax90shoesimg1.jpg';
import airmax90shoesimg2 from '../../../public/images/NikeAirMax90/airmax90shoesimg2.jpg';
import airmax90shoesimg3 from '../../../public/images/NikeAirMax90/airmax90shoesimg3.webp';
import airmax90shoesimg4 from '../../../public/images/NikeAirMax90/airmax90shoesimg4.jpg';
import airmax90shoesimg5 from '../../../public/images/NikeAirMax90/airmax90shoesimg5.jpg';
import airmax90shoesimg6 from '../../../public/images/NikeAirMax90/airmax90shoesimg6.webp';
import airmax90shoesimg7 from '../../../public/images/NikeAirMax90/airmax90shoesimg7.jpg';
import airmax90shoesimg8 from '../../../public/images/NikeAirMax90/airmax90shoesimg8.jpg';
import Imageslider from "../../../src/components/imageSlider";
import { Button } from "@mui/material";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";

function ProductDescription(props) {
    console.log(props)
    const productImage = [airmax90shoesimg1, airmax90shoesimg2, airmax90shoesimg3, airmax90shoesimg4, airmax90shoesimg5, airmax90shoesimg6, airmax90shoesimg7, airmax90shoesimg8]
    const [description, setdescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit placerat pellentesque. Etiam vitae finibus ante, eget consectetur lacus. Quisque vehicula malesuada ultrices. Suspendisse tempor venenatis ipsum vel pellentesque. Curabitur nec aliquet neque. Sed vitae rhoncus mauris. Ut ex nunc, congue sed nulla ac, lacinia tristique elit. Sed lacus ante, sodales eget volutpat ac, aliquam ut eros. In hac habitasse platea dictumst. Sed sed efficitur purus, et mattis odio. Vivamus iaculis eros vitae mollis iaculis. Phasellus vel metus dui.');
    return (
        <>
            <div className="product-images-description-container">
                <div className="product-images-container">
                    <Imageslider image={productImage} />
                </div>
                <div className="product-information">
                    <h2>Model Name</h2>
                    <p rows="8" cols={70}>{props.name}</p>
                    <Button sx={{ backgroundColor: "black", width: '100%' }}>Buy Now</Button>
                    <h2>Product Information</h2>
                    <p>{description}</p>
                    <p>{props.price}</p>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const res = await prisma.Products.findMany();
    return { props:  res[0]  }
}

export default ProductDescription;
