import styles from "./Rating.module.scss";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as ratingService from "../../core/services/RatingService";
import avatar from "../../assets/images/avatar.jpg";
import {EditRatingModal} from "./EditRatingModal/EditRatingModal";
import {MdModeEdit} from "react-icons/md";
import {useForm} from "react-hook-form";

export function Rating({productId}) {
    const userId = Number.parseInt(localStorage.getItem("id"));
    const [ratings, setRatings] = useState([]);
    const [message, setMessage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [totalElements, setTotalElement] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [rating, setRating] = useState(null);
    const [isOpenEditRatingModal, setIsOpenEditRatingModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                await getAllRatingsByUser(pageNumber, 5);
            } else {
                await getAllRatings(pageNumber, 5);
            }
        }
        fetchData();
    }, [pageNumber])

    const getAllRatings = async (page, size) => {
        try {
            const temp = await ratingService.getAllRatings(productId, page, size);
            setRatings(temp.content);
            setTotalPages(temp.totalPages);
            setTotalElement(temp.totalElements);
        } catch (error) {
            setMessage(error);
        }
    }
    
    const getAllRatingsByUser = async (page, size) => {
        try {
            const temp = await ratingService.getAllRatingsByUserId(productId, page, size);
            setRatings(temp.content);
            setTotalPages(temp.totalPages);
            setTotalElement(temp.totalElements);
        } catch (error) {
            setMessage(error);
        }
    }

    const handlePage = (pageNo) => {
        setPageNumber(pageNo);
    }

    const showPageNo = () => {
        let pageNoTags = [];
        for (let i = 0; i < totalPages; i++) {
            pageNoTags.push(<a key={i} className={styles.pageA} onClick={() => handlePage(i)}>{i + 1}</a>);
        }
        return pageNoTags;
    }

    const handleOpenEditRatingModal = (rating) => {
        setRating(rating);
        setIsOpenEditRatingModal(true);
    }

    const handleCloseEditRatingModal = () => {
        setIsOpenEditRatingModal(false);
    }

    const handleReRender = async () => {
        handleCloseEditRatingModal();
        await getAllRatingsByUser(pageNumber, 5);
    }

    return(
        <div className={styles.rating}>
            <div className={styles.title}>
                <h2>Đánh giá</h2>
            </div>
            <div className={styles.ratingContent}>
                {ratings && ratings.map((rating) => (
                    <div key={rating.ratingId} className={styles.ratingElement}>
                        <div className={styles.userAvatar}>
                            <img src={rating.user.avatar ? rating.user.avatar : avatar} alt="avatar"/>
                        </div>
                        <div className={styles.elementContent}>
                            <div className={styles.fullName}>
                                <p>{rating.user.fullName}</p>
                                {rating.user.userId === userId &&
                                    <a onClick={()=>handleOpenEditRatingModal(rating)}><MdModeEdit/></a>
                                }
                            </div>
                            <div className={styles.star}>
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <>
                                        <input key={star}
                                            value={star}
                                            disabled
                                            name={`rate-${rating.ratingId}`}
                                            id={`star-${rating.ratingId}-${star}`}
                                            type="radio"
                                            checked={rating.star === star}
                                        />
                                        <label
                                            title="text"
                                            htmlFor={`star-${rating.ratingId}-${star}`}
                                        ></label>
                                    </>
                                ))}
                            </div>
                            <div className={styles.contentRating}
                                 dangerouslySetInnerHTML={{__html: rating?.content}}></div>
                        </div>
                    </div>
                ))}
                {message !== null && <p className={styles.message}>{message}</p>}
                <div className={styles.page}>
                    <div className={styles.pageBox}>
                        {pageNumber !== 0 &&
                            <a className={styles.pageA} onClick={() => handlePage(pageNumber - 1)}>Trang trước</a>
                        }
                        <span>
                                    {showPageNo()}
                                </span>
                        {pageNumber < (totalPages - 1) &&
                            <a className={styles.pageA} onClick={() => handlePage(pageNumber + 1)}>Trang sau</a>
                        }
                    </div>
                </div>
            </div>
            <EditRatingModal
                isOpen={isOpenEditRatingModal}
                onClose={handleCloseEditRatingModal}
                rating = {rating}
                reRender = {handleReRender}
            />
        </div>
    );
}