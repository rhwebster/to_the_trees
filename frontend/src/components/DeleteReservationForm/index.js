import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import './index.css';

const DeleteReservationForm = ({setShowDeletReservation, showDeleteReservation, reservationId, deleteReservation}) => {
    document.body.style.overflow = showDeleteReservation ? 'hidden' : 'unset';

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        }
    });

    return (
        <div className="delete-review-holder delete-reservation">
            <div className="delete-review signup-exit-holder">
                <div onClick={() => setShowDeletReservation(false)} className="circle delete-review">
                <i id="exit-reviews" className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div>
                <div>
                    <h4>Cancel Your Reservation?</h4>
                </div>
                <div className="delete-review-bottom-navigation">
                    <div>
                        {"< "}<Link className="underline" onClick={() => setShowDeletReservation(false)}>Back</Link>
                    </div>
                    <button className="delete-review-button-perm" onClick={() => deleteReservation(reservationId)}>Cancel Reservation</button>
                </div>
            </div>
        </div>
    )
};

export default DeleteReservationForm;