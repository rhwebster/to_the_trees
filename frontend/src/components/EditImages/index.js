import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateListing } from "../../store/listing";

import EditImageCard from "./card";

const EditImages = () => {
    const listingImages = useSelector(state => state.listings.singleListing.Images)
    const previewImage = listingImages.find(image => image.previewImage === true);
    const listingId = useSelector(state => state.listings.singleListing.id);
    const dispatch = useDispatch();

    const [showEditImages, setShowEditImages] = useState(false);
    const [images, setImages] = useState(null);
    const [fileArray, setFileArray] = useState([]);
    const [photoErrors, setPhotoErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        handleErrors();
    }, [images, fileArray])

    const handleErrors = () => {
        let errors = [];
        if (!listingImages || listingImages.length < 1) {
            errors.push(`Please upload an image`)
            setDisabled(true)
        } else if (listingImages.length > 10){
            errors.push(`You cannot upload more than 10 photos. Choose wisely :)`);
            setDisabled(true);
        } else {
            setDisabled(false)
        }
        setPhotoErrors(errors);
        return errors;
    };

    const updateFiles = (e) => {
        const files  = e.target.files;
        const imageArray = [];
        setImages(files)
        for (let file of files) {
            imageArray.push(URL.createObjectURL(file))
        }
        setFileArray(imageArray);
    };

    const addImages = async () => {
        setImageLoading(true);
        await dispatch(updateListing(listingId, { images }));
        setImageLoading(false);
        setImages(null);
        setFileArray([]);
    };

    return (
        <div className="edit-images-holder">
            <div className="flex half space-between">
                <h4 className="form-directions photo-title">Photos</h4>
                {!showEditImages && (
                    <button className="edit-photos-button" type="button" onClick={() => setShowEditImages(true)}>Edit Images</button>
                )}
            </div>
            {showEditImages && (
                <div className="edit-photos-main">
                    {listingImages && (
                        <div className="bottom-border preview-image-holder current-photos">
                            <div className="current-photos-title">
                                <div onClick={() => setShowEditImages(false)} className="close-photos circle">
                                    <i className="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                            <div className="current-photos-holder">
                                <div className="cover-photo-holder">
                                    <div className="cover-photo-directions">
                                        <h4 className="cover-main-directions form-directions photo-form">Cover Photo</h4>
                                        <h5 className="cover-directions photo-directions">A cover phoot is the first impression of your Treehouse</h5>
                                        <h5 className="cover-directions photo-directions">Choose a different cover photo below</h5>
                                    </div>
                                    <img id="cover-photo" className="preview-image edit-preview-image" src={previewImage?.url} alt=''></img>
                                </div>
                                <div className="cover-photo-directions">
                                    <h4 className="cover-main-directions form-directions photo-form">All Photos</h4>
                                    <h5 className="cover-directions photo-directions">Upload New Photos below</h5>
                                </div>
                                <div className="current-photos-holder">
                                    {listingImages.map(image => (
                                        <EditImageCard image={image} key={image.id}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="preview-photos-bottom">
                        <div className="upload-photos-top">
                            <div className="upload-photos-directions cover-photo-directions">
                                <h4 className="cover-main-directions form-directions photo-form">Upload New Photos</h4>
                                <h5 className="cover-directions photo-directions">Upload up to 10 Photos</h5>
                                {photoErrors.length > 0 && (
                                    <div className="errors">
                                        {photoErrors.map(err => <div key={err}><i className="fa-solid fa-circle-exclamation"></i>{err}</div>)}
                                    </div>
                                )}
                            </div>
                            <div className="upload-photos-holder">
                                {!imageLoading && (
                                    <label id="upload-file-label" htmlFor="upload-image-button" className="form-directions upload-photos-button thirty-four">
                                        {images.length > 0 ? 'Change files' : 'Choose photos to upload'}
                                    </label>
                                )}
                                {(images && !imageLoading) && (
                                    <>
                                        <button className="add-photos-button thirty-four" onClick={() => addImages()} type="button" disabled={disabled}>Upload Files</button>
                                        <div className="cancel-holder">
                                                <button className="edit-photos-button cancel-upload" onClick={() => {
                                                    setImages(null) 
                                                    setFileArray([])
                                                }} type="button">Cancel</button>
                                        </div>
                                    </>
                                )}
                                <input type="file" multiple id="upload-image-button" accept="image/jpeg, image/png" onChange={updateFiles}></input>
                            </div>
                        </div>
                        {(fileArray && !imageLoading) && (
                            <div className="flex preview-img-holder upload-preview-imgs-holder">
                                {fileArray.map(url => (
                                    <img className="preview-img" key={url} src={url} alt=''></img>
                                ))}
                            </div>
                        )}
                        {imageLoading && (
                            <h4>Uploading files, please hold...</h4> 
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};

export default EditImages;