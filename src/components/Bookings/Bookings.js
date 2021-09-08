import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(()=>{
        fetch(`http://localhost:27017/bookings?email=${loggedInUser.email}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    authorization: `Bearer ${sessionStorage.getItem('token')}` 
    }
    }
        )
        .then(res => res.json())
        .then(data => setBookings(data))

    }, [loggedInUser.email])
    return (
        <div>
            <h2>Length: {bookings.length}</h2>
            {
                bookings.map((bookingData)=> <li>{bookingData.name} CheckIn: {new Date(bookingData.checkIn).toDateString('dd/MM/yyyy')}. CheckOut: {new Date(bookingData.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }

        </div>
    );
};

export default Bookings;