import { useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./imageSlider.module.css";

export function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div className={styles.column}>
        {images.map((item) => (
          <div key={item.id} className={styles.thumb}>
            <img src={item.src} alt="thumbnail" className={styles.sideimages} />
          </div>
        ))}
      </div>
      {/* <Carousel activeIndex={index} onSelect={handleSelect}>
        {images.map((item) => (
          <Carousel.Item key={item.id} className={styles.itemP} interval={4000}>
            <img src={item.src} alt="slides" />
          </Carousel.Item>
        ))}
      </Carousel> */}
    </>

  );
}

export default ImageSlider;







