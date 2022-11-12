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
    const [description, setDescription] = useState('')

    const value = {
        'quantity': quantity,
        'description': description
    }

    setDescription

    async function saveData() {
        const response = await fetch('api/product.js', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
               'Content-Type': 'application/json; cahrset-8'
            }
        });
        if(!response) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }

    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
            <div>
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
                <textarea className="product_description" value='description'>{description}</textarea>

                <div className="product_details_edit_container">
                    <button className="product_edit_buttons">Cancel</button>
                    <button className="product_edit_buttons" onClick={saveData}>Save</button>
                </div>

            </div>
        </>
    )
}