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
    const [maxGuests, setMaxGuests] = useState(4);
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
    const [priceAndGuestErrors, setPriceAndGuestErrors] = useState([]);

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

    const handlePriceAndGuestErrors = () => {
        let errors = [];
        if (isNaN(pricePerNight) || pricePerNight < 1) errors.push('Please provide a price for your treehouse');
        if (pricePerNight > 10000) errors.push('Please list your treehouse at less than $10,000/night');
        if (isNaN(maxGuests) || maxGuests < 1) errors.push('Please provide a valid number of potential guests');
        if (maxGuests > 100) errors.push('You sure your treehouse is big enough for that many people? (maximum guests: 100)')
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
        handlePhotoErrors();
    }, [images]);

    const handleSubmit = async (e) => {
        e.preventDefault();;
        setAddressErrors(handleAddressErrors());
        setPhotoErrors(handlePhotoErrors());
        setDescriptionErrors(handleNameAndDescriptionErrors());
        setPriceAndGuestErrors(handlePriceAndGuestErrors());

        if (addressErrors.length > 0 || photoErrors.length > 0 ||
            desciptionErrors.length > 0 || priceAndGuestErrors.length > 0) {
            return
        } else {
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

    const incrementButton = (value) => {
        if (value === 'price') {
            setPricePerNight(Number(pricePerNight) + 5);
        }
        if (value === 'guests') {
            setMaxGuests(Number(maxGuests) + 1);
        }
    };

    const decrementButton = (value) => {
        if (value === 'price') {
            if (!pricePerNight || pricePerNight <= 5) setPricePerNight(0);
            if (pricePerNight > 5) setPricePerNight(Number(pricePerNight) - 5);
        }
        if (value === 'guests') {
            if (!maxGuests || maxGuests <= 1) setMaxGuests(0);
            if (maxGuests > 1) setMaxGuests(Number(pricePerNight) - 1);
        }
    }

    const update = (e) => {
        const targetFiles = e.target.files;
        const imageArray = [];
        setImages(targetFiles);

        for (const image in images) {
            images.push(URL.createObjectURL(image))
        }
        setFiles(imageArray)
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
                            {addressErrors > 0 && (
                                <div className="errors">
                                    <i className="fa-solid fa-circle fa-cicle-exclamation"></i>Please fill in required fields:
                                    <ul>
                                        {addressErrors.map(err => <li key={err}>{err}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="form-holder">
                            <h4 className="form-instructions photo-section">Add some photos of your Treehouse!</h4>
                            <h5 className="photo-directions">You'll need at least 3 photos to start. You can always add more later if you choose.</h5>
                            <label id="upload-file-label" htmlFor="upload-image-button" className="form-instructions create-listing-photos-button">
                                {images?.length >= 1 ? 'Change photos' : 'Upload a photo'}
                            </label>
                            <input type="file" multiple id="upload-image-button" accept="image/jpeg, image/png" onChange={update}></input>
                            {files && (
                                <div className="flex preview-img-holder">
                                    {files.map(url => (<img className="preview-img" key={url} src={url}></img>))}
                                </div>
                            )}
                            {photoErrors.length > 0 && (
                                <div className="errors">
                                    {photoErrors.map(err => <div key={err}><i className="fa-solid fa-circle-exclamation"></i>{err}</div>)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="form-instructions">Now let's get a name and description for your Treehouse</h4>
                            <div className="input name-input">
                                <label className="name-description-title" htmlFor="name">Name</label>
                                <textarea placeholder="Sequoia Sanctuary..." className="create-text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                <div className="character-count"><span>{name.length}/49</span></div>
                            </div>
                            <div className="input description-input">
                                <labe className="name-description-title" htmlFor="description">Description</labe>
                                <textarea placeholder="Beautiful spot atop the world's tallest tree..." className="create-text description" 
                                id="description" type="text" value={desciption} onChange={(e) => setDescription(e.target.value)}/>
                                <div className="character-count"><span>{desciption.length}/255</span></div>
                            </div>
                            {desciptionErrors.length > 0 && (
                                <div className="errors">
                                    <i className="fa-solid fa-circle-exclamation"></i>Please fill in required fields:
                                    <ul>{desciptionErrors.map(err => <li key={err}>{err}</li>)}</ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="form-instructions">Finally, please set your price and the maximum number of guests</h4>
                            <div className="price-form">
                                <div className="price-input-holder">
                                    <div className="clicker minus" onClick={() => decrementButton('price')}> - </div>
                                    <input className="price-input" id="price" type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)}></input>
                                    <div className="clicker plus" onClick={() => incrementButton('price')}> + </div>
                                </div>
                                <div className="guest-input-holder">
                                    <div className="clicker minus" onClick={() => decrementButton('guests')}> - </div>
                                    <input className="guest-input" id="maxGuests" type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}></input>
                                    <div className="clicker plus" onClick={() => incrementButton('guests')}> + </div>
                                </div>
                                <label className="price-label" htmlFor="price">/ per night</label>
                            </div>
                            {priceAndGuestErrors.length > 0 && (
                                <div className="errors">{priceAndGuestErrors.map(err => <div key={err}><i className="fa-solid fa-circle-exclamation"></i>{err}</div>)}</div>
                            )}
                        </div>
                        <div className="button-holder">
                            {!imageLoading && (
                                <button type="submit" className="list-button">Officially List Your Treehouse</button>
                            )}
                            {imageLoading && (
                                <h2>We're Listing Your Treehouse! It'll be ready in a sec</h2>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreateListing;