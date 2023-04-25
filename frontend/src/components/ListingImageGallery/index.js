import React from "react";
import { useSelector } from "react-redux";
import ImageGallery from 'react-image-gallery';

import './index.css'

const ListingGallery = ({setShowModal, previewImage, images}) => {
    const listingGallery = useSelector(state => state.listing.images);

    const pics = [];
    for (let pic of listingGallery) {
        pics.push({
            pic.url
        })
    }

    return (
        <ImageGallery items={pics} showBullets={true} 
        showPlayButton={false} slideDuration={0} />
    )
};

export default ListingGallery;