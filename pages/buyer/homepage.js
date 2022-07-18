import Header from '../../src/components/BuyerHeader/header';
import Buyerproductcard from '../../src/components/BuyerProductCard/buyerProductCard';

function Homepage() {
    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
            <Header />
            <div className='inventory_container'>
                <Buyerproductcard image={0} name='Watch' />
                <Buyerproductcard image={1} name='Wallet' />
                <Buyerproductcard image={2} name='Shoes' />
                <Buyerproductcard image={3} name='Bags' />
                <Buyerproductcard image={0} name='Watch' />
                <Buyerproductcard image={1} name='Wallet' />
                <Buyerproductcard image={2} name='Shoes' />
                <Buyerproductcard image={3} name='Bags' />
                <Buyerproductcard image={0} name='Watch' />
            </div>
        </>
    );
}

export default Homepage;