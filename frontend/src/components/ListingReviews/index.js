import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import ListingReviews from './ListingReviews';

export default ListingReviews = () => {
 const [showModal, setShowModal] = useState(false);

 document.body.style.overflow = showModal ? 'hidden' : 'unset';

 return (
    <>
        <button onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <ListingReviews />
            </Modal>
        )}
    </>
 );
}