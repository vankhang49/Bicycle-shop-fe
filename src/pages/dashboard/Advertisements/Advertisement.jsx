import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import "./Advertisement.scss";
import {useEffect, useState} from "react";
import * as advertisementService from "../../../core/services/AdvertisementService";
import {useForm} from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import {UploadOneImage} from "../../../firebase/UploadImage";
import {toast} from "react-toastify";

export function Advertisements() {
    const [advertisements, setAdvertisements] = useState([]);
    const [isChangeAd, setIsChangeAd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({
        defaultValues: {
            adList : []
        }
    });
    useEffect(()=> {
        const fetchData = async () => {
            await getAllAdvertisement();
        }
        fetchData();
    }, [])

    const getAllAdvertisement = async () => {
        try {
            const temp = await advertisementService.getAllAdvertisements();
            setAdvertisements(temp);
            const adList = temp.map((advertisement) => ({
                id: advertisement.id,
                img: advertisement.img,
                dateCreate: advertisement.dateCreate,
            }))
            setValue("adList", adList);
        } catch (error) {
            setAdvertisements([]);
        }

    }

    const handleOneImageUrlChange = async (uploadedImageUrl, index) => {
        await setValue(`adList[${index}].img`, uploadedImageUrl);
        const temp = [...advertisements];
        temp[index] = { ...temp[index], img: uploadedImageUrl };
        setAdvertisements(temp);
        setIsChangeAd(true);
    }

    const triggerFileInput = (inputClass) => {
        setIsLoading(true);
        document.querySelector(inputClass).click();
    };

    const onSubmit = async (data) => {
        console.log(data.adList);
        try {
             await advertisementService.updateAdvertisement(data.adList);
            toast.success("Đăng quảng cáo thành công!");
        } catch (e) {
            toast.error(e);
        }
    }

    return(
        <DashboardMain path={'advertisements'} content={
            <main id="advertisement">
                <form className="content-element" onSubmit={handleSubmit(onSubmit)}>
                    <div className="title">
                        <h2>Danh sách quảng cáo</h2>
                    </div>
                    <div className="img-box">
                        <div className="index-edit">
                            <div className="index">
                                <p>No</p>
                                <p>1</p>
                            </div>
                            <div className="edit" onClick={() => triggerFileInput(".advertisement0")}>
                                <FaEdit/>
                            </div>
                        </div>
                        <div className="post-ad">
                            <UploadOneImage className='advertisement0'
                                            onImageUrlChange={(url) => handleOneImageUrlChange(url, 0)}
                            />
                        </div>
                        <div className="img-ad">
                            <img src={advertisements.length > 0 ? advertisements[0]?.img : ""} alt="Advertisement"/>
                        </div>
                    </div>
                    <div className="img-box">
                        <div className="index-edit">
                            <div className="index">
                                <p>No</p>
                                <p>2</p>
                            </div>
                            <div className="edit" onClick={() => triggerFileInput(".advertisement1")}>
                                <FaEdit/>
                            </div>
                        </div>
                        <div className="post-ad">
                            <UploadOneImage className='advertisement1'
                                            onImageUrlChange={(url) => handleOneImageUrlChange(url, 1)}
                            />
                        </div>
                        <div className="img-ad">
                            <img src={advertisements.length > 0 ? advertisements[1]?.img : ''} alt="Advertisement"/>
                        </div>
                    </div>
                    <div className="img-box">
                        <div className="index-edit">
                            <div className="index">
                                <p>No</p>
                                <p>3</p>
                            </div>
                            <div className="edit" onClick={() => triggerFileInput(".advertisement2")}>
                                <FaEdit/>
                            </div>
                        </div>
                        <div className="post-ad">
                            <UploadOneImage className='advertisement2'
                                            onImageUrlChange={(url) => handleOneImageUrlChange(url, 2)}
                            />
                        </div>
                        <div className="img-ad">
                            <img src={advertisements.length > 0 ? advertisements[2]?.img : ''} alt="Advertisement"/>
                        </div>
                    </div>
                    { isChangeAd &&
                    <div className="change-advertisement">
                        <button disabled={isChangeAd === false} type={"submit"}>Lưu thay đổi</button>
                    </div>
                    }
                </form>
            </main>
        }/>
    );
}