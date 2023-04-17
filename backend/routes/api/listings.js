const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, TreehouseReview, sequelize } = require('../../db/models');
const { ValidationError } = require('sequelize');

router.get('/', async(req, res, next) => {
    let {
        page, size, minLat, maxLat, minLon, maxLon, minPrice, maxPrice
    } = req.query;

    const where = {};

    const errorResult = {
        message: "Validation error",
        statusCode: 400,
        errors: {}
    }

    if (!page) {
        page = 1;
    } else if (isNaN(page) || page < 1) {
        errorResult.errors.page = 'Page must be greater than or equal to 1';
    } else {
        page = parseInt(page);
    };

    if (!size || size > 20) {
        size = 20;
    } else if (isNaN(size) || size < 1) {
        errorResult.errors.size = 'Size must be greater than or equal to 1';
    } else {
        size = parseInt(size);
    }

    const limit = size;
    const offset = size * (page-1);

    if(minLat < -90 || minLat > 90) {
        errorResult.errors.minLat = 'Invalid minimum latitude'
    }
    if(minLon < -90 || minLon > 90) {
        errorResult.errors.maxLat = 'Invalid maximum latitude'
    }
    if(minLon < -180 || minLon > 180) {
        errorResult.errors.minLon = 'Invalid minimum longitude'
    }
    if(maxLon < -180 || maxLon > 180) {
        errorResult.errors.minLat = 'Invalid maximum longitude'
    }
    if (minPrice < 1) {
        errorResult.errors.minPrice = "Minumum price must be greater than 0"
    }
    if (maxPrice < 1) {
        errorResult.errors.maxPrice = "Maximum price must be greater than 0"
    }

    if (Object.keys(errorResult.errors).length) {
        res.status(400);
        return res.json(errorResult);
    }

    const listings = await Listing.findAll({
        where,
        include: [{
            model: Image
        }],
        limit: limit,
        offset: offset,
        order: ['id']
    });

    let list = [];
    listings.forEach(listing => {
        list.push(listing.toJSON());
    })

    listings.forEach(listing => {
        let reviews;
        let numReviews = 0;
        let sumRating = 0;
        list.forEach(review => {
            if (listing.id === treehouseReview.listingId) {
                numReviews++;
                sumRating += treehouseReview.rating;
                reviews = true;
            }
        })

        let avgRating = sumRating/reviews;
        listing.rating = avgRating;

        if (!review) {
            listing.avgRating = null;
        }

        return res.json({
            Listings: list,
            page: page,
            size: size
        });
    });
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