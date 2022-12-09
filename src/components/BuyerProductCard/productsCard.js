import { Link } from '@mui/material';
import Image from 'next/image';
import vans from '../../../public/images/shoes/vans.avif';
import nike from '../../../public/images/shoes/nike.avif';
import nike1 from '../../../public/images/shoes/nike1.avif';
import nautica from '../../../public/images/shoes/nautica.avif';
import fila from '../../../public/images/shoes/fila.avif';
import reebok from '../../../public/images/shoes/reebok.avif';
import reebok1 from '../../../public/images/shoes/reebok1.avif';
import nikejordon from '../../../public/images/shoes/nikejordon.avif';
import adidas1 from '../../../public/images/shoes/adidas1.avif';
import styles from '../BuyerProductCard/buyerproductcard.module.css';

function ProductsCard(props) {
    const image = [vans, nike, nike1, nautica, reebok, reebok1, fila, nikejordon, adidas1]
    return (
        <>
            <div className='product_productname'>
                <Link href={`/buyer/product/${props.id}`}>
                    <a>
                        <Image
                            src={image[props.image]}
                            alt={props.name}
                            className={styles.product_image}
                            width={250}
                            height={250}
                            layout="responsive"
                            placeholder="blur"
                        />
                    </a>
                </Link>
                <div className={styles.product_name_price}>
                    <p className={styles.product_name}>{props.name}</p>
                    <p className={styles.product_name}>{props.location}</p>
                </div>
            </div>
        </>
    )
}

export default ProductsCard;