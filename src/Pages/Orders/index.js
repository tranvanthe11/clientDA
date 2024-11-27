import React, { useEffect, useState } from 'react';
import { editData, fetchDataFromApi } from "../../utils/api";
import Dialog from '@mui/material/Dialog';
import { IoClose } from "react-icons/io5";
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';


const Orders = () => {

    const [statusVal, setStatusVal] = useState("");

    const handleChange = (event, statusVal) => {
        setStatusVal(statusVal);
    };

    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        window.scrollTo(0, 0);

        const url = statusVal ? `/api/orders?status=${statusVal}` : `/api/orders`;
        fetchDataFromApi(url).then((res) => {
            setOrders(res?.ordersList);
        });
    }, [statusVal])

    const orderStatus=(status, id)=>{
        fetchDataFromApi(`/api/orders/${id}`).then((res)=>{

            const order = {
                    name: res.name,
                    phone: res.phone,
                    address: res.address,
                    amount: parseInt(res.amount),
                    email: res.email,
                    userId: res.userId,
                    products: res.products,
                    paymentId: res.id,
                    status: status
            }

            editData(`/api/orders/${id}`, order).then((res)=>{
                const url = statusVal ? `/api/orders?status=${statusVal}` : `/api/orders`;
                fetchDataFromApi(url).then((res) => {
                    setOrders(res?.ordersList);
                });
            })
        })
    }

    return(
        <>
        <section className='section order'>
            <div className='container'>
                <div className="d-flex align-items-center mt-4 tab">
                    <h2 className='hd mt-2 mr-5 ml-2'>Đơn mua</h2>
                    <div className='ml-auto'>
                        <Box sx={{ width: '100%'}}>
                            <Tabs value={statusVal} onChange={handleChange} centered>
                                <Tab value="" label="Tất cả" />
                                <Tab value="pending" label="Chờ xác nhận" />
                                <Tab value="shipped" label="Đang giao" />
                                <Tab value="done" label="Hoàn thành" />
                                <Tab value="refund" label="Trả hàng/ Hoàn tiền" />
                                <Tab value="cancel" label="Hủy" />
                            </Tabs>
                        </Box>
                    </div>
                </div>

                {
                    orders?.length!== 0 ? orders?.map((order, index)=>{
                        return(
                            <div key={index}>
                            <div className="card mt-3 p-2 orderDetails">
                                <div className='row'>
                                    <div className='col-md-10'>
                                        <h6>{order?.name} - {order?.phone}</h6>
                                        <h6>{order?.address}</h6>
                                    </div>
                                    <div className='col-md-2 d-flex align-items-center justify-content-end'>
                                        {
                                            order?.status === "pending" &&
                                            <h5 className=' status hd text-danger'>Chờ xác nhận</h5>
                                        }
                                        {
                                            order?.status === "confirm" &&
                                            <h5 className=' status hd text-danger'>Chờ lấy hàng</h5>
                                        }
                                        {
                                            order?.status === "shipped" &&
                                            <h5 className=' status hd text-danger'>Đang giao</h5>
                                        }
                                        {
                                            order?.status === "done" &&
                                            <h5 className=' status hd text-danger'>Hoàn thành</h5>
                                        }
                                        {
                                            order?.status === "refund" &&
                                            <h5 className=' status hd text-danger'>Đã trả hàng</h5>
                                        }
                                        {
                                            order?.status === "cancel" &&
                                            <h5 className=' status hd text-danger'>Đã hủy</h5>
                                        }
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            {
                                                order?.products?.map((product, index)=>{
                                                    return(
                                                        <tr>
                                                            <td width="50%">
                                                                <div className="d-flex align-items-center orderItemImgWrapper">
                                                                    <div className="imgWrapper">
                                                                        <img className="w-100" alt={product?.productTitle}
                                                                            src={product?.images} />
                                                                    </div>

                                                                    <div className="info px-3">
                                                                        <Link to={`/productDetails/${product?.productId}`} >
                                                                            <h6>{product?.productTitle?.substr(0,30)}</h6>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td width="15%">
                                                                <Button>{product?.size}, {product?.color}</Button>
                                                            </td>
                                                            <td width="15%">
                                                                <span className='text-danger'>
                                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}
                                                                </span>
                                                            </td>
                                                            <td width="10%">x{product?.quantity}</td>
                                                            <td width="15%">
                                                                <span className='text-danger'>
                                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.subTotal)}
                                                                </span>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }
                                            <tr>
                                                <td width="50%">
                                                </td>
                                                <td width="15%">
                                                </td>
                                                <td width="15%"></td>
                                                <td width="10%">Thành tiền :</td>
                                                <td width="15%">
                                                    <span className='text-danger'>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order?.amount)}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    order?.status === "pending" &&

                                    <div className='row'>
                                        <div className='col-md-10'>
                                        </div>
                                        <div className='col-md-2 d-flex align-items-center '>
                                            <Button className='btn-red btn-lg btn-big w-100'
                                            onClick={()=>orderStatus("cancel", order?._id)}>Hủy</Button>
                                        </div>
                                    </div>
                                }
                                {
                                    order?.status === "shipped" &&

                                    <div className='row'>
                                        <div className='col-md-8'>
                                        </div>
                                        <div className='col-md-2 d-flex align-items-center '>
                                            <Button className='btn-blue btn-lg btn-big w-100'
                                            onClick={()=>orderStatus("refund", order?._id)}>Hoàn hàng</Button>
                                        </div>
                                        <div className='col-md-2 d-flex align-items-center '>
                                            <Button className='btn-blue btn-lg btn-big w-100'
                                            onClick={()=>orderStatus("done", order?._id)}>Đã nhận</Button>
                                        </div>
                                    </div>
                                }
                            </div>
                            </div>
                        )
                    })
                    :
                    <div className="mt-3 p-2 orderDetail">
                        <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <div className='img'></div>
                            <h3>Chưa có đơn hàng</h3>
                        </div>
                    </div>

                }

            </div>

        </section>
        </>
    )
}

export default Orders;