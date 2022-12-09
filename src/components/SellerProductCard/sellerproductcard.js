import Image from 'next/image';
import shoes from '../../../public/images/shoes.jpeg'
import bag from '../../../public/images/bag.jpeg'
import watch from '../../../public/images/watch.png'
import styles from './sellerproductcard.module.css';
import Link from 'next/link';

function SellerProductCard(props) {

    const images = [shoes, bag, watch];
    return (
        <>

            <div>
                <Link href={`/seller/product/${props.name}`}>
                    <a>
                        <Image
                            src={images[props.image]}
                            alt="Picture of the Product"
                            width={300}
                            height={250}
                            layout="responsive"
                            placeholder="blur"
                            className={styles.product_image}
                        >
                        </Image>
                    </a>

                </Link>
                <p className={styles.product_name}>{props.name}</p>
                <div className={styles.product_price_container}>
                    <p className={styles.product_price}>{props.price}</p>
                    <p className={styles.product_price}>{props.quantity}</p>
                </div>

            </div >


        </>

    );
}


export default SellerProductCard;

