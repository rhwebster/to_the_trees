import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { editReservation, getUserReservations } from '../../store/reservation';
import { getListingReservations } from '../../store/reservation';
import { getOneListing } from '../../store/listing';
import { formatRating, isBetweenDates } from '../../helpers';

import Calendar from 'react-calendar';

import Instructions from '../ListingPage/ReservationInstrutions';
import EditConfirmation from './confirmation';
import { Modal } from '../../context/Modal';

import './index.css';



const EditReservation = () => {
    const { reservationId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const reservations = useSelector(state => state.reservations);
    const listing = useSelector(state => state.listings.singleListing);
    const currentUser = useSelector(state => state.session.user);

    const [loaded, setLoaded] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);
    const [listingId, setListingId] = useState();
    const [selectedDate, setSelectedDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);
    const [disableResy, setDisableResy] = useState(true);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        let currentResy;
        dispatch(getUserReservations())
            .then(() => setInitialLoad(true))
        
        currentResy = Object.values(reservations).find(resy => String(resy.id) === reservationId);

        if (currentResy) {
            setListingId(currentResy.listingId);
            setSelectedDate([new Date(currentResy.startDate), new Date(currentResy.endDate)])
            setStartDate(new Date(currentResy.startDate))
        }
        if (listingId) {
            dispatch(getListingReservations(listingId));
            dispatch(getOneListing(listingId))
                .then(setLoaded(true));
        }
    }, [dispatch, listingId, initialLoad]);

    useEffect(() => {
        setErrors([]);
        for (let resyId in reservations) {
            if (reservations[resyId].id !== Number(reservationId)) {
                let targetBooking = reservations[resyId];
                const startDate = targetBooking.startDate;
                const endDate = targetBooking.endDate;

                if (isBetweenDates(startDate, selectedDate[0], selectedDate[1])) {
                    setErrors(['Treehouse is unavailable for these dates'])
                }
                if (isBetweenDates(endDate, selectedDate[0], selectedDate[1])) {
                    setErrors(['Treehouse is unavailable for these dates'])
                }
            } else {
                setErrors([])
            }
        }
        if ((new Date(selectedDate[0]).getDate() === new Date(selectedDate[1]).getDate()) &&
            (new Date(selectedDate[0]).getMonth() === new Date(selectedDate[1]).getMonth()) &&
            (new Date(selectedDate[0]).getFullYear() === new Date(selectedDate[1]).getFullYear())) {
                setErrors(['Please select two different dates to reserve this Treehouse']);
                setStartDate('');
                setEndDate('');
            }
    }, [selectedDate, reservations]);

    useEffect(() => {
        if (errors.length) setDisableResy(true);
        if (!selectedDate && (!startDate && !endDate)) setDisableResy(true);
        if (!selectedDate && (startDate && !endDate)) setDisableResy(true);
        if (selectedDate && !errors.length) setDisableResy(false);
        if (selectedDate) {
            setStartDate(selectedDate[0])
            setEndDate(selectedDate[1])
        }
    }, [startDate, endDate, selectedDate, errors]);

    const alreadyBooked = ({activeStartDate, date, view}) => {
        for (let resyId in reservations) {
            if (reservations[resyId].id !== Number(reservationId)) {
                const startDate = reservations[resyId].startDate;
                const endDate = reservations[resyId].endDate;
                if (isBetweenDates(date, startDate, endDate)) return true;
            }
        }
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const resy = {
            "startDate": selectedDate[0],
            "endDate": selectedDate[1]
        }
        dispatch(editReservation(reservationId, resy))
            .then(() => setShowConfirmationModal(true))
    }

    const clearDates = () => {
        let currentRes = Object.values(reservations).find(resy => String(resy.id) === reservationId)
        setSelectedDate([new Date(currentRes.startDate), new Date(currentRes.endDate)]);
        setStartDate(new Date(currentRes.startDate));
        setErrors([]);
    }

    const selectDates = (value, event) => {
        if (!startDate) setStartDate(new Date(value));
        if (startDate && startDate < new Date(value)) setEndDate(new Date(value))
        if (startDate && startDate > new Date(value)) {
            setEndDate(startDate)
            setStartDate(new Date(value))
        }
        if (endDate) {
            setStartDate(new Date(value))
            setEndDate('')
            setSelectedDate('')
        }
    }

    const formatDateShort = (date) => {
        return new Intl.DateTimeFormat('en-US').format(date)
    }

    if (!loaded) {
        return (
            <h1>Not loaded, sorry!</h1>
        )
    }

    return (
        <div className='flex outer-container edit-booking'>
            <div className='edit-title-holder'>
            <h1 className='edit-title'>Edit Your Reservation</h1><Link to='/reservations'>Back</Link>
            </div>
            <div id="resy-card-holder" className='edit-resy-border'>
                <div className='calendar-container'>
                    <Instructions currentUser={currentUser} startDate={startDate} endDate={endDate} selectedDate={selectedDate} listing={listing} />
                    <Calendar className={'react-calendar'} value={selectedDate} onChange={setSelectedDate} onClickDay={selectDates}
                    showDoubleView={false} showFixedNumberOfWeeks={false} minDate={new Date()} minDetail={'month'} selectRange={true}
                    goToRangeStartOnSelect={true} tileDisabled={alreadyBooked} returnValue={'range'} next2Label={null} prev2Label={null}
                    showNeighboringMonth={false}/>
                    <div className='clear-dates-holder'>
                        <button className='clear-dates-button' type='button' onClick={clearDates}>Reset Dates</button>
                    </div>
                </div>
                <div className='reservation-card'>
                    <div className='reservation-card-top'>
                        <div>
                            <span className='price-highlight'>{listing.pricePerNight}</span> / night
                        </div>
                        <div className='align-bottom'>
                            <h6>
                                <i className='fa-solid fa-star'/>{listing.rating && formatRating(listing.rating)}
                                <span> - </span>
                                {listing.numReviews} {listing.numReviews === 1 ? `review` : `reviews`}
                            </h6>
                        </div>
                    </div>
                    <form className='resy-form' onSubmit={handleSubmit}>
                        <div className='date-picker'>
                            <div className='left-input'>
                                <label>Check-In</label>
                                <input disabled className='date-display date-checkin' value={startDate ? formatDateShort(startDate) : `Select on Calendar`}></input>
                            </div>
                            <div className='right-input'>
                                <label>Check-Out</label>
                                <input disabled className='date-display date-chekin' value={endDate ? formatDateShort(endDate) : `Select on Calendar`}></input>
                            </div>
                        </div>
                        <button className='resy-button login-button' type='submit' disabled={disableResy}>{selectedDate ? `Change reservation` : `Select reservation`}</button>
                        {showConfirmationModal && (
                            <Modal onClose={() => setShowConfirmationModal(false)}>
                                <EditConfirmation listing={listing} setShowConfirmationModal={setShowConfirmationModal}/>
                            </Modal>
                        )}
                        {errors && errors.map(err => (<div className='errors'>{err}</div>))}
                    </form>
                </div>
            </div>
        </div>
    )
};

export default EditReservation;