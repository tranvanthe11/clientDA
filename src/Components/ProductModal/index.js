import Dialog from '@mui/material/Dialog';
import { IoClose } from "react-icons/io5";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useContext } from 'react';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import QuantityBox from '../QuantityBox';
import { FiHeart } from "react-icons/fi";
import { Mycontext } from '../../App';
import 'swiper/css';
import ProductZoom from '../ProductZoom';

const ProductModal = (props)=>{

    const context = useContext(Mycontext);

    return (
        <>
            <Dialog open={true} className='productModal' onClose={()=>context.setIsOpenProductModal(false)}>
                <Button className="close_" onClick={()=>context.setIsOpenProductModal(false)}><IoClose /></Button>
                <h4 className='mb-1 font-weight-bold'>{props?.data?.name}</h4>
                <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center mr-4'>
                        <span>Brands:</span>
                        <span className='ml-2'><b>{props?.data?.brand?.brand}</b></span>
                    </div>

                    <Rating name="read-only" value={parseInt(props?.data?.rating)} precision={0.5} readOnly size="small"/>
                </div>

                <hr />

                <div className='row mt-2 productDetailModal'>
                    <div className='col-md-5'>
                        <ProductZoom images={props?.data?.images} discount={props?.data?.discount} />

                    </div>

                    <div className='col-md-7'>
                        <div className='d-flex info align-items-center mb-2'>
                            <span className='oldPrice lg mr-2'>{props?.data?.oldPrice}</span>
                            <span className='netPrice text-danger lg'>{props?.data?.price}</span>
                        </div>

                        <span className='badge bg-success'>Còn hàng</span>

                        <p className='mt-3'>{props?.data?.description}</p>


                        <div className='d-flex align-items-center'>
                            <QuantityBox />
                            <Button className='btn-blue btn-lg btn-big btn-round ml-3'>Thêm vào giỏ</Button>
                        </div>

                        <div className='d-flex align-items-center mt-4 actions'>
                            <Button className='btn-round btn-sml' variant='outlined'><FiHeart className='mr-2'/>Thêm vào danh sách ưa thích</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ProductModal;