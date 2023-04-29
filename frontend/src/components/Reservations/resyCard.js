import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { deleteReservation} from "../../store/reservation";

import DeleteReservationForm from '../DeleteReservationForm';
import { Modal } from "../../context/Modal";

import './index.css';

const ResyCard = ({reservation}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showDeleteReservation, setShowDeletReservation] = useState(false);

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US').format(date);
    };

    return (
        <>
            <div className="reservation-card-holder">
                <div className="reservation-card-top">
                    <div className="reservation-center-holder">
                        <Link className="reservation-link" to={`/listings/${reservation.listingId}`}>
                            <div className="reservation-listing-info">
                                <div className="listing-name">
                                    {reservation.Listing.name}
                                </div>
                                <div>{reservation.Listing.cityState}</div>
                            </div>
                            <img className="flex reservation-dates" src={reservation.Listing.previewImgId} alt=''></img>
                        </Link>
                        <div className="flex reservation-dates">
                            <div>Check In: {formatDate(new Date(reservation.startDate))}</div>
                            <div>Check Out: {formatDate(new Date(reservation.endDate))}</div>
                        </div>
                    </div>
                </div>
                <div className="reservation-card-buttons">
                    <button className="edit-button" onClick={() => history.push(`/reservations/${reservation.id}/edit`)}>Edit Reservation</button>
                    <button className="edit-button" onClick={() => setShowDeletReservation(true)}>Cancel Reservation</button>
                </div>
            </div>
            {showDeleteReservation && (
                <Modal onClose={() => setShowDeletReservation(false)}>
                    <DeleteReservationForm showDeleteReservation={showDeleteReservation} setShowDeletReservation={setShowDeletReservation}
                    reservationId={reservation.id} deleteReservation={dispatch(deleteReservation(reservation.id))}></DeleteReservationForm>
                </Modal>
            )}
        </>
    )
};

export default ResyCard;