import bikePng from "../../assets/images/bike-png.png";
import "./BestSale.scss";
import {useEffect, useRef} from "react";

export function BestSale() {
    const bestSalesRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const bestSalesPosition = bestSalesRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Kiểm tra nếu bestSales vào trong viewport
            if (bestSalesPosition.top <= windowHeight && bestSalesPosition.bottom >= 0) {
                // Thêm lớp fadeIn vào các phần tử .polygon khi BestSale vào viewport
                const polygons = bestSalesRef.current.querySelectorAll('.polygon');
                polygons.forEach((polygon, index) => {
                    polygon.classList.add(index % 2 === 0 ? 'fadeInRight' : 'fadeInLeft');
                });
                // Ngừng lắng nghe sự kiện scroll sau khi thêm lớp fadeIn
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bestSales" ref={bestSalesRef}>
            <div className="sale polygon">
                <div className="sale-element">
                    <div className="imageProduct">
                        <img src={bikePng} alt="bike"/>
                    </div>
                    <div className="textBox">
                        <h3>NEW PRODUCTS</h3>
                        <p className="productName">TRIK MOUTAIN BIKE SERI 6</p>
                        <p className="shortDescription">
                            Xe đạp được làm hoàn toàn từ nguyên liệu Cacbon, khiến khung xe trở nên siêu nhẹ
                        </p>
                        <span className="price">99,999,999 VNĐ</span>
                        <div className="buyButton">
                            <button>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sale polygon">
                <div className="sale-element">
                    <div className="textBox">
                        <h3>BESTSELLER</h3>
                        <p className="productName">TRIK MOUTAIN BIKE SERI 6</p>
                        <p className="shortDescription">
                            Xe đạp được làm hoàn toàn từ nguyên liệu Cacbon, khiến khung xe trở nên siêu nhẹ
                        </p>
                        <span className="price">99,999,999 VNĐ</span>
                        <div className="buyButton">
                            <button>Shop Now</button>
                        </div>
                    </div>
                    <div className="imageProduct">
                        <img src={bikePng} alt="bike"/>
                    </div>
                </div>
            </div>
            <div className="sale polygon">
                <div className="sale-element">
                    <div className="imageProduct">
                        <img src={bikePng} alt="bike"/>
                    </div>
                    <div className="textBox">
                        <h3>SPECIALS</h3>
                        <p className="productName">TRIK MOUTAIN BIKE SERI 6</p>
                        <p className="shortDescription">
                            Xe đạp được làm hoàn toàn từ nguyên liệu Cacbon, khiến khung xe trở nên siêu nhẹ
                        </p>
                        <span className="price">99,999,999 VNĐ</span>
                        <div className="buyButton">
                            <button>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}