import { createContext, useContext, useState } from "react";

const ModalPicturesContext = createContext();

// eslint-disable-next-line react/prop-types
export const ModalPicturesProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [indexPicture, setIndexPicture] = useState(0);

    const changePictures = (pictures) => {
        setPictures(pictures);
    }

    const changeIndex = (index) => {
        setIndexPicture(index);
    }

    const toggleIsOpenModal = (state) => {
        setIsOpen(state);
    }

    return (
        <ModalPicturesContext.Provider value={{
            isOpen,
            pictures,
            indexPicture,
            changePictures,
            toggleIsOpenModal,
            changeIndex,
        }}>
            {children}
        </ModalPicturesContext.Provider>
    );
}

export const usePictures = () => useContext(ModalPicturesContext);