import { useState } from "react";
import Image from "next/image";
import styles from '../../src/components/imageSlider.module.css';

function Imageslider({images}) {
    return (
        <>
            {images.map((img, index) =>
                <div className={styles.image_size}>
                    <Image key={index} layout="responsive" placeholder="blur" src={img} />
                </div>
            )}
        </>
    )
}

export default Imageslider;