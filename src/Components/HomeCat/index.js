import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeCat = () => {

    const [itemBg, setItemBg] = useState([
        '#fffced',
        '#ecffec',
        '#fffced',
        '#ecffec',
        '#fffced',
        '#ecffec',
        '#fffced',
        '#ecffec',
    ])

    return (
        <section className="homeCat">
            <div className="container">
            <h3 className="mb-3 hd">Sản phẩm</h3>
            <Swiper
                slidesPerView={10}
                spaceBetween={8}
                pagination={true}
                modules={[Navigation]}
                className="mySwiper"
            >
            {
                itemBg?.map((item, index) => {
                    return(

                        <SwiperSlide>
                            <div className="item text-center cursor" style={{background:item}}>
                                <img src='https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png' />

                                <h6>hoodie</h6>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
                
            </Swiper>
            </div>
        </section>
    )
}

export default HomeCat;