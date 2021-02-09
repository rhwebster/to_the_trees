import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAListing } from '../../store/listing';
import { fetchCreateReservation, fetchOneReservation} from '../../store/reservations';
import AngryOrchard from './images/angryOrchard.jpeg';
import BlueMoon from './images/bluemoon.jpg';
import Bonbibi from './images/bonbibi.jpg';
import Burl from './images/burl.jpg';
import Spruce from './images/spruce.jpeg';
import Montana from './images/montana.jpg';
import SanJose from './images/sanjose.jpg'
import { NavLink } from 'react-router-dom'
import { DateRangePicker } from 'react-dates';
import { fetch } from '../../store/csrf';
import './index.css';



const ListingPage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const aListing = useSelector(fullReduxState => {
        return fullReduxState.listing;
    });

    useEffect(async () => {
        dispatch(
            getAListing(id)
        );
    }, []);

    
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const listingId = id;
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [focusedInput, setFocusedInput] = useState("");
    const [errors, setErrors] = useState("");

    const reservationLength = (start, end) => {
        return Math.ceil(end.diff(start) / 604800)
    };

    const handleClick = async () => {
        const newErrors = [];
        if(!startDate || !endDate) {
            newErrors.push("Please select start and end date");
        }
        if (!sessionUser) {
            newErrors.push("Please log in or sign up");
        }
        if (newErrors.length === 0) {
            const duration = reservationLength(startDate, endDate);

            const newReservation = dispatch(fetchCreateReservation ({
                listingId: listingId,
                userId: sessionUser.id,
                startDate: startDate.toDate(),
                endDate: endDate.toDate(),
                duration: duration
            }));
            const reservationId = newReservation.id;
            history.push(`/listings/${listingId}/reservations/${reservationId}`);
            return null;
        }
        setErrors(newErrors);
    }

        return (
            <>
                <div className="listing-page-header"
                    id="listing-page-header">
                    <h2>{aListing.name}</h2>
                        <div id="images">
                            {(aListing.id === 15) && <img src={BlueMoon} />}
                            {(aListing.id === 16) && <img src={Bonbibi} />}
                            {(aListing.id === 17) && <img src={Burl} />}
                            {(aListing.id === 18) && <img src={AngryOrchard} />}
                            {(aListing.id === 19) && <img src={Spruce} />}
                            {(aListing.id === 20) && <img src={Montana} />}
                            {(aListing.id === 21) && <img src={SanJose} />}
                        </div>
                    <img src={aListing.picUrl} />
                    <div id='listing-description'>
                        <h3>{aListing.description}</h3>
                    </div>
                    <h3>Maximum Number of Guests: {aListing.maxGuests}</h3>
                    <h3>Price (per day): ${aListing.pricePerDay}</h3>
                    <h4><NavLink exact to="/listings">view some more!</NavLink></h4>
                </div>
                <button 
                    className="button"
                    onClick={handleClick} >
                        Reserve Now
                </button>
                <button
                    className="button"
                    onClick={handleClick}>
                        Leave a Review
                    </button>
            </>
        );
};

export default ListingPage;