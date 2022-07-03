import Image from 'next/image';
import shoes from '../../../public/images/shoes.jpeg'
import bag from '../../../public/images/bag.jpeg'
import watch from '../../../public/images/watch.png'
import styles from './sellerproductcard.module.css'

function SellerProductCard(props) {
    const images = [shoes, bag, watch];
    return (
        <div className={styles.card_container}>
            <Image
                src={images[props.image]}
                alt="Picture of the Product"
                width={300}
                height={250}
                placeholder="blur"
            >
            </Image>
            <p className={styles.product_name}>{props.name}</p>
            <div className={styles.product_price_container}>
                <p className={styles.product_price}>{props.price}</p>
                <p className={styles.product_price}>{props.quantity}</p>
            </div>

        </div >
    );
}

export default SellerProductCard;