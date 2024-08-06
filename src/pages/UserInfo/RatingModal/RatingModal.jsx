import styles from "./RatingModal.module.scss";
import Editor from "../../../components/Editer";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import * as productService from "../../../core/services/ProductService";
import * as ratingService from "../../../core/services/RatingService";
import {toast} from "react-toastify";
import spinner from "../../../assets/icons/Spinner.gif";

export function RatingModal({isOpen, onClose, bill}) {
    const [products, setProducts] = useState([]);
    const [content, setContent] = useState('');
    const [hasOpened, setHasOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({
        defaultValues: {
            ratings: []
        }
    });

    useEffect(() => {
       
        const fetchData = async () => {
            for (const billItem of bill.billItems) {
                await getProductsByPriceId(billItem.pricing.priceId);
            }
        }
        if (isOpen && hasOpened) {
            fetchData().then().catch();
        } else if (isOpen) {
            setHasOpened(true);
        }
    }, [bill, hasOpened, isOpen]);

    const getProductsByPriceId = async (priceId) => {
        try {
            const temp = await productService.getProductByPriceId(priceId);
            const tempArr = products;
            if (!tempArr.includes(temp)) {
                tempArr.push(temp);
            }
            setProducts(tempArr);
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = (data) => {
        setIsLoading(true);
        data.ratings = products.map((product) => ({
            product: product,
            user: null,
            star: data.star,
            content: content,
        }));
        setTimeout(async ()=>{
            try {
                await ratingService.saveRatingList(data.ratings);
                toast.success("Hoàn thành đánh giá!");
            } catch (e) {
                toast.error(e);
            } finally {
                setIsLoading(false);
                onClose();
            }
        }, 2000);

    }

    const handleChangeContent = (value) => {
        setContent(value);
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
                            <input value="5" name="rate" id="star5" type="radio" {...register("star")}/>
                            <label title="text" htmlFor="star5"></label>
                            <input value="4" name="rate" id="star4" type="radio" {...register("star")}/>
                            <label title="text" htmlFor="star4"></label>
                            <input value="3" name="rate" id="star3" type="radio" {...register("star")}/>
                            <label title="text" htmlFor="star3"></label>
                            <input value="2" name="rate" id="star2" type="radio" {...register("star")}/>
                            <label title="text" htmlFor="star2"></label>
                            <input value="1" name="rate" id="star1" type="radio" {...register("star")}/>
                            <label title="text" htmlFor="star1"></label>
                        </div>
                    </div>
                    <div className={styles.formElement}>
                        <div className={styles.titleElement}>Nội dung:</div>
                        <Editor value={content} onChange={handleChangeContent} className={styles.formLabel}/>
                    </div>
                    <div className={styles.modalFooter}>
                        <button type="submit" disabled={isLoading} className={styles.cancel}>
                            {isLoading ? <img src={spinner} alt="spinner"/> : "Đăng tải"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}