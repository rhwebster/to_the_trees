import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { createNewSpot, addSpotImageById, uploadSpotImageByID } from '../../store/spot';

import './CreateSpotPage.css'

const CreateSpotPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')

    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(100)

    const [url1, seturl1] = useState('');
    const [images, setImages] = useState(null)
    const [fileArray, setFileArray] = useState([])
    const [imageLoading, setImageLoading] = useState(false)

    // console.log('images: ', images)



    const [locationErrors, setLocationErrors] = useState([])
    const [photoErrors, setPhotoErrors] = useState([])
    const [descriptionErrors, setDescriptionErrors] = useState([])
    const [priceErrors, setPriceErrors] = useState([])

    const handleLocationErrors = () => {
        const locationErrors = []
        if (!address.length) locationErrors.push('Street address')
        if (address.length > 255) locationErrors.push('Please enter a street address under 255 characters')
        if (!city.length) locationErrors.push('City')
        if (city.length > 255) locationErrors.push('Please enter a city name under 255 characters')
        if (!country.length) locationErrors.push('Country')
        if (country.length > 255) locationErrors.push('Please enter a country under 255 characters')
        if (!state.length) locationErrors.push('State')
        if (state.length > 255) locationErrors.push('Please enter a state under 255 characters')
        //console.log(locationErrors);
        // if (lat === '') locationErrors.push('Latitude')
        // if (lng === '') locationErrors.push('Longitude')
        // if (isNaN(lat) || lat < -90 || lat > 90) locationErrors.push('Please provide a valid latitude')
        // if (isNaN(lng) || lng < -180 || lng > 180) locationErrors.push('Please provide a valid longitude')
        return locationErrors;
    }

    const handlePhotoErrors = () => {
        let errors = [];
        //console.log('url1: ', url1);
        //if (!url1.length) errors.push('At least one photo is required')
        //console.log(url1.length)
        if (!images || images.length < 1) errors.push(' Please upload at least one image')
        if (images?.length > 10) errors.push(' Please upload no more than ten images')
        //console.log(errors);
        setPhotoErrors(errors);
        return errors;
    }

    useEffect(() => {
        // console.log('hello from photo errors use effect')
        handlePhotoErrors();
    }, [images])

    const handleDescriptionErrors = () => {
        let errors = [];
        if (!name.length) errors.push('Title')
        if (name.length > 49) errors.push('Please provide a title under 50 characters')
        if (description.length > 255) errors.push('Please provide a description of 255 characters or less')
        if (!description.length) errors.push('Description')
        return errors;
    }

    const handlePriceErrors = () => {
        let errors = [];
        if (price < 1) errors.push('Please give your spot a price above zero')
        if (price > 10000) errors.push('Please give your spot a price of $10000 or less')
        if (isNaN(price)) errors.push('Please enter a number')
        return errors;
    }

    const reset = () => {
        setAddress('');
        setCity('')
        setState('')
        setCountry('')
        // setLat('')
        // setLng('')
        setName('')
        setDescription('')
        setPrice(100)
        setLocationErrors([])
        setDescriptionErrors([])
        setPriceErrors([])
        setPhotoErrors([])
    }

    const submitSpot = async (e) => {
        e.preventDefault();

        const locationErrors = handleLocationErrors();
        setLocationErrors(locationErrors);
        //console.log('location errors: ', locationErrors);

        const photoErrorss = handlePhotoErrors();
        //console.log('photo errors: ', photoErrorss);
        setPhotoErrors(photoErrorss);
        //console.log('photo errors: ', photoErrors)

        const descriptionErrors = handleDescriptionErrors();
        setDescriptionErrors(descriptionErrors);

        const priceErrors = handlePriceErrors();
        setPriceErrors(priceErrors);



        if (locationErrors.length > 0 || photoErrors.length > 0 || descriptionErrors.length > 0 || priceErrors.length > 0) {
            // console.log('location errors:', locationErrors)
            // console.log('photo errors: ', photoErrors)
            // console.log('description errors: ', descriptionErrors)
            // console.log('price errors: ', priceErrors)
            // console.log('entering if statement')
            return;
        } else {

            const spotData = {
                address,
                city,
                state,
                country,
                // lat,
                // lng,
                name,
                description,
                price
            }



            const photo1 = { url: url1, preview: true }


            //console.log('photo1: ', photo1);
            const newSpot = await dispatch(createNewSpot(spotData));
            if (!images) {
                if (photo1) {
                    setImageLoading(true)
                    const newPhoto1 = await dispatch(addSpotImageById(newSpot.id, photo1))
                    setImageLoading(false)
                    reset();
                    history.push(`/spots/${newSpot.id}`)
                    return newSpot;
                }
            } else {
                setImageLoading(true)
                const newPhoto1 = await dispatch(uploadSpotImageByID(newSpot.id, {
                    images
                }))
                setImageLoading(false)
                // console.log('new spot: ', newSpot)
                reset();
                history.push(`/spots/${newSpot.id}`)
                return newSpot;
            }



        }
    }


    const incrementPrice = (e) => {
        //console.log('increment running')
        setPrice(Number(price) + 5);
    }

    const decrementPrice = (e) => {
        //console.log('decrement running')
        if (!price) return;
        if (price > 5) {
            setPrice(Number(price) - 5);
        }
        if (price <= 5) {
            return;
        }
    }

    const updateFiles = (e) => {
        const files = e.target.files;
        const imagesArray = []
        setImages(files)

        for (let i = 0; i < files.length; i++) {
            imagesArray.push(URL.createObjectURL(files[i]))
        }

        setFileArray(imagesArray)

    };



    return (
        <div className='create-spot-exterior-flex'>
            <div className='create-spot-exterior-holder'>
                <h2>Host Your Home</h2>
                <Link className='underline' to='/'>Exit</Link>
                <div className='form-holder'>
                    <form className='create-spot-form' onSubmit={submitSpot}>
                        <div className='location-exterior'>
                            <h4 className='form-directions'>Where's your place located?</h4>
                            <div className='location-form'>
                                <div className='input'>
                                    <label className='location-label' htmlFor='address'>Street</label>
                                    <input className='location-input' placeholder='Street address here...' id='address' type='text' value={address} onChange={(e) => setAddress(e.target.value)}></input>
                                </div>
                                <div className='input'>
                                    <label className='location-label' htmlFor='city'>City</label>
                                    <input className='location-input' placeholder='City name here...' id='city' type='text' value={city} onChange={(e) => setCity(e.target.value)}></input>
                                </div>
                                <div className='input'>
                                    <label className='location-label' htmlFor='state'>State</label>
                                    <input className='location-input' placeholder='State name here...' id='state' type='text' value={state} onChange={(e) => setState(e.target.value)}></input>
                                </div>
                                <div id="country-input" className='input'>
                                    <label className='location-label' htmlFor='country'>Country</label>
                                    <input className='location-input' placeholder='Country name here...' id='country' type='text' value={country} onChange={(e) => setCountry(e.target.value)}></input>
                                </div>
                            </div>
                            {locationErrors.length > 0 && (
                                <div className='errors'>
                                    <i className="fa-solid fa-circle-exclamation"></i> To continue, please provide this required info:
                                    <ul>
                                        {locationErrors.map(error => <li key={error}>{error}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='form-holder'>
                            <h4 className='form-directions photo-form'>Add some photos of your listing</h4>
                            <h5 className='photo-directions'>You'll need at least five photos to get started. You can add more or make changes later.</h5>
                            <label
                                id='upload-file-label'
                                htmlFor='upload-image-button'
                                className='form-directions create-spot-photos-button'>
                                {images?.length >= 1 ? 'Change photos' : 'Upload from your device'}
                            </label>
                            <input
                                type="file"
                                multiple
                                id="upload-image-button"
                                accept="image/jpeg, image/png"
                                onChange={updateFiles}></input>

                            {fileArray && (
                                <div className='flex preview-img-holder'>
                                    {fileArray.map(url => (
                                        <img className='preview-img' key={url} src={url}></img>
                                    ))}
                                </div>
                            )}
                            {photoErrors.length > 0 && (
                                <div className='errors'>
                                    {photoErrors.map(error => <div key={error}><i className="fa-solid fa-circle-exclamation"></i>{error}</div>)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className='form-directions'>Let's give your place a name and description</h4>
                            <div className='input description-input'>
                                <label className='name-description-title' htmlFor='name'>Create your title</label>
                                <textarea placeholder='Adorable home near you' className='create-text' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                                <div className='character-counter'>
                                    <span>{name.length}/49</span>
                                </div>
                            </div>
                            <div className='input description-input'>
                                <label className='name-description-title' htmlFor='description'>Create your description</label>
                                <textarea placeholder="You'll have a great time at this comfortable place to stay" className='create-text description' id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                                <div className='character-counter'>
                                    <span>{description.length}/255</span>
                                </div>
                            </div>
                            {descriptionErrors.length > 0 && (
                                <div className='errors'>
                                    <i className="fa-solid fa-circle-exclamation"></i> To continue, please provide this required info:
                                    <ul>
                                        {descriptionErrors.map(error => <li key={error}>{error}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className='form-directions'>Now for the fun part - set your price</h4>
                            <div className='price-form'>
                                <div className='price-input-holder'>
                                    <div className='price-clicker minus' onClick={() => decrementPrice()}> – </div>
                                    <input className='price-input' id='price' type='number' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                                    <div className='price-clicker' onClick={() => incrementPrice()}> + </div>
                                </div>
                                <label className='price-label' htmlFor='price'>per night</label>
                            </div>
                            {priceErrors.length > 0 && (
                                <div className='errors'>
                                    {priceErrors.map(error => <div key={error}><i className="fa-solid fa-circle-exclamation"></i> {error}</div>)}
                                </div>
                            )}

                        </div>
                        <div className='button-holder'>
                            {!imageLoading && (
                                <button className='publish-button'>Publish Your Listing</button>
                            )}
                            {imageLoading && (
                                <h2>We're creating your spot! Hold up just a sec {':)'}</h2>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateSpotPage;