import Image from 'next/image';
import Link from 'next/link';
import styles from './sellerproductcard.module.css';

function SellerProductCard(props) {
    return (
        <>
            <div>
                <Link href={'/seller/product/' + props.id}>
                    <img
                        src={props.image}
                        alt="Picture of the Product"
                        width={300}
                        height={250}
                        className={styles.product_image}
                    >
                    </img>
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

