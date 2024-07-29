import "./Why.scss";
import avatar from "../../assets/images/avatar.jpg";
import brand1 from "../../assets/images/2018_Trek_logo_word_mark_wiki_buffer.svg.png";

export function Why(){

    return (
        <section className="awe-section-6">
            <section className="section-news section-news-one">
                <div className="container">
                    <div className="row">
                        <div className="wrapper">
                            <h2>Vì sao bạn nên chọn chúng tôi?</h2>
                        </div>
                        <div className="wrapper-one">
                            <div className="col-lg-4 col-xs-12 one">
                                <a>
                                    <img src={avatar} alt={"..."}/>
                                    <p>
                                        Với hơn 10 năm kinh nghiệm trong lĩnh vực kinh doanh xe đạp, chúng tôi cam kết
                                        mang đến cho khách hàng những sản phẩm chất lượng cao và đáng tin cậy từ các
                                        thương hiệu hàng đầu thế giới.
                                    </p>
                                </a>
                            </div>
                            <div className="col-lg-4 col-xs-12 one">
                                <a>
                                    <img
                                        src={avatar} alt={"..."}
                                    />
                                    <p>
                                        Đội ngũ nhân viên kỹ thuật chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ
                                        khách hàng từ khâu lắp ráp đến bảo dưỡng định kỳ, đảm bảo xe đạp của bạn luôn
                                        hoạt động trong tình trạng tốt nhất.
                                    </p>
                                </a>
                            </div>
                            <div className="col-lg-4 col-xs-12 one">
                                <a>
                                    <img
                                        src={avatar} alt={"..."}
                                    />
                                    <p>
                                        Chúng tôi tự hào cung cấp chính sách bảo hành và hỗ trợ kỹ thuật tận tâm,
                                        giúp khách hàng an tâm khi sử dụng sản phẩm và có những trải nghiệm tuyệt vời
                                        trên mỗi chuyến đi.
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-news reputation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-new-product-title text-center">
                                <h2>Testimonials</h2>
                                <div className="section-new-product-description">
                                    Chúng tôi tự hào khi được sự tín nhiệm từ khách hàng
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-blogs-link">
                        <div className="testimonials-owl owl-carousel not-dqowl">
                            <div className="item">
                                <a className="clearfix">
                                    <img src={avatar} alt="DNGBIKE" className="img-responsive center-block"/>
                                    <p className="name"> Mr. Nguyễn Văn A</p>
                                    <p className="name1">Chủ tịch CLB xe đạp ABC</p>
                                    <p className="content">
                                        “ Từ ngày được anh em trong làng xe đạp giới thiệu, tôi đã chọn DVKBIKE là nơi
                                        mua sắm cũng như chăm sóc cho toàn bộ những chiếc xe của mình. Họ có trình độ
                                        chuyên môn cao, tư vấn rất tốt cũng như sự chuyên nghiệp trong phong cách làm việc
                                        và cuối cùng là sản phẩm có chất lượng tốt mà giá thành lại rất phải chăng.”
                                    </p>
                                </a>
                            </div>
                            <div className="item">
                                <a className="clearfix">
                                    <img
                                        src={avatar}
                                        alt="DNGBIKE"
                                        className="img-responsive center-block"
                                    />
                                    <p className="name"> Mr. Đinh Văn Khang</p>
                                    <p className="name1">
                                        Dân IT trái ngành
                                    </p>
                                    <p className="content">
                                        “Sự chuyên nghiệp cùng kinh nghiệm và kiến thức trong bộ môn xe đạp thể thao của
                                        họ đã giúp tôi mở mang tầm mắt.”
                                    </p>
                                </a>
                            </div>
                            <div className="item">
                                <a className="clearfix">
                                    <img
                                        src={avatar}
                                        alt="DNGBIKE"
                                        className="img-responsive center-block"
                                    />
                                    <p className="name"> Ms. Taylor</p>
                                    <p className="name1">Nhân viên văn phòng</p>
                                    <p className="content">
                                        “Tôi là một người đam mê thể thao tuy nhiên bản thân lại mắc bệnh trỉ vì ngồi lâu.
                                        Thế nhưng, xe đạp đã cứu rỗi cuộc đời tôi! Bằng cách đạp xe mỗi ngày, căn bệnh ấy
                                        của tôi trở nên nặng hơn.”
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-news reputation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-new-product-title text-center">
                                <h2>CÁC ĐỐI TÁC CỦA DVKBIKE</h2>
                                <div className="section-new-product-description">
                                    CHÚNG TÔI VINH DỰ KHI ĐƯỢC CÁC THƯƠNG HIỆU HÀNG ĐẦU THẾ GIỚI CHỌN
                                    LÀM ĐỐI TÁC CHIẾN LƯỢC TẠI VIỆT NAM
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-blogs-link">
                        <div className="brand-owl owl-carousel not-dqowl">
                            <a className="brand-link">
                                <span className="wrp effect-2">
                                  <img
                                      src={brand1}
                                      alt="Xe đạp trinx"
                                  />
                                </span>
                            </a>
                            <a className="brand-link">
                                <span className="wrp effect-2">
                                  <img
                                      src={brand1}
                                      alt="Xe đạp trinx"
                                  />
                                </span>
                            </a>
                            <a className="brand-link">
                                <span className="wrp effect-2">
                                  <img
                                      src={brand1}
                                      alt="Xe đạp trinx"
                                  />
                                </span>
                            </a>
                            <a className="brand-link">
                                <span className="wrp effect-2">
                                  <img
                                      src={brand1}
                                      alt="Xe đạp trinx"
                                  />
                                </span>
                            </a>
                            <a className="brand-link">
                                <span className="wrp effect-2">
                                  <img
                                      src={brand1}
                                      alt="Xe đạp trinx"
                                  />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}