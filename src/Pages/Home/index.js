import Button from '@mui/material/Button';
import HomeBanner from "../../Components/HomeBanner";
import { FaArrowRightLong } from "react-icons/fa6";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// import Rating from '@mui/material/Rating';
// import { AiOutlineFullscreen } from "react-icons/ai";
import ProductItem from '../../Components/ProductItem';
import HomeCat from '../../Components/HomeCat';

const Home =()=>{


    return(
        <div >
            <HomeBanner />
            <HomeCat />

            <section className="homeProducts">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className='sticky'>
                                <div className="banner">
                                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1726765914/1726765914505_1726335353673_New_Project_26.jpg"
                                        className="cursor w-100" />
                                </div>
                                <div className="banner mt-3">
                                    <img src="https://res.cloudinary.com/da26rdzwp/image/upload/v1726765914/1726765914505_1726335353673_New_Project_26.jpg"
                                        className="cursor w-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 productRow">
                            <div className="d-flex align-items-center">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">Sản phẩm khuyến mãi</h3>
                                </div>

                                <Button className='viewAllBtn ml-auto'>Tất cả <FaArrowRightLong className='ml-1'/></Button>
                            </div>

                            <div className='product_row w-100 mt-4'>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={0}
                                    pagination={{
                                    clickable: true,
                                    }}
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                
                                 </Swiper>
                            </div>

                            <div className="d-flex align-items-center mt-4">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">Sản phẩm mới</h3>
                                </div>

                                <Button className='viewAllBtn ml-auto'>Tất cả <FaArrowRightLong className='ml-1'/></Button>
                            </div>

                            <div className='product_row w-100 mt-4'>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={0}
                                    pagination={{
                                    clickable: true,
                                    }}
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem />
                                    </SwiperSlide>

 
                                
                                 </Swiper>
                            </div>

                            <div className="d-flex align-items-center mt-4">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">Tất cả sản phẩm</h3>
                                </div>

                                <Button className='viewAllBtn ml-auto'>Tất cả <FaArrowRightLong className='ml-1'/></Button>
                            </div>

                            <div className='product_row productRow2 w-100 mt-4 d-flex'>
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                            </div>


                        </div>

                        
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home;