import { Link } from "react-router-dom";
import QuantityBox from "../../Components/QuantityBox";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";


const Cart = () => {
    return(
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Giỏ hàng</h2>
                    <p>Có <b>1</b> sản phẩm trong giỏ hàng</p>
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
                                    <tr>
                                        <td width="40%">
                                            <div className="d-flex align-items-center cartItemImgWrapper">
                                                <div className="imgWrapper">
                                                        <img className="w-100"
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg" />
                                                </div>

                                                <div className="info px-3">
                                                    <Link to="/productDetails/1">
                                                        <h6>Tên sản phẩm</h6>
                                                    </Link>
                                                    <Button>Đen, M</Button>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="15%">1000000</td>
                                        <td width="18%">
                                            <QuantityBox />
                                        </td>
                                        <td width="15%">2000000</td>
                                        <td width="12%"><span className="remove"><MdDelete /></span></td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td width="40%">
                                            <div className="d-flex align-items-center cartItemImgWrapper">
                                                <div className="imgWrapper">
                                                        <img className="w-100"
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg" />
                                                </div>

                                                <div className="info px-3">
                                                    <Link to="/productDetails/1">
                                                        <h6>Tên sản phẩm</h6>
                                                    </Link>
                                                    <Button>Đen, M</Button>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="15%">1000000</td>
                                        <td width="18%">
                                            <QuantityBox />
                                        </td>
                                        <td width="15%">2000000</td>
                                        <td width="12%"><span className="remove"><MdDelete /></span></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td width="40%">
                                            <div className="d-flex align-items-center cartItemImgWrapper">
                                                <div className="imgWrapper">
                                                        <img className="w-100"
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg" />
                                                </div>

                                                <div className="info px-3">
                                                    <Link to="/productDetails/1">
                                                        <h6>Tên sản phẩm</h6>
                                                    </Link>
                                                    <Button>Đen, M</Button>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="15%">1000000</td>
                                        <td width="18%">
                                            <QuantityBox />
                                        </td>
                                        <td width="15%">2000000</td>
                                        <td width="12%"><span className="remove"><MdDelete /></span></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td width="40%">
                                            <div className="d-flex align-items-center cartItemImgWrapper">
                                                <div className="imgWrapper">
                                                        <img className="w-100"
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-yoguu-gut7012-den-1.jpg" />
                                                </div>

                                                <div className="info px-3">
                                                    <Link to="/productDetails/1">
                                                        <h6>Tên sản phẩm</h6>
                                                    </Link>
                                                    <Button>Đen, M</Button>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="15%">1000000</td>
                                        <td width="18%">
                                            <QuantityBox />
                                        </td>
                                        <td width="15%">2000000</td>
                                        <td width="12%"><span className="remove"><MdDelete /></span></td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card border p-3 cartDetails">
                                <h4>Chi tiết đơn hàng</h4>

                                <div className="d-flex align-items-center mb-2">
                                    <span>Tổng giá trị sản phẩm</span>
                                    <span className="ml-auto text-red">2000000</span>
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <span>Vận chuyển</span>
                                    <span className="ml-auto"><b>Free</b></span>
                                </div>

                                <div className="d-flex align-items-center total">
                                    <span>Tổng thanh toán</span>
                                    <span className="ml-auto text-red">2000000</span>
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