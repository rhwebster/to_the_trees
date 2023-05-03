import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateListing, getOneListing } from "../../../store/listing";

import DeleteListingModal from "../../DeleteListing/modal";
import EditImages from "../../EditImages";

const UpdateListingForm = () => {
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const history = useHistory();

    const listing = useSelector(state => state.listings.singleListing);

    const [address, setAddress] = useState('loading' || listing.address);
    const [cityState, setCityState] = useState('loading' || listing.cityState);
    const [name, setName] = useState('loading' || listing.name);
    const [desciption, setDescription] = useState('loading' || listing.desciption);
    const [pricePerNight, setPricePerNight] = useState('loading' || listing.pricePerNight);
    const [maxGuests, setMaxGuests] = useState('loading' || listing.maxGuests);

    const [locationErrors, setLocationErrors] = useState([]);
    const [desciptionErrors, setDescriptionErrors] = useState([]);
    const [priceAndGuestErrors, setPriceAndGuestErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getOneListing(listingId))
            .then(() => setIsLoaded(true))
            .catch(() => history.push('/not-found'))
        
        setName(listing.name || 'loading')
        setAddress(listing.address || 'loading')
        setCityState(listing.cityState || 'loading')
        setDescription(listing.desciption || 'loading')
        setPricePerNight(listing.pricePerNight || 'loading')
        setMaxGuests(listing.maxGuests || 'loading')
    }, [dispatch, isLoaded]);

    const handleLocationErrors = () => {
        const locationErrors = [];
        if (!address.length || address.length > 255) locationErrors.push('Please enter a valid address');
        if (!cityState || cityState.length > 255) locationErrors.push('Please enter a valid City and State');
        return locationErrors;
    }

    const handleDescriptionErrors = () => {
        const desciptionErrors = [];
        if (!name.length || name.length > 49) desciptionErrors.push('Please enter a valid name');
        if (!desciption.length || desciption.length > 255) desciptionErrors.push('Please enter a descrition of 255 characters or less');
        return desciptionErrors;
    }

    const handlePriceAndGuestErrors = () => {
        const errors = [];
        if (isNaN(pricePerNight) || pricePerNight < 1 || pricePerNight > 10000) priceAndGuestErrors.push('Please give a price of $10,000/night or less');
        if (isNaN(maxGuests) || maxGuests < 1 || maxGuests > 100) priceAndGuestErrors('Please enter a maximum number of guests allowed that is less than 100');
        return errors;
    }

    const reset = () => {
        setAddress('');
        setCityState('');
        setName('');
        setDescription('');
        setPricePerNight(100);
        setMaxGuests(1);
        setLocationErrors([]);
        setDescriptionErrors([]);
        setPriceAndGuestErrors([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const locationErrors = handleLocationErrors();
        setLocationErrors(locationErrors);
        const desciptionErrors = handleDescriptionErrors();
        setDescriptionErrors(desciptionErrors);
        const priceAndGuestErrors = handlePriceAndGuestErrors();
        setPriceAndGuestErrors(priceAndGuestErrors);

        if (locationErrors.length || desciptionErrors.length || priceAndGuestErrors.length) {
            return
        } else {
            const data = { name, address, cityState, desciption, maxGuests, pricePerNight }
            const newListing = await dispatch(updateListing(listingId, data));
            reset();
            history.push(`/listings/${newListing.id}`);
            return newListing;
        }
    }

    const increment = (value) => {
        if (value === 'price') setPricePerNight(Number(pricePerNight) + 5);
        if (value === 'guests') setMaxGuests(Number(maxGuests) + 1);
    }
    const decrement = (value) => {
        if (value === 'price') {
            Number(pricePerNight) > 5 ? setPricePerNight(Number(pricePerNight) - 5) : setPricePerNight(0);
        }
        if (value === 'guests') {
            Number(maxGuests) > 2 ? setMaxGuests(Number(maxGuests) - 1) : setMaxGuests(1);
        }
    };

    if (!isLoaded) {
        return (<></>)
    } else {
        return (
            <div className="create-listing-exterior-flex">
                <div className="create-listing-exterior-holder">
                    <h2>Edit Treehouse Information</h2>
                    <Link className="underline" to={`/listings/${listingId}`}>Cancel</Link>
                    <div className="formholder">
                        <form className="create-listing-form" onSubmit={handleSubmit}>
                            <div className="location-exterior">
                            <h4 className="form-directions">Treehouse Location</h4>
                            <div className="location-form">
                                <div className="input">
                                    <label className="location-label" htmlFor="address">Street Address</label>
                                    <input className="location-input" placeholder="Street Address..." id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                                </div>
                                <div className="input">
                                    <label className="location-label" htmlFor="cityState">City and State</label>
                                    <input className="location-label" placeholder="City, State..." id="cityState" type="text" value={cityState} onChange={(e) => setCityState(e.target.value)}></input>
                                </div>
                            </div>
                            {locationErrors.length && (
                                <div className="errors">
                                <i className="fa-solid fa-circle-exclamation"></i>To continue, please provide required info:
                                <ul>
                                {locationErrors.map(err => <li key={err}>{err}</li>)}
                                </ul>
                                </div>
                            )}
                            </div>
                            <EditImages />
                            <div>
                                <h4 className="form-directions">Treehouse Name and Description</h4>
                                <div className="input description-input">
                                    <label className="name-description-title" htmlFor="name">Name</label>
                                    <textarea placeholder="Sequoia Sanctuary..." className="create-text" id="name" 
                                                typeof="text" value={name} onChange={(e) => setName(e.target.value)}/>
                                    <div className="character-counter">
                                        {name && <span>{name.length}/49</span>}
                                    </div>
                                </div>
                                <div className="input description-input">
                                    <label className="name-description-title" htmlFor="description">Descibe your Treehouse</label>
                                    <textarea placeholder="Beautiful spot atop the world's tallest tree..." className="create-text" 
                                                id="description" typeof="text" value={desciption} onChange={(e) => setDescription(e.target.value)}/>
                                    <div className="character-counter">
                                        {desciption && <span>{desciption.length}/255</span>}
                                    </div>
                                </div>
                                {desciptionErrors.length && (
                                    <div className="errors">
                                        <i className="fa-solid fa-circle-exclamation"></i>To continue, please provide required info:
                                        <ul>
                                            {desciptionErrors.map(err => <li key={err}>{err}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="form-directions">Price Per Night</h4>
                                <div className="price-form">
                                    <div className="price-input-holder">
                                        <div className="price-clicker minus" onClick={() => decrement('price')}> - </div>
                                        <input className="price-input" id="pricePerNight" type="number" value={pricePerNight} 
                                                                onChange={(e) => setPricePerNight(e.target.value)}></input>
                                        <div className="price-clicker" onClick={() => increment('price')}> + </div>
                                    </div>
                                    <label className="price-label" htmlFor="pricePerNight">per night</label>
                                </div>
                                <div className="geust-form">
                                    <div className="price-input-holder">
                                        <div className="price-clicker minus" onClick={() => decrement('guests')}> - </div>
                                        <input className="price-input" id="maxGuests" type="number" value={maxGuests}
                                                                onChange={(e) => setMaxGuests(e.target.value)}></input>
                                        <div className="price-clicker" onClick={() => increment('guests')}> + </div>
                                    </div>
                                </div>
                                {priceAndGuestErrors.length && (
                                    <div className="errors">
                                        {priceAndGuestErrors.map(err => <div key={err}><i className="fa-solid fa-circle-exclamation"></i>{err}</div>)}
                                    </div>
                                )}
                            </div>
                            <div className="button-holder">
                                <button className="submit-button">List Your Treehouse</button>
                                <DeleteListingModal listingId={listingId} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateListingForm;