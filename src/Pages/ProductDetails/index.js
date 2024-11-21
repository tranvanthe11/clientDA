import ProductZoom from "../../Components/ProductZoom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import Button from '@mui/material/Button';
import { BsCartPlus } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import Tooltip from '@mui/material/Tooltip';
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { Mycontext } from "../../App";



const ProductDetails = () => {

    const [activeSize, setActiveSize] = useState(null);
    const [activeColor, setActiveColor] = useState(null);
    const [activeTabs, setActiveTabs] = useState(0);

    let [cartFields, setcartFields] = useState({})
    let [productQuantity, setProductQuantity] = useState();


    const [productData, setProductData] = useState();

    const context = useContext(Mycontext);


    const {id} = useParams();

    const isActiveSize = (size) => {
        setActiveSize(size);
    }
    const isActiveColor = (color) => {
        setActiveColor(color);
    }

    useEffect(()=>{
        window.scrollTo(0,0);

        fetchDataFromApi(`/api/products/${id}`).then((res)=>{
            setProductData(res);
        })
    }, [])

    const quantity =(val)=>{
        setProductQuantity(val)
    }

    const uniqueSizes = [...new Set(productData?.sizesAndColors?.map(item => item.size))];
    const uniqueColors = [...new Set(productData?.sizesAndColors?.map(item => item.color))];

    const [stockStatus, setStockStatus] = useState(null);

    useEffect(() => {
            const selectedStock = productData?.sizesAndColors?.find(
                (item) => item.size === activeSize && item.color === activeColor
            );

            if (selectedStock?.countInStock <=0) {
                setStockStatus("Hết hàng");
            } else {
                setStockStatus("Còn hàng");
            }
    }, [activeSize, activeColor, productData]);


    const addToCart=()=>{
        if(activeSize===null){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng chọn size",
                error: true
            })
            return false;
        }
        if(activeColor===null){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng chọn màu",
                error: true
            })
            return false;
        }

        const selectedStock = productData?.sizesAndColors?.find(
            (item) => item.size === activeSize && item.color === activeColor
        );
    
        if (!selectedStock || selectedStock.countInStock <= 0) {
            context.setAlertBox({
                open: true,
                msg: "Sản phẩm này đã hết hàng",
                error: true
            });
            return false;
        }

        if (productQuantity > selectedStock.countInStock) {
            context.setAlertBox({
                open: true,
                msg: `Số lượng bạn chọn (${productQuantity}) vượt quá số lượng hàng hiện có (${selectedStock.countInStock})`,
                error: true,
            });
            return false;
        }
        const user = JSON.parse(localStorage.getItem("user"))

        cartFields.productTitle=productData?.name
        cartFields.images=productData?.images[0]
        cartFields.color=activeColor
        cartFields.size=activeSize
        cartFields.price=productData?.price
        cartFields.quantity=productQuantity
        cartFields.subTotal=parseInt(productData?.price * productQuantity)
        cartFields.productId=productData?.id
        cartFields.userId=user?.userId
        context.addToCart(cartFields);
    }

    const selectedItem = () =>{

    }
    return(
        <>
            <section className="productDetails section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 pl-5">
                            <ProductZoom images={productData?.images} discount={productData?.discount} />
                        </div>

                        <div className="col-md-7 pl-5 pr-5">                           
                            <h2 className="hd text-capitalize">{productData?.name}</h2>

                            <ul className="list list-inline d-flex align-items-center">
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">Brands:</span>
                                        <span>{productData?.brandName}</span>
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <Rating name="read-only" value={parseInt(productData?.rating)} precision={0.5} readOnly size="small"/>
                                        <span className="cursor ml-2">1 review</span>
                                    </div>
                                </li>
                            </ul>

                            <div className='d-flex info align-items-center mb-3'>
                                <span className='oldPrice lg mr-2'>{productData?.oldPrice}</span>
                                <span className='netPrice text-danger lg'>{productData?.price}</span>
                            </div>

                            {/* <span className='badge bg-success'>Còn hàng</span> */}

                            <div className="product-status">
                                {stockStatus === "Còn hàng" && <span className="badge bg-success">{stockStatus}</span>}
                                {stockStatus === "Hết hàng" && <span className="badge bg-danger">{stockStatus}</span>}
                            </div>

                            <p className="mt-2">{productData?.description}
                            </p>
                            {
                                uniqueSizes?.length!==0 && 
                                <div className='productSize d-flex align-items-center'>
                                    <span>Size</span>
                                    <ul className="list list-inline mb-0 pl-4">
                                        {uniqueSizes?.map((size, index)=>{
                                            return(
                                            <li className="list-inline-item" key={index}>
                                                <a className={`tag ${activeSize ===size ? 'active' : ''}`}
                                                    onClick={()=> isActiveSize(size)}>{size}</a>
                                            </li>

                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            }

                            {
                                uniqueColors?.length!==0 && 
                                <div className='productSize d-flex align-items-center'>
                                    <span>Màu</span>
                                    <ul className="list list-inline mb-0 pl-4">
                                        {uniqueColors?.map((color, index)=>{
                                            return(
                                            <li className="list-inline-item" key={index}>
                                                <a className={`tag ${activeColor ===color ? 'active' : ''}`}
                                                    onClick={()=> isActiveColor(color)}>{color}</a>
                                            </li>

                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            }


                            <div className="d-flex align-items-center mt-3">
                                <QuantityBox quantity={quantity} selectedItem={selectedItem} />
                                <Button className='btn-blue btn-lg btn-big btn-round ml-3'
                                onClick={()=>addToCart()}>
                                    <BsCartPlus className="mr-2"/>
                                    Thêm vào giỏ
                                </Button>
                                <Tooltip title="Them vao danh sach ua thich" placement="top">

                                    <Button className="btn-lue btn-lg btn-big btn-circle ml-4">
                                        <FiHeart/>
                                    </Button>
                                </Tooltip>
                            </div>

                        </div>
                    </div>

                    <br />

                    <div className="card mt-5 p-5 detailsPageTabs">
                        <div className="customTabs">
                            <ul className="list-inline list">
                                <li className="list-inline-item">
                                    <Button className={`${activeTabs === 0 && 'active'}`}
                                        onClick={() => {setActiveTabs(0)}}>
                                        Chi tiết
                                    </Button>
                                </li>
                                {/* <li className="list-inline-item">
                                    <Button className={`${activeTabs === 1 && 'active'}`}
                                        onClick={() => {setActiveTabs(1)}}>
                                        chi tiet
                                    </Button>
                                </li> */}
                                <li className="list-inline-item">
                                    <Button className={`${activeTabs === 2 && 'active'}`}
                                        onClick={() => {setActiveTabs(2)}}>
                                        Reviews (3)
                                    </Button>
                                </li>
                            </ul>

                            <br />

                            {
                                activeTabs === 0 &&
                                <div className="tabContent">
                                    <p>{productData?.description}</p>
                                </div>
                            }

                            {
                                activeTabs === 1 &&
                                <div className="tabContent">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr className="stand-up">
                                                    <th>Stand Up</th>
                                                    <td>
                                                        <p>35''</p>
                                                    </td>
                                                </tr>
                                                <tr className="pa_color">
                                                    <th>Color</th>
                                                    <td>
                                                        <p>Black, Blue</p>
                                                    </td>
                                                </tr><tr className="pa_size">
                                                    <th>Size</th>
                                                    <td>
                                                        <p>M, S</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {
                                activeTabs === 2 &&
                                <div className="tabContent">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3>Hỏi và trả lời</h3>
                                            <br />

                                            <div className="card p-4 reviewsCard flex-row">
                                                <div className="user-info d-flex flex-column align-items-center">
                                                    <div className="rounded-circle">
                                                        <img 
                                                            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/428179812_1422408578704539_3659365527880145355_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHUqoQM6XdywYT75wMKhcrCWbiv8foSd31ZuK_x-hJ3fWE2dDNyIyrJOjz_-QqZniE1q55SNpeJoSxtqJwe4Lyf&_nc_ohc=9wWi4WZdEN4Q7kNvgFfmzDY&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AGAicByka9sqIAlTzpLuVcb&oh=00_AYBiJtpw0Th8nCGx1a4Jg8f1VFpcHZriGhJrtVXfb-GX4g&oe=6723E26B" 
                                                            alt="User Avatar"
                                                        />
                                                    </div>
                                                    <span className="text-g font-weight-bold mt-2">The Tran</span>
                                                </div>
                                                <div className="info pl-5">
                                                    <div className="d-flex align-items-center w-100">
                                                        <h5>19/10/2024</h5>
                                                        <div className="ml-auto">
                                                            <Rating name="haft-rating-read" value={4.5} precision={0.5} readOnly size="small"/>
                                                        </div>
                                                    </div>

                                                    <p>Binh luan Binh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luanBinh luan</p>
                                                </div>
                                            </div>

                                            <br className="res-hide" />
                                            <br className="res-hide" />
                                            
                                            <form className="reviewForm">
                                                <h4>Thêm review</h4>
                                                <div className="form-group">
                                                    <textarea className="form-control"
                                                    placeholder="Viet 1 review"
                                                    name="review" ></textarea>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input type='text' className="form-control" placeholder="Name" name="userName"></input>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <Rating name="rating" value={4.5} precision={0.5} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <br />
                                                <div className="form-group">
                                                    <Button type="submit" className="btn-blue btn-lg btn-big btn-round">
                                                        Submit review
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>


                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetails;