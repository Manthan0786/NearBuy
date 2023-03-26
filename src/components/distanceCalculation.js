import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function DistancefromUser(props) {
    const [distance, setDistance] = useState();
    const { location } = useSelector((state) => state.location);
    

    const { lat2, lon2 } = props
    
    useEffect(() => {
        if (location) {
            console.log("Repaint");
            const lat1 = location.latitude;
            const lon1 = location.longitude;
            const distance = haversine(lat1, lon1, lat2, lon2)
            setDistance(Math.round(distance * 100) / 100)
        }
    },[])

    return (
        <>
            {distance} Km
        </>
    )
}

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // radius of earth in km
    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const deltaLat = (Math.PI * (lat2 - lat1)) / 180;
    const deltaLon = (Math.PI * (lon2 - lon1)) / 180;
    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    distance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return distance;
}

export default DistancefromUser;

