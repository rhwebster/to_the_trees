import { createContext, useContext, useState } from 'react';
import { use } from '../../../backend/routes/api';

export const ShowModalContext = createContext();

export const useShowModal = () => useContext(ShowModalContext);

export const ShowModalProvider = (props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <ShowModalContext.Provider value={{ showModal, setShowModal, num, setNum }}>
            {props.children}
        </ShowModalContext.Provider>
    );
};