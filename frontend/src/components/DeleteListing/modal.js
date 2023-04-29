import React, { useState, useEffect } from "react";
import { Modal } from '../../context/Modal';

import DeleteForm from "./form";
import './modal.css';

const DeleteListingModal = ({listingId}) => {
    const [showModal, setShowModal] = useState(false);

    document.body.style.overflow = showModal ? 'hidden' : 'unset';

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        }
    });

    return (
        <>
            <button className="list-button delete" onClick={(e) => {e.preventDefault(); setShowModal(true)}}>Remove Listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteForm listingId={listingId} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
};

export default DeleteListingModal;