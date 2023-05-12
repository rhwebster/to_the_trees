import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';

import { Modal } from '../../../context/Modal';
import LoginForm from '../../LoginForm/index';
import { getListingReservations, createReservation } from '../../../store/reservation';
import { isBetweenDates, calculateStay } from '../../../helpers';

import 'index.css';

import Confirmation from './confirmation';
import Instructions from '../ReservationInstructions';

const ListingReservations = ({listing, formatRating}) => {

    const dispatch = useDispatch();
    const resys = useSelector(state => state.reys)
    const user = useSelector(state => state.session.user)

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        dispatch(getListingReservations(listing.id))
    },[dispatch])

    useEffect(() => {
        for(let id in resys) {
            const startDate = resys[id].startDate;
            const endDate = resys[id].endDate;

            if (isBetweenDates(startDate, selectedDate[0], selectedDate[1]) || 
                isBetweenDates(endDate, selectedDate[0], selectedDate[1])) {
                setErrors(['Treehouse is already booked for these dates']);
                return;
            }

            if (new Date(selectedDate[0]).getDate() === new Date(selectedDate[1]).getDate() &&
                new Date(selectedDate[0]).getMonth() === new Date(selectedDate[1]).getMonth() && 
                new Date(selectedDate[0]).getFullYear() === new Date(selectedDate[1]).getFullYear()) {
                    setErrors(['Please select a checkout date after a checkin date']);
                    setStartDate('');
                    setEndDate('');
                } else {
                    setErrors([]);
                }
        }
    }, [selectedDate])

    useEffect(() => {
        if (errors.length) setDisabled(true)
        if (!selectedDate && (!startDate && !endDate)) {
            setDisabled(true)
        }
        if (!selectedDate && (startDate && endDate)) {
            setDisabled(true)
        }
        if (selectedDate && !errors.length) setDisabled(false);
    }, [startDate, endDate, selectedDate, errors]);

    const booked = ({activeStartDate, date, view}) => {
        const today = new Date();
        if (date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
                return true;
            }
        for (let id in resys) {
            const start = resys[id].startDate
            const end = resys[id].endDate
            if (isBetweenDates(date, start, end)) return true;
        } return false;
    }

    const formatPrice = (price) => {
        let formatted = String(price);
        let decimals = formatted.split('.');
        if (decimals[1]?.length > 2) {
            return [decimals[0],decimals[1].slice(0,2)].join('.');
        } else {
            return formatted;
        }
    };

    const clearDates = () => {
        setSelectedDate('');
        setStartDate('');
        setEndDate('');
        setErrors([]);
        setDisabled(true);
    }

    const selectDates = (val, e) => {
        if (!startDate) setStartDate(new Date(val))
        if (startDate && startDate < new Date(val)) setEndDate(new Date(val))
        if (startDate && startDate > new Date(val)) {
            setEndDate(startDate);
            setStartDate(new Date(val))
        }
        if (endDate) {
            setStartDate(new Date(val));
            setEndDate('');
            setSelectedDate('');
        }
    };

    const formateDate = (date) => {
        return new Intl.DateTimeFormat('en-US').format(date);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            setShowLoginModal(true);
        } else {
            const resy = {
                "startDate": selectedDate[0],
                "endDate": selectedDate[1]
            }
            dispatch(createReservation(listing.id, resy))
                .then(() => dispatch(getListingReservations(listing.id)))
                .then(() => setShowConfirmationModal(true))
            clearDates()
        }
    }

    return (
        <div className='resy-card-holder'>
            <div id='calendar-container'>
                <Instructions user={user} startDate={startDate} endDate={endDate} selectedDate={selectedDate} listing={listing}/>
                <Calendar className={'react-calendar'} value={selectedDate} onChange={setSelectedDate} onClickDay={selectDates}
                    showDoubleView={false} showFixedNumberOfWeeks={false} minDate={new Date()} minDetail={'month'} selectRange={true}
                    goToRangeStartOnSelect={true} tileDisabled={booked} returnValue={'range'} next2Label={null} prev2Label={null}
                    showNeighboringMonth={false}/>
                <div className='clear-dates-holder'>
                    <button className='clear-dates-button' type='button' onClick={clearDates}>Clear Dates</button>
                </div>
            </div>
            <div className='resy-card'>
                <div className='resy-card-top'>
                    <div>
                        <span className='price-per-night'>${listing.pricePerNight}</span>
                    </div>
                    <div className='align-bottom'>
                        <h6>
                            <i className='fa-solid fa-star'/>{formatRating}
                            <span> - </span>
                            {listing.numReviews} {listing.numReviews !== 1 ? `reviews` : `review`}
                        </h6>
                    </div>
                </div>
                <form className='resy-form' onSubmit={handleSubmit}>
                    <div className='date-picker'>
                        <div className='left-input'>
                            <label>Check In</label>
                            <input disabled className='date-display date-checkin' value={startDate ? formateDate(startDate) : 'Select date on calendar'}></input>
                        </div>
                        <div className='right-input'>
                            <label>Check Out</label>
                            <input disabled className='date-display date-checkout' value={endDate ? formateDate(endDate) : 'Select date on calendar'}></input>
                        </div>
                    </div>
                    <button className='resy-button login-button' type='submit' disabled={disabled}>{setSelectedDate ? `Book` : `Selection Reservation`}</button>
                    {showLoginModal && (
                        <Modal onClose={() => setShowLoginModal(false)}>
                            <LoginForm setShowLoginModal={setShowLoginModal}/>
                        </Modal>
                    )}
                    {showConfirmationModal && (
                        <Modal onClose={() => setShowConfirmationModal(false)}>
                            <Confirmation setShowConfirmationModal={setShowConfirmationModal} listing={listing}/>
                        </Modal>
                    )}
                    {errors && errors.map(err => (
                        <div className='errors'>{err}</div>
                    ))}
                </form>
                {(setSelectedDate && !errors.length) && (
                    <>
                    <div className='not-charged'>You will not be charged yet</div>
                    <div className='flex price-calculator'>
                        <div className='price-underline'>${listing.pricePerNight} x {calculateStay(selectedDate[0], selectedDate[1])} night</div>
                        <div>${formatPrice(listing.pricePerNight*calculateStay(selectedDate[0], selectedDate[1]))}</div>
                    </div>
                    <div className='flex total-estimate'>
                        <div>Estimated Total</div>
                        <div>${formatPrice(listing.pricePerNight*calculateStay(selectedDate[0], selectedDate[1]))}</div>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default ListingReservations;