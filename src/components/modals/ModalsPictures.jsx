import styles from "./ModalPicture.module.scss";
import {useEffect, useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

// eslint-disable-next-line react/prop-types
export const ModalsPictures = ({isOpen, onClose, listPictures}) => {
    const [pictures, setPictures] = useState(listPictures);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        console.log(pictures)
        if (listPictures !== undefined) {
            setPictures(listPictures);
        }
    }, [listPictures]);

    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (event) => {
                const modalContent = document.getElementById("modalContent");
                if (modalContent && !modalContent.contains(event.target)) {
                    onClose();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen || pictures.length === 0) {
        console.log(null)
        return null;
    }

    const handleNextPicture = () => {
        setIndex((prevIndex) => (prevIndex !== pictures.length - 1 ? prevIndex + 1 : 0));
    };

    const handlePrevPicture = () => {
        setIndex((prevIndex) => (prevIndex !== 0 ? prevIndex - 1 : pictures.length - 1));
    };

    return (
       <div id="modalPicture" className={`${styles.modalPicture} ${isOpen ? styles.open : ''}`}>
           <div id="modalContent" className={styles.modalContent}>
               <div className={styles.pictureContent}>
                   <img src={pictures[index].imageUrl} alt="picture"/>
               </div>
               {pictures.length > 1 &&
                   <div className={styles.action}>
                       <button className={styles.prev} onClick={handleNextPicture}><IoIosArrowBack/></button>
                       <button className={styles.next} onClick={handlePrevPicture}><IoIosArrowForward/></button>
                   </div>
               }
           </div>
       </div>
    );
}