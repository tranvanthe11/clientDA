import { Link } from "react-router-dom";
import QuantityBox from "../../Components/QuantityBox";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../App";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";


const Cart = () => {

    const [cartData, setCartData] = useState([]);
    const [productQuantity, setProductQuantity] = useState();
    let [cartFields, setcartFields] = useState({})
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [changeQuantity, setChangeQuantity] = useState(0);


    const context = useContext(Mycontext);

    const quantity =(val)=>{
        setProductQuantity(val);
        setChangeQuantity(val)
    }

    useEffect(()=>{
        fetchDataFromApi(`/api/cart`).then((res)=>{
            setCartData(res);
            setSelectedQuantity(res?.quantity)
        })
    }, [])

    // useEffect(()=>{
    //     setUpdatedQuantity(productQuantity)
    // }, [productQuantity])

    const selectedItem=(item, quantityVal)=>{
        if(changeQuantity!==0){

            const user = JSON.parse(localStorage.getItem("user"))
    
            cartFields.productTitle=item?.productTitle
            cartFields.images=item?.images
            cartFields.color=item?.color
            cartFields.size=item?.size
            cartFields.price=item?.price
            cartFields.quantity=quantityVal
            cartFields.subTotal=parseInt(item?.price * quantityVal)
            cartFields.productId=item?.productId
            cartFields.userId=user?.userId
    
            editData(`/api/cart/${item?._id}`, cartFields).then((res)=>{
                fetchDataFromApi(`/api/cart`).then((res)=>{
                    setCartData(res);
                })
            })
        }

    }

    const removeItem=(id)=>{
        deleteData(`/api/cart/${id}`).then((res)=>{
            context.setAlertBox({
                open: true,
                msg: "Đã xóa sản phẩm khỏi giỏ hàng",
                error: false
            })
            fetchDataFromApi(`/api/cart`).then((res)=>{
                setCartData(res);
            })
            context.getCartData();
        })
    }

    return(
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Giỏ hàng</h2>
                    <p>Có <b>{cartData?.length}</b> sản phẩm trong giỏ hàng</p>
                    <div className="row">
                        <div className="col-md-9">

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th width="40%">Sản phẩm</th>
                                        <th width="15%">Đơn giá</th>
                                        <th width="18%">Số lượng</th>
                                        <th width="15%">Số tiền</th>
                                        <th width="12%">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartData?.length!==0 && cartData?.map((item, index)=>{
                                            return(
                                                <tr>
                                                    <td width="40%">
                                                        <div className="d-flex align-items-center cartItemImgWrapper">
                                                            <div className="imgWrapper">
                                                                    <img className="w-100" alt={item?.productTitle}
                                                                    src={`http://localhost:4000/upload/${item?.images}`} />
                                                            </div>

                                                            <div className="info px-3">
                                                                <Link to={`/productDetails/${item?.productId}`} >
                                                                    <h6>{item?.productTitle?.substr(0,30)}</h6>
                                                                </Link>
                                                                <Button>{item?.color}, {item?.size}</Button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td width="15%">{item?.price}</td>
                                                    <td width="18%">
                                                        <QuantityBox quantity={quantity} value={item?.quantity}
                                                        item={item} selectedItem={selectedItem} />
                                                    </td>
                                                    <td width="15%">{item?.subTotal}</td>
                                                    <td width="12%"><span className="remove"
                                                    onClick={()=>removeItem(item?._id)}><MdDelete /></span></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card border p-3 cartDetails">
                                <h4>Chi tiết đơn hàng</h4>

                                <div className="d-flex align-items-center mb-2">
                                    <span>Tổng giá trị sản phẩm</span>
                                    <span className="ml-auto text-red">
                                        {
                                            cartData.length!==0 && 
                                            cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total, value)=> total+ value, 0)
                                        }
                                    </span>
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <span>Vận chuyển</span>
                                    <span className="ml-auto"><b>Free</b></span>
                                </div>

                                <div className="d-flex align-items-center total">
                                    <span>Tổng thanh toán</span>
                                    <span className="ml-auto text-red">
                                        {
                                            cartData.length!==0 && 
                                            cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total, value)=> total+ value, 0)
                                        }
                                    </span>
                                </div>

                                <br />

                                <Button className='btn-blue btn-lg btn-big'>Mua hàng</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart;