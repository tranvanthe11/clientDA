import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useRef, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const ProductZoom = (props) => {

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
                            <div className='badge badge-primary'>-{props?.discount}%</div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                navigation={false}
                                slidesPerGroup={1}
                                modules={[Navigation]}
                                className='zoomSliderBig'
                                ref={zoomSliderBig}
                            >
                                {
                                    props?.images?.map((item, index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <div className='item'>
                                                <InnerImageZoom 
                                                    zoomType="hover" zoomScale={1} key={index}
                                                    src={`http://localhost:4000/upload/${item}`} />
                                                </div>
                                            </SwiperSlide>

                                        )
                                    })
                                }
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
                                                                {
                                    props?.images?.map((item, index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <div className={`item ${slideIndex===index && 'item_active'}`} >
                                                    <img src={`http://localhost:4000/upload/${item}`}
                                                    className='w-100' onClick={() => goto(index) }/>
                                                </div>
                                            </SwiperSlide>

                                        )
                                    })
                                }
                        </Swiper>
        </div>
    )
}

export default ProductZoom;