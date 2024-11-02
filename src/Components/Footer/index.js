import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidDiscount } from "react-icons/bi";
import { FaCommentDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return(
        <footer>
            <div className="container">
                <div className="topInfo row">
                    <div className="col d-flex align-items-center">
                        <span><LuShirt /></span>
                        <span className="ml-2">Sản phẩm tươi mới hằng ngày</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><TbTruckDelivery /></span>
                        <span className="ml-2">Giao hàng miễn phí</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><BiSolidDiscount /></span>
                        <span className="ml-2">Giảm giá hàng ngày</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><FaCommentDollar /></span>
                        <span className="ml-2">Giá tốt nhất trên thị trường</span>
                    </div>
                </div>

                <div className="row mt-5 linksWrap">
                    <div className="col">
                        <h5>Chăm sóc khách hàng</h5>
                        <ul>
                            <li><Link to='#'>Trung tâm trợ giúp</Link></li>
                            <li><Link to='#'>Hướng dẫn mua hàng</Link></li>
                            <li><Link to='#'>Thanh toán</Link></li>
                            <li><Link to='#'>Vận chuyển</Link></li>
                            <li><Link to='#'>Hoàn hàng và trả tiền</Link></li>
                            <li><Link to='#'>Chăm sóc khách hàng</Link></li>
                            <li><Link to='#'>Chính sách bảo hành</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Chăm sóc khách hàng</h5>
                        <ul>
                            <li><Link to='#'>Trung tâm trợ giúp</Link></li>
                            <li><Link to='#'>Hướng dẫn mua hàng</Link></li>
                            <li><Link to='#'>Thanh toán</Link></li>
                            <li><Link to='#'>Vận chuyển</Link></li>
                            <li><Link to='#'>Hoàn hàng và trả tiền</Link></li>
                            <li><Link to='#'>Chăm sóc khách hàng</Link></li>
                            <li><Link to='#'>Chính sách bảo hành</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Chăm sóc khách hàng</h5>
                        <ul>
                            <li><Link to='#'>Trung tâm trợ giúp</Link></li>
                            <li><Link to='#'>Hướng dẫn mua hàng</Link></li>
                            <li><Link to='#'>Thanh toán</Link></li>
                            <li><Link to='#'>Vận chuyển</Link></li>
                            <li><Link to='#'>Hoàn hàng và trả tiền</Link></li>
                            <li><Link to='#'>Chăm sóc khách hàng</Link></li>
                            <li><Link to='#'>Chính sách bảo hành</Link></li>
                        </ul>
                    </div>
                    {/* <div className="col">
                        <h5></h5>
                        <ul>
                            <li><Link to='#'>Fruit</Link></li>
                            <li><Link to='#'>Fruit</Link></li>
                            <li><Link to='#'>Fruit</Link></li>
                            <li><Link to='#'>Fruit</Link></li>
                            <li><Link to='#'>Fruit</Link></li>
                            <li><Link to='#'>Fruit</Link></li>
                            <li><Link to='#'>Fruit</Link></li>
                        </ul>
                    </div> */}
                </div>

                <div className="copyright pt-3 pb-3 d-flex">
                    <p>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
                    <ul className="list list-inline ml-auto mb-0 socials">
                        <li className="list-inline-item">
                            <Link to='#'><FaFacebook /></Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to='#'><FaSquareInstagram /></Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to='#'><FaLinkedin /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;