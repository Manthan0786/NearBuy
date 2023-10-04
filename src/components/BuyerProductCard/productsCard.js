import { Link } from '@mui/material';
import Image from 'next/image';
import styles from '../BuyerProductCard/buyerproductcard.module.css';

import { lazy, Suspense, startTransition } from 'react';
import { useMemo } from 'react';

const GetLocation = lazy(() => import('../location'));

function ProductsCard(props) {
    return (
        <>
            <div className='product_productname'>
                <Link href={`/buyer/product/productid/${props.id}`}>
                    <Image
                        src={props.image}
                        alt={props.name}
                        className={styles.product_image}
                        width={250}
                        height={250}
                    />
                </Link>
                <div className={styles.product_name_price}>
                    <p className={styles.product_name}>{props.name}</p>
                    <p className={styles.product_name}>${props.price}</p>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <GetLocation />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default ProductsCard;