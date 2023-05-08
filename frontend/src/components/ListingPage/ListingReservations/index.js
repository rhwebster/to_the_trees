import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';

import { Modal } from '../../../context/Modal';
import LoginForm from '../../LoginForm/index';
import { getListingReservations, createReservation } from '../../../store/reservation';
import { isBetweenDates, calculateStay } from '../../../helpers';

import 'index.css';

import Confirmation from './confirmation';

const ListingReservations = ({listing, formatRating}) => {

    const dispatch = useDispatch();
    const history = useHistory();
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
        for(let id in bookings) {
            const startDate = bookings[id].startDate;
            const endDate = bookings[id].endDate;

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
        for (let id in bookings) {
            const start = bookings[id].startDate
            const end = bookings[id].endDate
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
        if (startDate && startDate < new Date(val)) setEndDate(new Date(vale))
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

    return ()
};

export default ListingReservations;