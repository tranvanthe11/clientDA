import Sidebar from "../../Components/SideBar";
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from "react";
import ProductItem from '../../Components/ProductItem';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import { createContext, useEffect } from "react";


import {useParams} from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";


const Listing = () => {

    const [productView, setProductView]= useState('four');

    const [anchorEl, setAnchorEl] = useState(null);
    const [productData, setProductData] = useState([]);
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {id} = useParams();

    useEffect(()=>{
        fetchDataFromApi(`/api/products?catId=${id}`).then((res)=>{
            setProductData(res.products)
        })
    }, [id])

    const filterData=(catId)=>{
        fetchDataFromApi(`/api/products?catId=${catId}`).then((res)=>{
            setProductData(res.products)
        })
    }

    const filterByPrice=(price, catId)=>{
        fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&catId=${catId}`).then((res)=>{
            setProductData(res.products)
        })
    }

    const filterByRating=(rating, catId)=>{
        fetchDataFromApi(`/api/products?rating=${rating}&catId=${catId}`).then((res)=>{
            setProductData(res.products)
        })
    }

    // const filterByPrice=(price)=>{
    //     fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}`).then((res)=>{
    //         setProductData(res.products)
    //     })
    // }
    return(
        <>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing d-flex ">
                        <Sidebar filterByPrice={filterByPrice} filterData={filterData} 
                        filterByRating={filterByRating} />

                        <div className="content_right">
                            <div className="showBy mb-3 d-flex align-items-center">
                                <div className="d-flex align-items-center btnWrapper">
                                    <Button className={productView==='one' && 'act'} 
                                        onClick={()=>setProductView('one')}><IoIosMenu /></Button>
                                    <Button className={productView==='four' && 'act'}
                                        onClick={()=>setProductView('four')}><CgMenuGridR /></Button>
                                </div>

                                <div className="ml-auto showByFilter">
                                    <Button onClick={handleClick}>Show 12 <FaAngleDown /></Button>

                                    <Menu
                                        className="w-100 showPerPageDropdown"
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openDropdown}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>10</MenuItem>
                                        <MenuItem onClick={handleClose}>20</MenuItem>
                                        <MenuItem onClick={handleClose}>30</MenuItem>
                                    </Menu>
                                </div>
                            </div>

                            <div className="productListing">
                                {
                                    productData?.map((item, index)=>{
                                        return(

                                            <ProductItem key={index} itemView={productView} item={item}/>
                                        )
                                    })
                                }
                            </div>

                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Pagination count={10} color="primary" size="large" />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Listing;