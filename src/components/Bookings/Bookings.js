import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data))


    }, [])


    console.log(bookings);

    return (
        <div>
            <h1>You have {bookings.length} Bookings</h1>
            {
                bookings.map(book => <li key={book._id}><b>Name:</b> {book.name}
                    <b> From: </b> {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))}
                    <b> To: </b> {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}
                </li>)
            }
        </div>
    );
};

export default Bookings;