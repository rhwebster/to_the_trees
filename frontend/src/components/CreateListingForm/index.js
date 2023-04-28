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
    const [pricePerNight, setPricePerNight] = useState(100);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [images, setImages] = useState(null);
    const [url1, setUrl1] = useState('');
    const [files, setFiles] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [addressErrors, setAddressErrors] = useState([]);
    const [photoErrors, setPhotoErrors] = useState([]);
    const [desciptionErrors, setDescriptionErrors] = useState([]);
    const [pricePerNightErrors, setPricePerNightErrors] = useState([]);

    const checker = (param) => {
        if (!param || param.length > 255) return true;
        else return false;
    }

    const handleAddressErrors = () => {
        let errors = [];
        if (checker(address)) errors.push('Please enter valid address');
        if (checker(cityState)) errors.push('Please enter valid City and State');
        setAddressErrors(errors);
        return errors;
    }

    const handlePhotoErrors = () => {
        let errors = [];
        if (!images.length) errors.push('Please upload at least one image')
        if (images.length > 10) errors.push('The maximum number of images you can upload is 10');
        setPhotoErrors(errors);
        return errors;
    };

    const handlePriceErrors = () => {
        let errors = [];
        if (isNaN(pricePerNight) || pricePerNight < 1) errors.push('Please provide a price for your treehouse');
        if (pricePerNight > 10000) errors.push('Please list your treehouse at less than $10,000/night');
        return errors;
    }

    const handleNameAndDescriptionErrors = () => {
        let errors = [];
        if (!name.length) errors.push('Please provide a valid name');
        if (name.length > 49) errors.push('Please choose a shorter name');
        if (desciption.length > 255) errors.push('Description must be 255 characters or less');
        if (!desciption.length) errors.push('Please provide a description');
        return errors;
    }

    const resetState = () => {
        setName('');
        setAddress('');
        setCityState('');
        setDescription('');
        setMaxGuests(0);
        setPricePerNight(100);
        setLon(0);
        setLat(0);
    }

    useEffect(() => {
        handlePhotos();
    }, [images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (listingErrors.length !== 0) return
        else {
            const data = { name, address, cityState, desciption, 
                    maxGuests, pricePerNight, lat, lon };
            const photo1 = { url: url }
            const newListing = await dispatch(createListing(data));
            newListing.previewImageId = photo1.id;
            if (!images) {
                if (photo1) {
                    setImageLoading(true);
                    const newPhoto = await dispatch(addImage(photo1));
                    setImageLoading(false);
                    resetState();
                    history.push(`/listings/${newListing.id}`);
                    return newListing
                } else {
                    setImageLoading(true);
                    const newPhoto = await dispatch(addImage(photo1))
                    setImageLoading(false);
                    resetState();
                    history.push(`/listings/${newListing.id}`);
                    return newListing;
                }
            }
        }
    }

    const incrementButton = (e) => {
        if (e.target.value === pricePerNight) {
            setPricePerNight(Number(pricePerNight) + 5);
        }
        if (e.target.value === maxGuests) {
            setMaxGuests(Number(maxGuests) + 1);
        }
    };

    const decrementButton = (e) => {
        if (e.target.value === pricePerNight) {
            if (!pricePerNight || pricePerNight <= 5) setPricePerNight(0);
            if (pricePerNight > 5) setPricePerNight(Number(pricePerNight) - 5);
        }
        if (e.target.value === maxGuests) {
            if (!maxGuests || maxGuests <= 1) setMaxGuests(0);
            if (maxGuests > 1) setMaxGuests(Number(pricePerNight) - 1);
        }
    }

    const update = (e) => {
        const targetFiles = e.target.files;
        const images = [];
        setImages(targetFiles);

        for (const image in images) {
            images.push(URL.createObjectURL(image))
        }
        setFiles(images)
    };

    return (
        <div className="create-spot-exterior-flex">
            <div className="create-spot-exterior-holder">
                <h2>Host Your Treehouse</h2>
                <Link className="underline" to='/'>Cancel</Link>
                <div className="form-holder">
                    <form className="create-new-listing-form" onSubmit={handleSubmit}>
                        <div className="location-exterior">
                            <h4 className="form-instructions">Treehouse Location</h4>
                            <div className="location-form">
                                <div className="input">
                                    <label className="address-label" htmlFor="address">Address</label>
                                    <input className="address-input" placeholder="Street Address..." id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                                </div>
                                <div className="input">
                                    <label className="cityState-label" htmlFor="cityState">City and State</label>
                                    <input className="address-input" placeholder="City, State..." id="cityState" type="text" value={cityState} onChange={(e) => setCityState(e.target.value)}></input>
                                </div>
                            </div>
                            {listingErrors.length > 0 && (
                                <div className="errors">
                                    <i className="fa-solid fa-circle fa-cicle-exclamation"></i>Please fill in required fields:
                                    <ul>
                                        {listingErrors.map(err => <li key={err}>{err}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}