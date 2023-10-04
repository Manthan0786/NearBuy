import Image from "next/image";
import styles from '../../src/components/imageSlider.module.css';

function Imageslider({ images }) {
    return (
        <>
            {images.map((img, index) =>
                <div key={index} className={styles.image_size}>
                    <Image alt="shoe picture" width={500} height={500} src={img} />
                </div>
            )}
        </>
    )
}

export default Imageslider;