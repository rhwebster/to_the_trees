import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { getOneListing } from "../../store/listing";

import { Modal } from '../../context/Modal';

