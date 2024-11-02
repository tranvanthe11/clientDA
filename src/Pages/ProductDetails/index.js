import ProductZoom from "../../Components/ProductZoom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import Button from '@mui/material/Button';
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import Tooltip from '@mui/material/Tooltip';



const ProductDetails = () => {

    const [activeSize, setActiveSize] = useState(null);
    const [activeTabs, setActiveTabs] = useState(0);

    const isActive = (index) => {
        setActiveSize(index);
    }
    return(
        <>
            <section className="productDetails section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 pl-5">
                            <ProductZoom />
                        </div>

                        <div className="col-md-8 pl-5 pr-5">                           
                            <h2 className="hd text-capitalize">Ten san pham</h2>

                            <ul className="list list-inline d-flex align-items-center">
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">Brands:</span>
                                        <span>Teelab</span>
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small"/>
                                        <span className="cursor ml-2">1 review</span>
                                    </div>
                                </li>
                            </ul>

                            <div className='d-flex info align-items-center mb-3'>
                                <span className='oldPrice lg mr-2'>20.000</span>
                                <span className='netPrice text-danger lg'>19.000</span>
                            </div>

                            <span className='badge bg-success'>Còn hàng</span>

                            <p className="mt-2">Gioi thieu san pham Gioi thieu san pham Gioi thieu san pham Gioi thieu s
                                an pham Gioi thieu san pham Gioi thieu san pham Gioi thieu san pham Gioi thieu san pham 
                                Gioi thieu san pham Gioi thieu san pham Gioi thieu s
                                an pham Gioi thieu san pham Gioi thieu san pham Gioi thieu san pham
                            </p>

                            <div className='productSize d-flex align-items-center'>
                                <span>Size</span>
                                <ul className="list list-inline mb-0 pl-4">
                                    <li className="list-inline-item">
                                        <a className={`tag ${activeSize ===0 ? 'active' : ''}`}
                                            onClick={()=> isActive(0)}>M</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className={`tag ${activeSize ===1 ? 'active' : ''}`}
                                            onClick={()=> isActive(1)}>L</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="d-flex align-items-center mt-3">
                                <QuantityBox />
                                <Button className='btn-blue btn-lg btn-big btn-round ml-3'>
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
                                    <p>Miêu tả sản phẩm</p>
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