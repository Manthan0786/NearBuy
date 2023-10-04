import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { DropzoneDialog } from 'mui-file-dropzone';
import { PrismaClient } from "@prisma/client";
import { promises as fs } from 'fs'
import path from 'path'

function ImageGridItem(img, index) {
    var image = new Image();
    image.src = img.base64;

    var dimensions = {
        width: image.width,
        height: image.height
    }
    console.log(img);
    const style = {
        gridColumnEnd: `span ${getSpanEstimate(dimensions.width)}`,
        gridRowEnd: `span ${getSpanEstimate(dimensions.height)}`,
        width: `${400 * getSpanEstimate(dimensions.width)}px`,
        height: `${225 * getSpanEstimate(dimensions.height)}px`,
        maxWidth: "800px",
        maxHeight: "450px"
    }

    return (
        <img
            style={style}
            src={img.base64}
            alt="Picture of the Product"
        />

    )
}

function getSpanEstimate(size) {
    if (size > 1900) {
        return 2
    }
    return 1
}





export default function AddProduct({ product }) {

    const [quantity, setQuantity] = useState(product.quantity);
    const [description, setDescription] = useState(product.description);
    const [name, setName] = useState(product.name);
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(product.price);
    const [imageList, setImageList] = useState([]);
    const router = useRouter();

    const value = {
        'quantity': quantity,
        'description': description,
        'name': name,
        'price': price
    }

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }



    useEffect(() => {
        const changeImagestoBase64 = async (files) => {
            const list = []
            for (var i = 0; i < files.length; i++) {
                const file = files[i];
                const base64 = await getBase64FromUrl(file);
                const fileData = await { base64, fileName: "product" };
                list.push(fileData);
            }
            setImageList(list);
        }


        changeImagestoBase64(product.url);

    }, [product]);



    const saveImages = async (files) => {
        const list = []
        for (var i = 0; i < files.length; i++) {
            const file = files[i];
            const base64 = await toBase64(file);
            const fileData = { base64, fileName: file.name };
            list.push(fileData);
        }
        setImageList([...imageList, ...list]);
        setOpen(false);
    }
    const AddImages = () => {
        return (
            <DropzoneDialog
                acceptedFiles={[' Image/*']}
                cancelButtonText={"Cancel"}
                submitButtonText={"Upload"}
                maxFileSize={64 * 1024 * 1024}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files) => {
                    saveImages(files)
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
            />)
    }

    async function saveData() {
        const response = await fetch('../../api/product', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json; cahrset-8'
            }
        });

        if (!response) {
            throw new Error(response.statusText);
        }
        var data = await response.json();

        for (var i = 0; i < imageList.length; i++) {
            const res = await fetch('../../api/image', {
                method: 'POST',
                body: JSON.stringify({ file: imageList[i], id: data.product.id }),
                headers: {
                    'Content-Type': 'application/json; charset-8'
                }
            });
        }

        router.push("/seller/homepage");


    }

    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
            <div>
                <div className="product_details_edit_container">
                    <input style={{ marginBottom: '50px', marginTop: '50px', width: '100%' }} placeholder={"Product Name"} value={name} onChange={(e) => { setName(e.target.value) }} className="title"></input>
                </div>

                <p className="product_details_title">Product Images</p>
                <div style={{ display: 'inline-flex' }} onClick={() => setOpen(true)} className="product_image_add_button"><AddIcon /></div>
                <div className="product_images">
                    {imageList.map((img, index) => {
                        return ImageGridItem(img, index);
                    })}
                    <AddImages />

                </div>
                <div className="product_details_edit_container">
                    <p className="product_details_title">Product Quantity</p>
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
                    <p className="product_details_title">Product Price</p>
                </div>

                <div className="product_qauntity_container">
                    <input className="product_details_title" value={price} onChange={(e) => { setPrice(e.target.value) }} type="number" min="1" step="any" />
                </div>

                <div className="product_details_edit_container">
                    <p className="product_details_title">Product Description</p>
                </div>
                <textarea className="product_description" value={description} onChange={(e) => {
                    setDescription(e.target.value)
                }}></textarea>

                <div style={{ marginTop: '50px' }} className="product_details_edit_container">
                    <button onClick={() => { router.push("/seller/homepage") }} className="product_edit_buttons">Cancel</button>
                    <button className="product_edit_buttons" onClick={saveData}>Save</button>
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const productId = parseInt(context.query.productId);
    const products = await prisma.products.findMany(
        {
            where: {
                id: productId
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
    console.log(products);

    return {
        props: {
            product: products[0]
        },
    }
}