import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, updateImage } from '../../store/image';
import { getListing } from '../../store/listing';

const EditImageCard = ({image}) => {
    const dispatch = useDispatch();
    const listingImages = useSelector(state => state.listings.singleListing.Images)
    const listingId = useSelector(state => state.listings.singleListing.id)

    const deleteImage = async (imageId) => {
        await dispatch(deleteImage(imageId))
        if (image.previewImage) await dispatch(getListing(listingId))
    }

    const makePreviewImage = async (imageId) => {
        await dispatch(updateImage(imageId))
    }

    return (
        <div className='current-image-preview'>
            <div className='single-image-holder'>
                <img className='preview-image edit-preview-image' src={image.url}></img>
            </div>
            <div className='image-card-button-holder'>
                {!image.previewImage && (
                    <button type='button' onClick={() => makePreviewImage(image.id)}>Make this your preview image</button>
                )}
                {image.previewImage && (
                    <h4>This is your preview image</h4>
                )}
                {listingImages.length > 0 && (
                    <button type='button' onClick={() => deleteImage(image.id)}>Permanently Delete Photo</button>
                )}
            </div>
        </div>
    )
};

export default EditImageCard;