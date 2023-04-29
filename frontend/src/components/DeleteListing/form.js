import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { deleteListing, getAllListings } from "../../store/listing";
import './form.css';

const DeleteForm = ({listingId, setShowModal}) => {
    const [checked, setChecked] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteListing(listingId))
            .then(() => getAllListings())
            .then(() => history.push('/'))
    };

    return (
        <div className="delete-holder">
            <div className="exit-holder">
                <div onClick={() => setShowModal(false)} className="circle">
                <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="delete-alerts-holder">
                <h4 className="delete-alert">Removing your Treehouse is permanent</h4>
                <h4 className="delete-alert"><i className="red fa-solid fa-circle-exclamation"></i> You'll lose all of your Treehouse information </h4>
                <div>
                    <div className="checkbox">
                        <input type="checkbox" className="delete-checkbox" value={checked} onChange={() => setChecked(!checked)} checked={checked ? true : false} />
                        <span className="delete-alert">I understand that deleting my Treehouse means I'll no longer have access to any of its information</span>
                    </div>
                </div>
            </div>
            <div className="bottom-nav">
                <div>
                    {"< "}<Link className="underline" onClick={() => setShowModal(false)}>Back</Link>
                </div>
                <button className="delete-button" onClick={handleSubmit} disabled={checked ? false : true}>Permanently Delete Treehouse</button>
            </div>
        </div>
    )
};

export default DeleteForm;