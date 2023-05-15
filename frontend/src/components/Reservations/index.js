import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { csfFetch } from '../../store/csrf';
import { getUserReservations } from '../../store/reservation';

import ResyCard from './resyCard';
import './index.css';

const Reservations = () => {
    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservations);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserReservations())
            .then(() => setLoaded(true))
    }, [dispatch]);

    const reservationArr = Object.values(reservations);
    reservationArr.sort((a,b) => new Date(a.startDate) - new Date(b.startDate));
    const upcoming = reservationArr.filter(resy => (new Date() - new Date(resy.startDate)) < 0);

    return loaded ? (
        <div className="flex center">
            <div className="details-main-holder">
                <h2>Upcoming Reservations</h2>
                <div className="current-reservations-holder">
                    {upcoming.map(resy => (
                        <ResyCard key={resy.id} resy={resy}/>
                    ))}
                </div>
            </div>
        </div>
    ) :  null;
};

export default Reservations;