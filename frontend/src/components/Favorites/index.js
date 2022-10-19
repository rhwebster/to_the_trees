import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadListings } from '../..store/listings';
import { Link } from 'react-router-dom';
import './index.css';
import { loadFavorites, removeFavorite } from '../..store/favorites';