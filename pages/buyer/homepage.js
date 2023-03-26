import Buyerproductcategorycard from '../../src/components/BuyerProductCard/buyerProductCategoryCard';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation } from '../../src/components/store';

function Homepage() {
    const dispatch = useDispatch();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                if (position.coords) {
                    const coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    dispatch(setLocation(coordinates));
                } else {
                    console.error("Error: Position does not have coords property");
                }
            },
            error => console.error(error)
        );
    },[]);

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