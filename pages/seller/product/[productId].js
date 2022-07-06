import Header from "../../../src/components/SellerHeader/header";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import shoes from '../../../public/images/shoes.jpeg'
import shoes1 from '../../../public/images/shoes1.jpg'
import shoes2 from '../../../public/images/shoes2.jpg'
import shoes3 from '../../../public/images/shoes3.jpg'
import shoes4 from '../../../public/images/shoes4.jpg'
import { useRouter } from 'next/router'
import { useState } from "react";

function ImageGridItem(img, index) {
    const style = {
        gridColumnEnd: `span ${getSpanEstimate(img.width)}`,
        gridRowEnd: `span ${getSpanEstimate(img.height)}`,
        width: `${400 * getSpanEstimate(img.width)}px`,
        height: `${225 * getSpanEstimate(img.height)}px`,
        maxWidth: "800px",
        maxHeight: "450px"
    }

    return (
        <img
            style={style}
            src={img.src}
            alt="Picture of the Product"
        />

    )
}

function getSpanEstimate(size) {
    if (size > 3000) {
        return 2
    }
    return 1
}


export default function Product() {
    const imageList = [shoes, shoes, shoes1, shoes2, shoes3, shoes3, shoes3, shoes4];
    const router = useRouter();
    const [quantity, setQuantity] = useState(10);
    const { productId } = router.query;
    const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit placerat pellentesque. Etiam vitae finibus ante, eget consectetur lacus. Quisque vehicula malesuada ultrices. Suspendisse tempor venenatis ipsum vel pellentesque. Curabitur nec aliquet neque. Sed vitae rhoncus mauris. Ut ex nunc, congue sed nulla ac, lacinia tristique elit. Sed lacus ante, sodales eget volutpat ac, aliquam ut eros. In hac habitasse platea dictumst. Sed sed efficitur purus, et mattis odio. Vivamus iaculis eros vitae mollis iaculis. Phasellus vel metus dui.")


    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
            <div>
                <Header />
                <div className="product_details_edit_container">
                    <p className="title">{productId}</p>
                    <EditIcon />
                </div>

                <p className="product_details_title">Product Images</p>
                <div className="product_images">
                    {imageList.map((img, index) => {
                        return ImageGridItem(img, index);

                    })}
                    {/* <div className="product_image_add_button"><AddIcon /></div> */}

                </div>

                <div className="product_details_edit_container">
                    <p className="product_details_title">Product Quantity</p>
                    <EditIcon />
                </div>


                <div className="product_qauntity_container">
                    <div className="product_quantity_edit title" onClick={() => {
                        setQuantity(quantity - 1);
                    }}>-</div>
                    <p className="product_details_title">{quantity}</p>
                    <div className="product_quantity_edit title" onClick={() => {
                        setQuantity(quantity + 1);
                    }}>+</div>
                </div>

                <div className="product_details_edit_container">
                    <p className="product_details_title">Product Description</p>
                    <EditIcon sx={{ cursor: "pointer" }} />
                </div>
                <p className="product_description">{description}</p>

                <div className="product_details_edit_container">
                    <button className="product_edit_buttons">Cancel</button>
                    <button className="product_edit_buttons">Save</button>
                </div>

            </div>



        </>

    )
}