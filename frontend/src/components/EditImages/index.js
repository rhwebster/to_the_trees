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
}