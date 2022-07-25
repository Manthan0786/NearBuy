import { useState } from "react";
import Image from "next/image";
import { height } from "@mui/system";
import styles from '../../src/components/imageSlider.module.css';

function Imageslider({ image }) {
    const [currIndex, setcurrIndex] = useState(0);

    return (
        <>
            {image.map((img, id) =>
                <div className={styles.image_size}>
                    <Image layout="responsive" placeholder="blur" key={id} src={img} />
                </div>
            )}
        </>
    )
}

export default Imageslider;