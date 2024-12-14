import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { deleteData, fetchDataFromApi, postDataUser } from '../../utils/api';
import { Mycontext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Button, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';

const Checkout = ()=>{

    const history = useNavigate();

    const context = useContext(Mycontext);


    const [formFields, setFormFields] = useState({
        fullName:"",
        phone:"",
        province:"",
        district:"",
        ward:"",
        street:"",
    })

    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [useNewAddress, setUseNewAddress] = useState(false);

    const [totalAmount, setTotalAmount] = useState()

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
          fetchDataFromApi(`/api/addresses?userId=${user.userId}`)
            .then(res => setSavedAddresses(res))
            .catch(err => console.error("Error fetching addresses:", err));
        }
      }, []);
    
      const handleAddressSelection = (e) => {
        const addressId = e.target.value;
        setSelectedAddressId(addressId);
        setUseNewAddress(addressId === "new");
      };


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
            if (cachedProvinces && cachedProvinces !== "undefined") {
                setProvinces(JSON.parse(cachedProvinces));
            } else {
                try {
                    const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                    const provinceData = response?.data?.data;
                    console.log(provinceData)
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
                if (cachedDistricts && cachedDistricts !== "undefined" && cachedDistricts !== null) {
                    setDistricts(JSON.parse(cachedDistricts));
                } else {
                    try {
                        const selectedProvinceCode = provinces.find(province => province.name === selectedProvince)?.id;
                        if (selectedProvinceCode) {
                            const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvinceCode}.htm`);
                            console.log(response)
                            const districtData = response?.data?.data;
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
                if (cachedWards && cachedWards !== "undefined") {
                    setWards(JSON.parse(cachedWards));
                } else {
                    try {
                        const selectedDistrictCode = districts.find(district => district.name === selectedDistrict)?.id;
                        if (selectedDistrictCode) {
                            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrictCode}.htm`);
                            const wardData = response?.data?.data;
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

        const user = JSON.parse(localStorage.getItem("user"));
        let selectedAddress = null;

        if (useNewAddress) {
            if (!formFields.fullName || !formFields.phone || !formFields.province || !formFields.district || !formFields.ward || !formFields.street) {
              context.setAlertBox({
                open: true,
                msg: "Vui lòng điền đầy đủ thông tin địa chỉ mới",
                error: true
              });
              return;
            }
      
            const newAddress = {
              userId: user.userId,
              name: formFields.fullName,
              phone: formFields.phone,
              address: `${formFields.street}, ${formFields.ward}, ${formFields.district}, ${formFields.province}`,
              province: formFields.province,
              district: formFields.district,
              ward: formFields.ward,
              street: formFields.street,
              isDefault: false 
            };

            try {
                const res = await postDataUser(`/api/addresses/add`, newAddress);
                selectedAddress = res; 
              } catch (err) {
                console.error("Error adding new address:", err);
                context.setAlertBox({
                  open: true,
                  msg: "Có lỗi xảy ra khi thêm địa chỉ mới",
                  error: true
                });
                return;
              }
            } else {
              selectedAddress = savedAddresses.find(addr => addr._id === selectedAddressId);
              if (!selectedAddress) {
                context.setAlertBox({
                  open: true,
                  msg: "Vui lòng chọn địa chỉ giao hàng",
                  error: true
                });
                return;
              }
            }


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
                const payload = {
                    name: selectedAddress.name,
                    phone: selectedAddress.phone,
                    address: selectedAddress.address,
                    amount: parseInt(totalAmount),
                    email: user.email,
                    userId: user.userId,
                    products: cartData,
                    paymentId: details.id,
                };

                await postDataUser(`/api/orders/create`, payload);
                await deleteData(`/api/cart/clear/${user.userId}`).then((res)=>{
                    context.setCartData([])
                });
                context.setAlertBox({
                    open: true,
                    msg: "Thanh toán thành công! Đơn hàng của bạn đã được ghi nhận.",
                    error: false,
                });

                history("/orders");
            },
            onError: (err) => {
                console.error("Lỗi trong quá trình thanh toán:", err);
                context.setAlertBox({
                    open: true,
                    msg: "Có lỗi xảy ra trong quá trình thanh toán.",
                    error: true,
                });
            }
        }).render("#paypal-button-container"); 
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
                                <FormControl component="fieldset">
                                    <RadioGroup name="address" value={useNewAddress ? "new" : selectedAddressId} onChange={handleAddressSelection}>
                                        {savedAddresses?.map(addr => (
                                        <FormControlLabel
                                            key={addr._id}
                                            value={addr._id}
                                            control={<Radio />}
                                            label={`${addr.name} - ${addr.phone} - ${addr.address}`}
                                        />
                                        ))}
                                        <FormControlLabel value="new" control={<Radio />} label="Thêm địa chỉ mới" />
                                    </RadioGroup>
                                </FormControl>

                                {useNewAddress && (
                                    <>
                                    <h5>Địa chỉ mới</h5>
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
                                                    <MenuItem key={province?.id} value={province?.name}>
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
                                                                <MenuItem key={district?.id} value={district?.name}>
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
                                                                <MenuItem key={ward?.id} value={ward?.name}>
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
                                </>
                            )}

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