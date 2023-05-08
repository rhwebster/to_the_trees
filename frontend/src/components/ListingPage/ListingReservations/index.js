import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';

import { Modal } from '../../../context/Modal';
import LoginForm from '../../LoginForm/index';
import { getListingReservations, createReservation } from '../../../store/reservation';
import { isBetweenDates } from '../../../helpers';
import cal

import 'index.css';