import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { createListing } from '../../store/listing';
import { addImage } from "../../store/image";

import './index.css';

const CreateListing = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cityState, setCityState] = useState('');
    const [desciption, setDescription] = useState('');
    const [maxGuests, setMaxGuests] = useState(0);
    const [pricePerNight, setPricePerNight] = useState(0);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [images, setImages] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const [listingErrors, setListingErrors] = useState([]);
    const checker = (param) => {
        if (!param || param.length > 255) return true;
        else return false;
    }

    const handleListingErrors = () => {
        let errors = [];
        if (!name) errors.push('Need Treehouse Name');
        if (name.length > 255) errors.push('Treehouse Name is Too Long');
        if (checker(address)) errors.push('Please enter valid address');
        if (checker(cityState)) errors.push('Please enter valid City and State');
        if (checker(desciption)) errors.push('Please enter a description between 1 and 255 characters');
        if (pricePerNight < 1 || pricePerNight > 10000 || isNaN(pricePerNight)) errors.push('Please enter a valid price (less than $10,000');
        if (maxGuests < 1 || isNaN(maxGuests)) errors.push('Please enter a valid number of guests');
        if (lat > 90 || lat < -90 || isNaN(lat)) errors.push('Please enter a valid latitude');
        if (lon > 180 || lon < -180 || isNaN(lon)) errors.push('Please enter a valid longitude');
        setListingErrors(errors);
        return errors;
    }

    const handlePhotos = () => {
        let errors = [];
        if (!images.length) errors.push('Please upload at least one image')
        if (images.length > 10) errors.push('The maximum number of images you can upload is 10');
        setImageErrors(errors);
        return errors;
    };

    useEffect(() => {
        handlePhotos();
    }, [images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (listingErrors.length !== 0) return
        else {
            data = { name, address, cityState, desciption, 
                    maxGuests, pricePerNight, lat, lon };
            const photo1 = { url: url }
            listing.previewImageId = photo1.id;

            const newListing = await dispatch(createListing(data));
            if (!images) {
                if (photo1) {
                    setImageLoading(true);
                    const newPhoto = await dispatch(addImage(photo1));
                    setImageLoading(false);
                    setName('');
                    setAddress('');
                    setCityState('');
                    setDescription('');
                    setMaxGuests(0);
                    setPricePerNight(0);
                    setLon(0);
                    setLat(0);
                    history.push(`/listings/${newListing.id}`);
                    return newListing
                }
            }
        }
    }
}