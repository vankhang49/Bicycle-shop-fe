import styles from "./EditRatingModal.module.scss";
import Editor from "../../../components/Editer";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import * as ratingService from "../../../core/services/RatingService";
import {toast} from "react-toastify";
import spinner from "../../../assets/icons/Spinner.gif";

export function EditRatingModal({isOpen, onClose, rating, reRender}) {
    const [content, setContent] = useState("");
    const [star, setStar] = useState(0);
    const [hasOpened, setHasOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({});

    useEffect(() => {
        const fetchData = async () => {
            setValue("ratingId", rating.ratingId);
            setValue("content", rating.content);
            setValue("star", rating.star);
            setValue("product", rating.product);
            setValue("user", rating.user);
            setContent(rating.content);
            setStar(rating.star);
        }
        if (isOpen && hasOpened) {
            fetchData().then().catch();
        } else if (isOpen) {
            setHasOpened(true);
        }
    }, [rating, hasOpened, isOpen]);

    const onSubmit = (data) => {
        setIsLoading(true);
        data.content = content;
        setTimeout(async ()=>{
            try {
                await ratingService.updateRating(data);
                toast.success("Hoàn thành đánh giá!");
            } catch (e) {
                toast.error(e);
            } finally {
                setIsLoading(false);
                reRender();
            }
        }, 2000);

    }

    const handleChangeContent = (value) => {
        setContent(value);
    }

    const handleStarChange = (e) => {
        setStar(parseInt(e.target.value));
        setValue("star", Number.parseInt(e.target.value));
    }

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalContent}>
                <div className={styles.title}>
                    <h2>Đánh giá sản phẩm</h2>
                </div>
                <form className={styles.formRating} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formElement}>
                        <div className={styles.titleElement}>Chất lượng sản phẩm:</div>
                        <div className={styles.rating}>
                            <input value="5" name="rate" id="star5" checked={star === 5}
                                   type="radio" {...register("star")} onChange={handleStarChange}/>
                            <label title="text" htmlFor="star5"></label>
                            <input value="4" name="rate" id="star4" checked={star === 4}
                                   type="radio" {...register("star")} onChange={handleStarChange}/>
                            <label title="text" htmlFor="star4"></label>
                            <input value="3" name="rate" id="star3" checked={star === 3}
                                   type="radio" {...register("star")} onChange={handleStarChange}/>
                            <label title="text" htmlFor="star3"></label>
                            <input value="2" name="rate" id="star2" checked={star === 2}
                                   type="radio" {...register("star")} onChange={handleStarChange}/>
                            <label title="text" htmlFor="star2"></label>
                            <input value="1" name="rate" id="star1" checked={star === 1}
                                   type="radio" {...register("star")} onChange={handleStarChange}/>
                            <label title="text" htmlFor="star1"></label>
                        </div>
                    </div>
                    <div className={styles.formElement}>
                        <div className={styles.titleElement}>Nội dung:</div>
                        <Editor value={content} onChange={handleChangeContent} className={styles.formLabel}/>
                    </div>
                    <div className={styles.modalFooter}>
                        <button type="submit" disabled={isLoading} className={styles.cancel}>
                            {isLoading ? <img src={spinner} alt="spinner"/> : "Cập nhật"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}