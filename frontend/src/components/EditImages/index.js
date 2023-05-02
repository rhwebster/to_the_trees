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
    const [fileArray, setFileArray]
}