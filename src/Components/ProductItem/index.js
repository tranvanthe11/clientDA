import { AiOutlineFullscreen } from "react-icons/ai";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { FiHeart } from "react-icons/fi";
import ProductModal from "../ProductModal";
import { useContext, useState } from "react";
import { Mycontext } from '../../App';
import { Link } from "react-router-dom";
import { postDataUser } from "../../utils/api";

const ProductItem = (props) => {

    const context = useContext(Mycontext);

    const viewProductDetails = (id) => {
        context.setIsOpenProductModal({
            id:id,
            open:true
        });
    }

    const addToMyList=(id)=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user!==undefined && user!== null && user!==""){

            const data={
                productTitle: props?.item?.name,
                images: props?.item?.images[0],
                price: props?.item?.price,
                productId:id,
                userId:user?.userId
            }
    
            postDataUser(`/api/myList/add/`, data).then((res)=>{
                if(res.status!==false){
                    context.setAlertBox({
                        open: true,
                        msg: "Đã thêm sản phẩm vào danh sách ưa thích",
                        error: false
                    })
                }else{
                    context.setAlertBox({
                        open: true,
                        msg: res.msg,
                        error: true
                    })
                }
            })
        }else{
            context.setAlertBox({
                open: true,
                msg: "Vui lòng đăng nhập để tiếp tục",
                error: true
            })
        }
    }


    return(
        <>
            <div className={`productItem ${props.itemView}`}>
                <div className='imgWrapper'>
                    <Link to={`/productDetails/${props.item?.id}`}>
                    <img src={props?.item?.images[0]}
                            className='w-100'/>
                    </Link>
                    <span className='badge badge-primary'>-{props?.item?.discount}%</span>
                    <div className='actions'>
                        <Button onClick={()=>viewProductDetails(props?.item?.id)}><AiOutlineFullscreen /></Button>
                        <Button onClick={()=>addToMyList(props?.item?.id)}><FiHeart /></Button>
                    </div>
                </div>
                <div className='info'>
                    <h4>{props?.item?.name.substr(0,30)}</h4>
                    <span className='text-success d-block'>Còn hàng</span>
                    <Rating className='mt-2 mb-2' name="read-only" value={props?.item?.rating} readOnly size='small' precision={0.5} />

                    <div className='d-flex'>
                        <span className='oldPrice'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props?.item?.oldPrice)}
                        </span>
                        <span className='netPrice text-danger ml-2'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props?.item?.price)}
                        </span>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductItem;