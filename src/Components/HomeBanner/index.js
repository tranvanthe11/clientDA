import React from "react";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HomeBanner = () => {

    return(
        <div className="container mt-3">
            <div className="homeBannerSection">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation={true}
                    loop={false}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction:false,
                    }}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                    >

                    <SwiperSlide>
                        <div className="item">
                            <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0sil68ehi1b66_xxhdpi" className="w-100"></img>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0y3rlq1dkj35e_xxhdpi" className="w-100"></img>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0y4us25ipt909_xxhdpi" className="w-100"></img>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0sil68ehi1b66_xxhdpi" className="w-100"></img>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0y3rlq1dkj35e_xxhdpi" className="w-100"></img>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0y4us25ipt909_xxhdpi" className="w-100"></img>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )

    // var settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     autoplay: true
    //   };
    // return(
    //     <div className="container mt-3">
    //         <div className="homeBannerSection">
    //             <Slider {...settings}>
    //                 <div className="item">
    //                     <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0sil68ehi1b66_xxhdpi" className="w-100" />
    //                 </div>
    //                 <div className="item">
    //                     <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0y3rlq1dkj35e_xxhdpi" className="w-100" />
    //                 </div>
    //                 <div className="item">
    //                     <img src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0y4us25ipt909_xxhdpi" className="w-100" />
    //                 </div>
    //             </Slider>
    //         </div>
    //     </div>
    // )
}

export default HomeBanner