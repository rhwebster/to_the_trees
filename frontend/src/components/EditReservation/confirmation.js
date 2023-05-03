import { Link } from "react-router-dom";

const EditConfirmation = ({listing, setShowConfirmationModal}) => {
    return (
        <div className="delete-review-holder">
            <div className="delete-review signup-exit-holder">
                <div onClick={() => setShowConfirmationModal(false)} className="circle delete-review">
                    <i id="exit-reviews" className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div>
                <div>
                    <h4>Successfully changed reservation at {listing.name}</h4>
                </div>
                <div className="delete-review-bottom-navigation">
                    <div>
                        {"< "}<Link className="underline" onClick={() => setShowConfirmationModal(false)}>Back</Link>
                    </div>
                    <Link id="reservation-confirmation-link" className="delete-review-button-perm" to="/reservations">View Upcoming Stays</Link>
                </div>
            </div>
        </div>
    )
};

export default EditConfirmation;