const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, TreehouseReview, sequelize } = require('../../db/models');
const { ValidationError } = require('sequelize');

router.get('/', async(req, res, next) => {
    let {
        page, size, minLat, maxLat, minLon, maxLon, minPrice, max Price
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
            ListingsL list,
            page: page,
            size: size
        });
    });
});