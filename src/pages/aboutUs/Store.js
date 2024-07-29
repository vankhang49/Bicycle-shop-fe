import engineer from "../../assets/images/engineer.jpg";
import td from "../../assets/images/td-nhan-su-partime.png";
import store1 from "../../assets/images/bicycleStore1.jfif";
import store2 from "../../assets/images/bicycleStore2.jfif";
import "./Store.scss";

export function Store() {

    return (
        <section className="awe-section-7">
            <section className="section-store reputation">
                <div className="container">
                    <div className="store-title">
                        <span>Hệ thống cửa hàng</span>
                    </div>
                    <div className="row">
                        <div className="store-item">
                            <div className="image">
                                <img
                                    src={store1}
                                    alt="GIANT BIKE STORE"
                                />
                            </div>
                            <h3>GIANT BIKE STORE</h3>
                            <a href="tel:0916790059">Tel: 0916790059</a>
                            <span>
                                Số 0 XYZ, P. X, Q. Y, Tp. Z
                            </span>
                            <span>Thứ 2 - Chủ nhật (08h00 - 20h00)</span>
                        </div>
                        <div className="store-item">
                            <picture>
                                <img
                                    src={store2}
                                    alt="ONEBIKE.VN"
                                />
                            </picture>
                            <h3>ONEBIKE.VN</h3>
                            <a href="tel:0888430880">Tel: 0888430880</a>
                            <span>Số 0 XYZ, P. X, Q. Y, Tp. Z</span>
                            <span>Thứ 2 - Chủ nhật (08h00 - 20h00)</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-news reputation">
                <div className="container">
                    <div className="row">
                        <div>
                            <div className="section-new-product-title text-center">
                                <h2>DVKBIKE TUYỂN DỤNG</h2>
                                <div className="section-new-product-description">
                                    Ứng tuyển ngay các vị trí: Cửa hàng trưởng, Kho vận, Kỹ thuật,
                                    Marketing, design, TMĐT, bán hàng, kế toán bán hàng,..
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-blogs-link">
                        <div className="news-owl owl-carousel">
                            <div className="owl-stage-outer">
                                <div className="owl-stage">
                                    <div className="item">
                                        <div className="tt-blog-thumb">
                                            <div className="tt-img">

                                                    <img src={td}
                                                         alt="TUYỂN DỤNG NHÂN VIÊN NHÂN SỰ PART - TIME"
                                                         className="img-responsive center-block"
                                                    />

                                            </div>
                                            <div className="tt-title-description">
                                                <div className="tt-background"/>
                                                <div className="tt-title">
                                                    <h3>
                                                        <a className="line-clamp2">
                                                            TUYỂN DỤNG NHÂN VIÊN NHÂN SỰ PART - TIME
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p>
                                                    Bạn đang theo học và yêu thích công việc nhân sự? Bạn
                                                    chưa có nhiều kinh nghi...
                                                </p>
                                                <div className="tt-meta">
                                                    <div className="tt-autor">
                                                        <i className="ion ion-ios-calendar"/> ??/??/202?
                                                    </div>
                                                    <div className="tt-comments">
                                                        <i className="ion ion-ios-chatboxes"/> 0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="tt-blog-thumb">
                                            <div className="tt-img">

                                                    <img src={engineer}
                                                         alt="TUYỂN DỤNG NHÂN VIÊN LẮP RÁP XE ĐẠP THỂ THAO PART - TIME"
                                                         className="img-responsive center-block"
                                                    />

                                            </div>
                                            <div className="tt-title-description">
                                                <div className="tt-background"/>
                                                <div className="tt-title">
                                                    <h3>
                                                        <a className="line-clamp2">
                                                            TUYỂN DỤNG NHÂN VIÊN LẮP RÁP XE ĐẠP THỂ THAO PART -
                                                            TIME
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p>
                                                    HỆ THỐNG PHÂN PHỐI VÀ SỬA CHỮA XE ĐẠP THỂ THAO
                                                    DVKBIKE.VN TUYỂN DỤNG NHÂN VI...
                                                </p>
                                                <div className="tt-meta">
                                                    <div className="tt-autor">
                                                        <i className="ion ion-ios-calendar"/> ??/??/202?
                                                    </div>
                                                    <div className="tt-comments">
                                                        <i className="ion ion-ios-chatboxes"/> 0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="tt-blog-thumb">
                                            <div className="tt-img">

                                                    <img src={engineer}
                                                         alt="TUYỂN DỤNG NHÂN VIÊN LẮP RÁP XE ĐẠP THỂ THAO PART - TIME"
                                                         className="img-responsive center-block"
                                                    />

                                            </div>
                                            <div className="tt-title-description">
                                                <div className="tt-background"/>
                                                <div className="tt-title">
                                                    <h3>
                                                        <a className="line-clamp2">
                                                            TUYỂN DỤNG NHÂN VIÊN LẮP RÁP XE ĐẠP THỂ THAO PART -
                                                            TIME
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p>
                                                    HỆ THỐNG PHÂN PHỐI VÀ SỬA CHỮA XE ĐẠP THỂ THAO
                                                    DVKBIKE.VN TUYỂN DỤNG NHÂN VI...
                                                </p>
                                                <div className="tt-meta">
                                                    <div className="tt-autor">
                                                        <i className="ion ion-ios-calendar"/> ??/??/202?
                                                    </div>
                                                    <div className="tt-comments">
                                                        <i className="ion ion-ios-chatboxes"/> 0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="owl-nav">
                                <div className="owl-prev">
                                    <i className="fa fa-angle-left" aria-hidden="true"/>
                                </div>
                                <div className="owl-next">
                                    <i className="fa fa-angle-right" aria-hidden="true"/>
                                </div>
                            </div>
                            <div className="owl-dots disabled"/>
                        </div>
                    </div>
                </div>
            </section>
        </section>

    );
}