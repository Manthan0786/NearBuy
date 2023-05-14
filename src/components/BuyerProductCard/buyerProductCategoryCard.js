import { Link } from '@mui/material';
import shoes from '../../../public/images/shoes.jpeg';
import Image from 'next/image';
import watch from '../../../public/images/watch.png';
import wallet from '../../../public/images/wallet.jpg';
import styles from '../BuyerProductCard/buyerproductcard.module.css';
import bag from '../../../public/images/bag.jpeg';
import { useContext } from 'react';
import { LocationContext } from '../Context/locationContext';

function Buyerproductcategorycard(props) {

    const image = [watch, wallet, shoes, bag]
    return (
        <>
            <div className='product_productname'>
                <Link href={`../buyer/product/${props.name}`}>
                    <a>
                        <Image
                            src={image[props.image]}
                            alt={props.name}
                            className={styles.product_image}
                            width={300}
                            height={250}
                            layout="responsive"
                            placeholder="blur"
                        />
                    </a>
                </Link>
                <p className='styles.product_name'>{props.name}</p>
            </div>
        </>
    )
}

export default Buyerproductcategorycard;