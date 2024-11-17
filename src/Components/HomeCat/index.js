import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeCat = (props) => {



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
                props?.catData?.length!==0 && props?.catData?.map((cat, index) => {
                    return(

                        <SwiperSlide>
                            <div className="item text-center cursor" style={{background:cat.color}}>
                                <img src={`http://localhost:4000/upload/${cat.images[0]}`} />

                                <h6>{cat.name}</h6>
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