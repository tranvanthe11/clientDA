import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useRef, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const ProductZoom = () => {

    const zoomSliderBig = useRef();
    const zoomSlider = useRef();
    const [slideIndex, setSlideIndex] = useState(0);

    const goto = (index) => {
        setSlideIndex(index);
        zoomSlider.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    }

    return(
        <div className="productZoom">
            <div className='productZoom position-relative'>
                            <div className='badge badge-primary'>25%</div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                navigation={false}
                                slidesPerGroup={1}
                                modules={[Navigation]}
                                className='zoomSliderBig'
                                ref={zoomSliderBig}
                            >
                                <SwiperSlide>
                                    <div className='item'>
                                    <InnerImageZoom 
                                        zoomType="hover" zoomScale={1}
                                        src={`https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg`} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='item'>
                                    <InnerImageZoom 
                                        zoomType="hover" zoomScale={1}
                                        src={`https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-giu-nhiet-nu-ATN7019-CAM%20%20(1).jpg`} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='item'>
                                    <InnerImageZoom 
                                        zoomType="hover" zoomScale={1}
                                        src={`https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg`} />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        <Swiper
                                slidesPerView={5}
                                spaceBetween={0}
                                navigation={true}
                                slidesPerGroup={1}
                                modules={[Navigation]}
                                className='zoomSlider'
                                ref={zoomSlider}
                            >
                                <SwiperSlide>
                                    <div className={`item ${slideIndex===0 && 'item_active'}`}>
                                        <img src={'https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg'}
                                        className='w-100' onClick={() => goto(0) }/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={`item ${slideIndex===1 && 'item_active'}`}>
                                        <img src={'https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-giu-nhiet-nu-ATN7019-CAM%20%20(1).jpg'}
                                        className='w-100' onClick={() => goto(1) }/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={`item ${slideIndex===2 && 'item_active'}`}>
                                        <img src={'https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg'}
                                        className='w-100' onClick={() => goto(2) }/>
                                    </div>
                                </SwiperSlide>
                        </Swiper>
        </div>
    )
}

export default ProductZoom;