import Buyerproductcategorycard from '../../src/components/BuyerProductCard/buyerProductCategoryCard';

function Homepage() {
    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
            <div className='inventory_container'>
                    <Buyerproductcategorycard image={0} name='Watch' />
                    <Buyerproductcategorycard image={1} name='Wallet' />
                    <Buyerproductcategorycard image={2} name='Shoes' />
                    <Buyerproductcategorycard image={3} name='Bags' />
                    <Buyerproductcategorycard image={0} name='Watch' />
                    <Buyerproductcategorycard image={1} name='Wallet' />
                    <Buyerproductcategorycard image={2} name='Shoes' />
                    <Buyerproductcategorycard image={3} name='Bags' />
                    <Buyerproductcategorycard image={0} name='Watch' />
            </div>
        </>
    );
}

export default Homepage;