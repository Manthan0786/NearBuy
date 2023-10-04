import { useEffect, useState, useMemo, startTransition } from "react";

function GetLocation(props) {
    const res = {
        latitude: '51.120523',
        longitude: '-113.954308'
    }

    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
    const { latitude: sellerlatitude, longitude: sellerlongitude } = res;
    const { latitude: buyerlatitude, longitude: buyerlongitude } = coordinates;
    const [distance, setDistance] = useState();

    useEffect(() => {
        function getLocation() {
            try {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                });
            } catch (error) {
                console.error(error.message);
            }
        }
        startTransition(() => {
            getLocation();
        })

    }, [])

    useEffect(() => {
        startTransition(() => {
            const result = haversinedistance(buyerlatitude, buyerlongitude, sellerlatitude, sellerlongitude);
            setDistance(result);
        })

    }, [coordinates]);

    function haversinedistance(buyerlatitude, buyerlongitude, sellerlatitude, sellerlongitude) {
        const radius = 6371.0710;
        function toRadians(degrees) {
            return degrees * (Math.PI / 180);
        }
        const lat1Rad = toRadians(buyerlatitude);
        const lon1Rad = toRadians(buyerlongitude);
        const lat2Rad = toRadians(sellerlatitude);
        const lon2Rad = toRadians(sellerlongitude);
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;
        // Haversine formula
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = Math.ceil(radius * c);
        return distance;
    }

    return (
        <>
            {
                !distance ? <div>Getting loaded</div> : <div>{distance}Km</div>
            }
        </>
    )
}

export default GetLocation