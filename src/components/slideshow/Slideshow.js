import {useEffect, useRef, useState} from "react";
import "./slideshow.scss"

import slider2 from "../../components/slideshow/images/slider_2.webp";
import slider3 from "../../components/slideshow/images/slider_3.webp";
import slider4 from "../../components/slideshow/images/slider_4.webp";
import * as advertisementService from "../../core/services/AdvertisementService";

const images = [slider2, slider3, slider4];
const delay = 3000;

function Slideshow() {
    const [index, setIndex] = useState(0);
    const [advertisements, setAdvertisements] = useState([]);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(()=> {
        const fetchData = async () => {
            await getAllAdvertisement();
        }
        fetchData();
    }, [])

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    const getAllAdvertisement = async () => {
        const temp = await advertisementService.getAllAdvertisements();
        setAdvertisements(temp);
    }

    return (
        <div>
            <div className="slideshow">
                <div
                    className="slideshow-slider"
                    style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}
                >
                    {advertisements.length > 0 ?
                        advertisements.map((advertisement, index) => (
                        <img className="slide" key={index} src={advertisement.img} alt={'slide' + (index + 2)}/>
                        ))
                        :
                        images.map((image, index) => (
                            <img className="slide" key={index} src={image} alt={'slide' + (index + 2)}/>
                        ))
                    }
                </div>
                <a id="prev" onClick={() => {
                    setIndex(index - 1 < 0 ? 0 : index - 1);
                }}
                   style={index > 0 ? {display: 'inline-block'} : {display: 'none'}}>&#10094;</a>
                <a id="next" onClick={() => {
                    setIndex(index > images.length - 1 ? index : index + 1);
                }}
                   style={index === images.length - 1 ? {display: 'none'} : {display: 'inline-block'}}>&#10095;</a>
            </div>
            <div className="slideshow-dots">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshow-dot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Slideshow;