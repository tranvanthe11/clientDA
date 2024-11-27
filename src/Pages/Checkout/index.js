import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { deleteData, fetchDataFromApi, postDataUser } from '../../utils/api';
import { Mycontext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Checkout = ()=>{

    const history = useNavigate();

    const context = useContext(Mycontext);


    const [formFields, setFormFields] = useState({
        fullName:"",
        phone:"",
        province:"",
        district:"",
        ward:"",
        street:""
    })

    const [totalAmount, setTotalAmount] = useState()

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [cartData, setCartData] = useState([]);


    const handleChangeProvinces = (event) => {
        setSelectedProvince(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                province:event.target.value
            }
        ))
    };

    const handleChangeDistricts = (event) => {
        setSelectedDistrict(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                district:event.target.value
            }
        ))
    };

    const handleChangeWards = (event) => {
        setSelectedWard(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                ward:event.target.value
            }
        ))
    };

    const onChangeInput = (e) =>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res)=>{
            setCartData(res);
            setTotalAmount( res.length!==0 && 
                res.map(item=>parseInt(item.price)*item.quantity).reduce((total, value)=> total+ value, 0))
        })
    }, [])

    useEffect(() => {
        const fetchProvinces = async () => {
            const cachedProvinces = localStorage.getItem('provinces'); 
            if (cachedProvinces) {
                setProvinces(JSON.parse(cachedProvinces));
            } else {
                try {
                    const response = await axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
                    const provinceData = response?.data?.data?.data;
                    setProvinces(provinceData);
                    localStorage.setItem('provinces', JSON.stringify(provinceData));
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error);
                }
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                const cachedDistricts = localStorage.getItem(`districts_${selectedProvince}`);
                if (cachedDistricts) {
                    setDistricts(JSON.parse(cachedDistricts));
                } else {
                    try {
                        const selectedProvinceCode = provinces.find(province => province.name === selectedProvince)?.code;
                        if (selectedProvinceCode) {
                            const response = await axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${selectedProvinceCode}&limit=-1`);
                            const districtData = response?.data?.data?.data;
                            setDistricts(districtData);
                            localStorage.setItem(`districts_${selectedProvince}`, JSON.stringify(districtData)); 
                        }
                    } catch (error) {
                        console.error("Lỗi khi lấy danh sách quận/huyện:", error);
                    }
                }
            };
            fetchDistricts();
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);
    
    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                const cachedWards = localStorage.getItem(`wards_${selectedDistrict}`);
                if (cachedWards) {
                    setWards(JSON.parse(cachedWards));
                } else {
                    try {
                        const selectedDistrictCode = districts.find(district => district.name === selectedDistrict)?.code;
                        if (selectedDistrictCode) {
                            const response = await axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${selectedDistrictCode}&limit=-1`);
                            const wardData = response?.data?.data?.data;
                            setWards(wardData);
                            localStorage.setItem(`wards_${selectedDistrict}`, JSON.stringify(wardData)); 
                        }
                    } catch (error) {
                        console.error("Lỗi khi lấy danh sách phường/xã:", error);
                    }
                }
            };
            fetchWards();
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);
    

    const checkout= async (e)=>{
        e.preventDefault();

        if(formFields.fullName===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng điền Họ và tên",
                error: true
            })
            return false;
        }

        if(formFields.phone===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng điền số diện thoại",
                error: true
            })
            return false;
        }

        if(formFields.province===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng chọn tỉnh/thành phố",
                error: true
            })
            return false;
        }

        if(formFields.district===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng chọn quận/huyện",
                error: true
            })
            return false;
        }

        if(formFields.ward===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng chọn phường/xã",
                error: true
            })
            return false;
        }

        if(formFields.street===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm số nhà và đường",
                error: true
            })
            return false;
        }

        const addressInfo = {
            name: formFields.fullName,
            phone: formFields.phone,
            address:formFields.street + ", " + formFields.ward + ", " + formFields.district + ", " + formFields.province,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }

    const user = JSON.parse(localStorage.getItem("user"));

    try {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: totalAmount.toString()
                            }
                        }
                    ]
                });
            },
            onApprove: async (data, actions) => {
                const details = await actions.order.capture();
                console.log("Thanh toán thành công:", details);

                const payload = {
                    name: formFields.fullName,
                    phone: formFields.phone,
                    address: addressInfo.address,
                    amount: parseInt(totalAmount),
                    email: user.email,
                    userId: user.userId,
                    products: cartData,
                    paymentId: details.id,
                };

                // Gửi thông tin thanh toán đến backend
                await postDataUser(`/api/orders/create`, payload);
                await deleteData(`/api/cart/clear/${user.userId}`).then((res)=>{
                    context.setCartData([])
                });
                context.setAlertBox({
                    open: true,
                    msg: "Thanh toán thành công! Đơn hàng của bạn đã được ghi nhận.",
                    error: false,
                });

                history("/orders"); // Chuyển hướng sau khi hoàn thành
            },
            onError: (err) => {
                console.error("Lỗi trong quá trình thanh toán:", err);
                context.setAlertBox({
                    open: true,
                    msg: "Có lỗi xảy ra trong quá trình thanh toán.",
                    error: true,
                });
            }
        }).render("#paypal-button-container"); // Đảm bảo bạn render button vào đúng container
    } catch (error) {
        console.error("Lỗi thanh toán:", error);
        context.setAlertBox({
            open: true,
            msg: "Có lỗi xảy ra trong quá trình thanh toán.",
            error: true,
        });
    }
    }

    return(
        <section className='section'>
            <div className='container'>
                <form className='checkoutForm' onSubmit={checkout}>
                    <h2 className='hd'>Thanh toán</h2>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className="card border p-3">
                                <h5 className='pt-2' >Địa chỉ nhận hàng</h5>
                                <div className='row mt-3'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <TextField label="Họ và tên" className='w-100' name='fullName'
                                             variant="outlined"  onChange={onChangeInput}/>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <TextField label="Số điện thoại" className='w-100' name='phone'
                                             variant="outlined" onChange={onChangeInput}  />
                                        </div>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-md-12'>
                                        <div className='form-group'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Tỉnh/Thành phố</InputLabel>
                                            <Select
                                            id="demo-simple-select"
                                            value={selectedProvince}
                                            label="Tỉnh/Thành phố"
                                            onChange={handleChangeProvinces}
                                            >
                                            {
                                                provinces?.length!==0 && 
                                                provinces?.map((province)=>(
                                                    <MenuItem key={province?.code} value={province?.name}>
                                                        {province?.name}</MenuItem>
                                                ))
                                            }
                                            </Select>
                                        </FormControl>
                                        </div>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
                                                    <Select
                                                        value={selectedDistrict}
                                                        label="Quận/Huyện"
                                                        onChange={handleChangeDistricts}
                                                    >
                                                        {districts?.length !== 0 &&
                                                            districts?.map((district) => (
                                                                <MenuItem key={district?.code} value={district?.name}>
                                                                    {district?.name}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className='row mt-3'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="ward-select-label">Phường/Xã</InputLabel>
                                                    <Select
                                                        id="ward-select"
                                                        value={selectedWard}
                                                        label="Phường/Xã"
                                                        onChange={handleChangeWards}
                                                    >
                                                        {wards?.length !== 0 &&
                                                            wards?.map((ward) => (
                                                                <MenuItem key={ward?.code} value={ward?.name}>
                                                                    {ward?.name}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                <div className='row mt-3'>
                                    <div className='col-md-12'>
                                        <div className='form-group'>
                                            <TextField label="Địa chỉ cụ thể" className='w-100' name='street'
                                            variant="outlined" onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='card orderInfo'>
                                <h5>Đơn hàng</h5>
                                <div className='table-responsive mt-3'>
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Tổng</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartData?.length!==0 &&
                                                cartData?.map((item, index)=>{
                                                    return(
                                                        <tr>
                                                            <td>{item?.productTitle?.substr(0,30)} <b className='ml-2'> x{item?.quantity}</b></td>
                                                            <td className='text-red'>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.subTotal)}
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }
                                            <tr className='total'>
                                                <td>Tổng thanh toán</td>
                                                <td className='text-red'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Button type='submit' className='btn-blue btn-lg btn-big'>Thanh toán</Button>
                                <div id="paypal-button-container"></div>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
        </section>
    )
}

export default Checkout;