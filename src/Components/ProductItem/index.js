import { AiOutlineFullscreen } from "react-icons/ai";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { FiHeart } from "react-icons/fi";
import ProductModal from "../ProductModal";
import { useContext, useState } from "react";
import { Mycontext } from '../../App';

const ProductItem = (props) => {

    const context = useContext(Mycontext);

    const viewProductDetails = (id) => {
        context.setIsOpenProductModal(true);
    }


    return(
        <>
            <div className={`productItem ${props.itemView}`}>
                <div className='imgWrapper'>
                    <img src='https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg'
                            className='w-100'/>

                    <span className='badge badge-primary'>25%</span>
                    <div className='actions'>
                        <Button onClick={()=>viewProductDetails(1)}><AiOutlineFullscreen /></Button>
                        <Button><FiHeart /></Button>
                    </div>
                </div>
                <div className='info'>
                    <h4>Gioi thieu san pham</h4>
                    <span className='text-success d-block'>Còn hàng</span>
                    <Rating className='mt-2 mb-2' name="read-only" value={5} readOnly size='small' precision={0.5} />

                    <div className='d-flex'>
                        <span className='oldPrice'>20.000</span>
                        <span className='netPrice text-danger ml-2'>19.000</span>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductItem;