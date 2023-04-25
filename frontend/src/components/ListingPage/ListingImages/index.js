import React, { useState } from "react";
import { Modal } from '../../../context/Modal';
import ListingGallery from "../../ListingImageGallery";

const ListingImagesCard = ({previewImage, images}) => {
    const [showModal, setShowModal] = useState(false);

    return previewImage ? (
        <>
        <div onClick={() => setShowModal(true)} className="picture-card">
            <div className="preview-image">
                {previewImage && <img className="details-preview-image" src={previewImage.url} alt='preview' />}
            </div>
            <div className="image-holder-right">
                <div className="right-image-box top-left">
                    <img className="details-images top-left-img" src={images[0]?.url || ''}
                    onError={({ target }) => {
                        target.onerror=null
                        target.src=''
                    }} alt='others'/>
                </div>
                <div className="right-image-box top-right">
                    <img className="details-images top-right-img" src={images[1]?.url || ''}
                        onError={({ target }) => {
                            target.onerror = null
                            target.src = ''
                    }} alt='others' />
                </div>
                <div className="right-image-box bottom-left">
                    <img className="details-images curved bottom-left-img" src={images[2]?.url || ''}
                        onError={({ target }) => {
                            target.onerror = null
                            target.src = ''
                    }} alt='others' />
                </div>
                <div className="right-image-box bottom-right">
                    <img className="details-images curved bottom-right-img" src={images[3]?.url || ''}
                        onError={({ target }) => {
                            target.onerror = null
                            target.src = ''
                    }} alt='others' />
                </div>
            </div>
        </div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <ListingGallery previewImage={previewImage} images={images} setShowModal={setShowModal} />
            </Modal>
        )}
        </>
    ) : null;
};

export default ListingImagesCard;