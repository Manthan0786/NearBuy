import Image from 'next/image';
import styles from './sellerproductcard.module.css'
import Link from 'next/link';

function SellerProductCard(props) {
    return (
        <>
            <div>
                <Link href={"/seller/product/" + props.id}>
                    <Image
                        src={props.image}
                        alt="Picture of the Product"
                        width={400}
                        height={300}
                        className={styles.product_image}
                    >
                    </Image>
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

