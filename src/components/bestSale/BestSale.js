import bikePng from "../../assets/images/bike-png.png";
import "./BestSale.scss";

export function BestSale() {

    return (
        <div className="bestSales">
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