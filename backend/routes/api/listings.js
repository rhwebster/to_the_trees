const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, TreehouseReview, sequelize } = require('../../db/models');
const { ValidationError } = require('sequelize');

router.get('/', async(req, res, next) => {
    let {
        page, size, minLat, maxLat, minLon, maxLon, minPrice, maxPrice
    } = req.query;

    page = parseInt(page);
    size = parseInt(size);
    if (!page || isNaN(page) || page < 1) {
        page = 1;
    } else {
        page = parseInt(page);
    };

    if (!size || size > 10 || isNaN(size) || size < 1) {
        size = 10;
    } else {
        size = parseInt(size);
    }

    const where = {};

    const errorResult = {
        message: "Validation error",
        statusCode: 400,
        errors: {}
    }

    const offset = size * (page-1);

    if (!isNaN(minLat) && minLat > -90 && minLat < 90) where.minLat = parseInt(minLat);
    else errorResult.errors.minLat = 'Invalid minimum latitude';

    if (!isNaN(maxLat) && maxLat > -90 && maxLat < 90) where.maxLat = parseInt(maxLat);
    else errorResult.errors.maxLat = 'Invalid maximum latitude'

    if (!isNaN(minLon) && minLon > -180 && minLon < 180) where.minLon = parseInt(minLon);
    else errorResult.errors.minLon = 'Invalid minimum longitude'
    
    if (!isNaN(maxLon) && maxLon > -180 && maxLon < 180) where.maxLon = parseInt(maxLon);
    else errorResult.errors.minLat = 'Invalid maximum longitude'
    
    if (minPrice > 0) where.minPrice = parseInt(minPrice)
    else errorResult.errors.minPrice = "Minumum price must be greater than 0"
    
    if (maxPrice > 0 && maxPrice >= minPrice) where.maxPrice = parseInt(maxPrice)
    else errorResult.errors.maxPrice = "Maximum price must be greater than 0"

    if (Object.keys(errorResult.errors).length) {
        res.status(400);
        return res.json(errorResult);
    }

    const listings = await Listing.findAll({
        where,
        include: [{
            model: Image
        }],
        limit: size,
        offset: offset,
        order: ['id']
    });

    return res.json({
        listings,
        page,
        size
    })
});

router.get('/:listingId', async(req, res) => {
    const listing = await Listing.findByPk(req.params.listingId, {
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col())]
            ]
        }
    })

    if (listing) {
        const listingObj = listing.toJSON();
        
        const reviews = await TreehouseReview.findAll({
            where: {
                listingId: req.params.listingId
            }
        });

        const reviewList = [];
        reviews.forEach(review => {
            reviewList.push(review.toJSON());
        })

        if (reviewList.length > 0) {
            let numReviews = reviewList.length;
            let sumRating = 0;

            reviewList.forEach(review => {
                if (listing.id === review.listingId) {
                    numReviews++;
                    sumRating += review.rating; 
                }
            });

            let avgRating = sumRating/numReviews;

            listingObj.avgRating = avgRating;
            listingObj.numReviews = numReviews;
        } else {
            listingObj.avgRating = null;
            listingObj.numReviews = 0;
        }

        res.json(listingObj);
    } else {
        res.status(404);
        res.json({
            message: 'Listing could not be found',
            statusCode: 404
        })
    }
});

router.post('/', requireAuth, async(req, res) => {
    const { name, address, description, maxGuests, pricePerNight, lat, lon } = req.body;

    let listing = await Listing.create({
        name: name, address: address, ownerId: req.user.id, description: description,
        maxGuests: maxGuests, pricePerNight: pricePerNight, lat: lat, lon: lon
    });

    res.status(200);
    return res.json(listing);
});

router.put('/:listingId', requireAuth, async(req, res)  => {
    const { name, address, description, maxGuests, pricePerNight, lat, lon } = req.body;
    
    const listing = await Listing.findByPk(req.params.listingId);

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    };

    if (listing.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        });
    };

    await listing.update({
        name: name,
        address: address,
        description: description,
        maxGuests: maxGuests,
        pricePerNight: pricePerNight,
        lat: lat,
        lon: lon
    });

    return res.json(listing);
});

router.delete('/:listingId', requireAuth, async(req, res) => {
    const listing = await Listing.findByPk(req.params.listingId);

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    };

    if (listing.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        });
    };

    await listing.destroy();

    return res.json({
        message: "Listing successfully deleted",
        statusCode: 200
    });
});

router.get('/:listingId/reviews', async(req, res) => {
    const listing = await Listing.findByPk(req.params.listingId);

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    }

    const reviews = await TreehouseReview.findAll({
        where: {
            listingId: req.params.listingId
        },
        include: [
            {
                model: User,
                arrtibutes: ['name']
            }
        ]
    });

    return res.json({ Reviews: reviews });
});

router.get('/:listingId/images', async(req, res) => {
    const listing = await Listing.findByPk(req.params.listingId);
    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    }

    const images = await Image.findAll({
        where: {
            listingId: req.params.listingId
        }
    })

    return res.json({ Images: images });
});