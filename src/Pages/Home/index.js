import Button from '@mui/material/Button';
import HomeBanner from "../../Components/HomeBanner";
import { FaArrowRightLong } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// import Rating from '@mui/material/Rating';
// import { AiOutlineFullscreen } from "react-icons/ai";
import ProductItem from '../../Components/ProductItem';
import HomeCat from '../../Components/HomeCat';
import { fetchDataFromApi } from '../../utils/api';
import { Mycontext } from '../../App';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Home =()=>{

    const [catData, setCatData] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [selectedCat, setSelectedCat] = useState('aohoodie');
    const [filterData, setFilterData] = useState([]);

    // const [jeanData, setJeanData] = useState([]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const context = useContext(Mycontext);

    const selectCat=(cat)=>{
        setSelectedCat(cat)
    }

    function removeVietnameseTones(str) {
        return str
            .normalize("NFD") // Chuyển đổi ký tự Unicode thành dạng tổ hợp
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu tổ hợp
            .replace(/đ/g, 'd') // Thay thế ký tự 'đ' thường
            .replace(/Đ/g, 'D') // Thay thế ký tự 'Đ' hoa
            .replace(/\s+/g, '') // Xóa khoảng trắng
            .toLowerCase(); // Đưa về chữ thường
    }


    useEffect(()=>{

        // setSelectedCat(context.categoryData[0]?.name)

        fetchDataFromApi(`/api/products/newProduct`).then((res)=>{
            setNewProducts(res);
        })

        fetchDataFromApi("/api/products").then((res)=>{
            setProductsData(res);
        })

        
    }, [])
    
    useEffect(()=>{
        fetchDataFromApi(`/api/products?catName=${selectedCat}`).then((res)=>{
            setFilterData(res.products);
        })
    },[selectedCat])


    return(
        <div >
            <HomeBanner />
            {
                context.categoryData?.length!==0 &&
                <HomeCat catData={context.categoryData} /> 
            }

            <section className="homeProducts">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className='sticky'>
                                <div className="banner">
                                    <img src="https://canifa.com/img/500/750/resize/8/t/8th22s008-se002-2.webp"
                                        className="cursor w-100" />
                                </div>
                                <div className="banner mt-3">
                                    <img src="https://canifa.com/img/500/750/resize/8/t/8th22s008-se002-2.webp"
                                        className="cursor w-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 productRow">

                            <div className="d-flex align-items-center">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">Sản phẩm mới</h3>
                                </div>

                                {/* <Button className='viewAllBtn ml-auto'>Tất cả <FaArrowRightLong className='ml-1'/></Button> */}
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
                                {
                                    newProducts?.length!==0 && newProducts?.map((item, index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <ProductItem item={item}/>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                                
                                 </Swiper>
                            </div>

                            <div className="d-flex align-items-center mt-4">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">Tất cả sản phẩm</h3>
                                </div>

                                {/* <Button className='viewAllBtn ml-auto'>Tất cả <FaArrowRightLong className='ml-1'/></Button> */}
                            </div>

                            <div className='product_row productRow2 w-100 mt-4 d-flex'>
                                {
                                    productsData?.products?.length!==0 && productsData?.products?.map((item, index)=>{
                                        return(
                                            <ProductItem key={index} item={item}/>
                                        )
                                    })
                                }
                            </div>

                            <div className="d-flex align-items-center mt-4">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">Sản phẩm</h3>
                                </div>

                                <div className='ml-auto'>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    className='filterTabs'
                                >
                                    {
                                        context.categoryData?.map((item, index)=>{
                                            return(
                                                <Tab className='item' label={item.name} 
                                                onClick={()=>selectCat(item.nameNoAccent)}/>
                                            )
                                        })
                                    }
                                </Tabs>
                                </div>

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
                                {
                                    filterData?.length!==0 && filterData?.map((item, index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <ProductItem item={item}/>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                                
                                 </Swiper>
                            </div>


                        </div>

                        
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home;