import { Link } from "react-router-dom";
import QuantityBox from "../../Components/QuantityBox";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../App";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { FaHome } from "react-icons/fa";


const MyList = () => {

    const [myListData, setMyListData] = useState([]);

    const context = useContext(Mycontext);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        fetchDataFromApi(`/api/myList?userId=${user?.userId}`).then((res)=>{
            setMyListData(res);
        })
    }, [])


    const removeItem=(id)=>{
        deleteData(`/api/myList/${id}`).then((res)=>{
            context.setAlertBox({
                open: true,
                msg: "Đã xóa sản phẩm khỏi danh sách ưa thích",
                error: false
            })
            const user = JSON.parse(localStorage.getItem("user"))
            fetchDataFromApi(`/api/myList?userId=${user?.userId}`).then((res)=>{
                setMyListData(res);
            })
        })
    }

    return(
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Danh sách ưa thích</h2>
                    <p>Có <b>{myListData?.length}</b> sản phẩm trong danh sách ưa thích</p>
                    {
                        myListData?.length !== 0 ?
                        <div className="row">
                            <div className="col-md-9">

                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th width="60%">Sản phẩm</th>
                                            <th width="20%">Đơn giá</th>
                                            <th width="20%">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myListData?.length!==0 && myListData?.map((item, index)=>{
                                                return(
                                                    <tr>
                                                        <td width="60%">
                                                            <div className="d-flex align-items-center cartItemImgWrapper">
                                                                <div className="imgWrapper">
                                                                        <img className="w-100" alt={item?.productTitle}
                                                                        src={`http://localhost:4000/upload/${item?.images}`} />
                                                                </div>

                                                                <div className="info px-3">
                                                                    <Link to={`/productDetails/${item?.productId}`} >
                                                                        <h6>{item?.productTitle?.substr(0,30)}</h6>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td width="20%">{item?.price}</td>
                                                        <td width="20%"><span className="remove"
                                                        onClick={()=>removeItem(item?._id)}><MdDelete /></span></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>
                            </div>
                            </div>

                        </div>
                        :
                        <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <img src="" />
                            <h3>Danh sách ưa thích của bạn hiện đang trống</h3>
                            <br />
                            <Link to="/">
                                <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                    <FaHome /> &nbsp; Thêm ngay
                                </Button>
                            </Link>
                        </div>

                    }
                </div>
            </section>
        </>
    )
}

export default MyList;