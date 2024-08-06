import styles from "./Rating.module.scss";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as ratingService from "../../core/services/RatingService";
import avatar from "../../assets/images/avatar.jpg";

export function Rating({productId}) {
    const [ratings, setRatings] = useState([]);
    const [message, setMessage] = useState(null);
    const [totalPages, setTotalPages] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
        } catch (error) {
            setMessage(error);
        }
    }
    
    const getAllRatingsByUser = async (page, size) => {
        try {
            const temp = await ratingService.getAllRatingsByUserId(productId, page, size);
            setRatings(temp.content);
            setTotalPages(temp.totalPages);
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
            pageNoTags.push(<a key={i} className="page-a" onClick={() => handlePage(i)}>{i + 1}</a>);
        }
        return pageNoTags;
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
                            <div className={styles.fullName}>{rating.user.fullName}</div>
                            <div className={styles.star}>
                                <input value="5" name="rate" id="star5" type="radio" checked={rating.star === 5}/>
                                <label title="text" htmlFor="star5"></label>
                                <input value="4" name="rate" id="star4" type="radio" checked={rating.star === 4}/>
                                <label title="text" htmlFor="star4"></label>
                                <input value="3" name="rate" id="star3" type="radio" checked={rating.star === 3}/>
                                <label title="text" htmlFor="star3"></label>
                                <input value="2" name="rate" id="star2" type="radio" checked={rating.star === 2}/>
                                <label title="text" htmlFor="star2"></label>
                                <input value="1" name="rate" id="star1" type="radio" checked={rating.star === 1}/>
                                <label title="text" htmlFor="star1"></label>
                            </div>
                            <div className={styles.contentRating} dangerouslySetInnerHTML={{__html: rating?.content}}></div>
                        </div>
                    </div>
                ))}
            </div>
            {message !== null && <p className={styles.message}>{message}</p>}
        </div>
    );
}