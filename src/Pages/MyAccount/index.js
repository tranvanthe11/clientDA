import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IoMdCloudUpload } from "react-icons/io";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { deleteData, editData, editDataUser, fetchDataFromApi, postDataImg, postDataUser } from "../../utils/api";
import { Mycontext } from "../../App";
import NoImage from '../../assets/images/noimage.png'
import axios from 'axios';
import { InputLabel, MenuItem, FormControl, Select, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const MyAccount = () => {

    const [value, setValue] = useState(0);
    const [previews, setPreviews] = useState();
    const formdata = new FormData();
    const context = useContext(Mycontext);

    const [formFields, setFormFields] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        images: [],
        isAdmin: false

    });

    const [fields, setFields] = useState({
        oldPassword:"",
        password:"",
        confirmPassword:"",

    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const history = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [imgFiles, setImgFiles] = useState();
    const [userData, setUserData] = useState([]);
    const [isSelectdFiles,setIsSelectdFiles] = useState(false);
    const [files, setFiles] = useState([]);

    const [addresses, setAddresses] = useState([]);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formFields1, setFormFields1] = useState({
        fullName:"",
        phone:"",
        province:"",
        district:"",
        ward:"",
        street:""
    })

    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [useNewAddress, setUseNewAddress] = useState(false);


    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        
        const token = localStorage.getItem("token");
        if(token!=="" && token!==undefined && token!==null){
            setIsLogin(true);
        }else{
            history("/signIn");
        }
        const user = JSON.parse(localStorage.getItem("user"));

        fetchDataFromApi(`/api/user/${user?.userId}`).then((res)=>{
            // context.setProgress(30);

            setUserData(res)

            setFormFields({
                name: res.name || "",
                email: res.email || "",
                phone: res.phone || "",
                images: res.images || []
            });
            setPreviews(res.images || []); 
        })

        fetchDataFromApi(`/api/addresses?userId=${user.userId}`).then(res => {
            setAddresses(res);
        });
    }, [])

    const handleAddAddress = async (newAddress) => {
        postDataUser('/api/addresses/add', newAddress).then((res)=>{
            setFormFields1({});
            fetchDataFromApi(`/api/addresses?userId=${user.userId}`).then(res => {
                setAddresses(res);
            });
        }); 
    };
    
    const handleEditAddress = async () => {
        const { name, phone, street, province, district, ward, isDefault } = formFields1;
    
        const fullAddress = `${street}, ${ward}, ${district}, ${province}`;
    
        const addressData = {
            name,   
            phone, 
            address: fullAddress,
            province,  
            district,   
            ward,
            street,   
            isDefault, 
        };
    
        try {
            editData(`/api/addresses/${editingAddress._id}`, addressData).then((res)=>{
                fetchDataFromApi(`/api/addresses?userId=${user.userId}`).then(res => {
                    setAddresses(res);
                });
            });

    
            setIsEditingAddress(false);
            setEditingAddress(null);
            handleCloseDialog();
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };
    
    const handleDeleteAddress = (addressId) => {
        deleteData(`/api/addresses/${addressId}`).then((res)=>{
            fetchDataFromApi(`/api/addresses?userId=${user.userId}`).then(res => {
                setAddresses(res);
            });
        });
    };
    
    const handleSetDefaultAddress = async (addressId) => {
        try {
            // Tìm thông tin của địa chỉ cần cập nhật (bao gồm tất cả các trường)
            const addressToUpdate = addresses.find(address => address._id === addressId);
            
            if (!addressToUpdate) {
                console.error("Address not found");
                return;
            }
    
            // Tạo dữ liệu cần gửi lên API, bao gồm tất cả các trường thông tin địa chỉ
            const updatedAddressData = {
                userId: user.userId,  // Truyền userId của người dùng
                name: addressToUpdate.name,
                phone: addressToUpdate.phone,
                address: addressToUpdate.address,
                province: addressToUpdate.province,
                district: addressToUpdate.district,
                ward: addressToUpdate.ward,
                street: addressToUpdate.street,
                isDefault: true,
            };
    
            editData(`/api/addresses/${addressId}`, updatedAddressData).then((res)=>{
                fetchDataFromApi(`/api/addresses?userId=${user.userId}`).then(res => {
                    setAddresses(res);
                });
            });
    
        } catch (error) {
            console.error("Error setting default address:", error);
        }
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setFormFields1({});
        setOpenDialog(false);
    }

    const handleChangeProvinces = (event) => {
        setSelectedProvince(event.target.value);
        setFormFields1(()=>(
            {
                ...formFields1,
                province:event.target.value
            }
        ))
    };

    const handleChangeDistricts = (event) => {
        setSelectedDistrict(event.target.value);
        setFormFields1(()=>(
            {
                ...formFields1,
                district:event.target.value
            }
        ))
    };

    const handleChangeWards = (event) => {
        setSelectedWard(event.target.value);
        setFormFields1(()=>(
            {
                ...formFields1,
                ward:event.target.value
            }
        ))
    };

    const onChangeInput = (e) =>{
        setFormFields1(()=>({
            ...formFields1,
            [e.target.name]: e.target.value
        }))
    }
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

    useEffect(()=>{
        if(!imgFiles) return;
        let tmp = [];
        for(let i=0; i<imgFiles.length; i++){
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }

        const objectUrls = tmp;
        setPreviews(objectUrls);

        for(let i=0; i<objectUrls.length; i++){
            return()=>{
                URL.revokeObjectURL(objectUrls[i])
            }
        }
    }, [imgFiles])

    const changeInput = (e)=>{
        setFormFields(()=>(
            {
                ...formFields,
                [e.target.name]:e.target.value
            }
        ))
    }

    const changeInput2 = (e)=>{
        setFields(()=>(
            {
                ...fields,
                [e.target.name]:e.target.value
            }
        ))
    }

    const onChangeFile = async(e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
            for (var i = 0; i < files.length; i++) {
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' 
                    || files[i].type === 'image/png' || files[i].type === 'image/webp')) {
                    setImgFiles(e.target.files)
                    const file = files[i];
                    imgArr.push(file);
                    formdata.append(`images`, file)
    
                    setFiles(imgArr);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Thêm ảnh thành công"
                    });
    
                    setIsSelectdFiles(true);
    
                    postDataImg(apiEndPoint, formdata).then((res) => {
                        console.log(res); // Kiểm tra dữ liệu trả về
                        if (res && res.images) { // Đảm bảo rằng 'res' chứa thuộc tính 'images'
                            const { images } = res;
                            setFormFields({
                                ...formFields,
                                images: images // Lưu URL ảnh vào formFields
                            });
                        } else {
                            context.setAlertBox({
                                open: true,
                                error: true,
                                msg: "Lỗi tải ảnh lên Cloudinary."
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                        context.setAlertBox({
                            open: true,
                            error: true,
                            msg: "Đã có lỗi xảy ra khi tải ảnh."
                        });
                    });
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Vui lòng thêm ảnh"
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const edituser=(e)=>{
        e.preventDefault();

        formdata.append('name', formFields.name);
        formdata.append('phone', formFields.phone);
        formdata.append('email', formFields.email);

        if(formFields.name!=="" && formFields.email!=="" && formFields.phone!==""){
    
            editData(`/api/user/${user?.userId}`, formFields).then((res)=>{
            setUserData(res)
            context.setAlertBox({
                open:true,
                error: false,
                msg: "Cập nhật thành công"
            });

                // history('/category')
            })

        }else{
            context.setAlertBox({
                open:true,
                error: true,
                msg: "Vui lòng điền đày đủ thông tin"
            });
            return false;
        }

    }

    const changePassword =(e)=>{
        e.preventDefault();

        formdata.append('password', fields.password);

        if(fields.oldPassword!=="" && fields.password!=="" && fields.confirmPassword!==""){

            if(fields.password!== fields.confirmPassword){
                context.setAlertBox({
                    open:true,
                    error: true,
                    msg: "Mật khẩu và xác nhận mật khẩu không giống nhau"
                });
            }else{

                const user = JSON.parse(localStorage.getItem("user"));
                const data={
                    name:user?.name,
                    email: user?.email,
                    password: fields.oldPassword,
                    newPass: fields.password,
                    phone: formFields.phone
                }

                    editDataUser(`/api/user/changePassword/${user?.userId}`, data).then((res)=>{
                        console.log(res)
                        if (res.status === false) {
                            context.setAlertBox({
                                open: true,
                                error: true,
                                msg: "Mật khẩu cũ không đúng. Vui lòng thử lại.",
                            });
                        }else{
                            context.setAlertBox({
                                open:true,
                                error: false,
                                msg: "Thay đổi mật khẩu thành công"
                            });

                        }
                    })


                }
    

        }else{
            context.setAlertBox({
                open:true,
                error: true,
                msg: "Vui lòng điền đày đủ thông tin"
            });
            return false;
        }
    }
    return(
        <section className="section myAccountPage">
            <div className="container">
                <h2 className="hd">My Account</h2>

                <Box sx={{ width: '100%' }} className="myAccBox card border-0">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Edit Profile" {...a11yProps(0)} />
                            <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
                            <Tab label="Địa chỉ" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <form onSubmit={edituser}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="userImage">
                                        {
                                            previews?.length !== 0 ? previews?.map((img, index)=>{
                                                return(
                                                    <img src={img} />
                                                )
                                            })
                                            :
                                            <img src={NoImage} />
                                        }
                                        <div className="overlay d-flex align-items-center justify-content-center">
                                            <IoMdCloudUpload />
                                            <input type="file" onChange={(e)=>onChangeFile(e, '/api/user/upload')} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Họ và tên" variant="outlined" value={formFields?.name}
                                                className="w-100"  onChange={changeInput} name="name"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Email" disabled variant="outlined" value={formFields?.email}
                                                className="w-100" onChange={changeInput} name="email"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField label="Số điện thoại" variant="outlined" value={formFields?.phone}
                                                className="w-100" onChange={changeInput} name="phone"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <Button type="submit" className='btn-blue btn-lg btn-big'>Lưu</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                    <form onSubmit={changePassword}>
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Mật khẩu cũ" variant="outlined"
                                                className="w-100" name="oldPassword" onChange={changeInput2} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Mật khẩu mới"  variant="outlined"
                                                className="w-100" name="password" onChange={changeInput2} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <TextField label="Xác nhận mật khẩu mới" variant="outlined"
                                                className="w-100" name="confirmPassword" onChange={changeInput2}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <Button type="submit" className='btn-blue btn-lg btn-big'>Lưu</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <div className="address">
                            <div className="d-flex align-items-center m-2">
                                <h5>Quản lý địa chỉ</h5>
                                <Button className="ml-auto btn-blue btn-lg "
                                onClick={handleOpenDialog}>Thêm địa chỉ mới</Button>

                            </div>
                            <div>
                                {addresses.length === 0 ? (
                                    <p>Không có địa chỉ nào.</p>
                                ) : (
                                    <>
                                    {addresses?.map((address) => (
                                    <div className='row cssAddress' key={address._id} >
                                        <div className='col-md-10'>
                                            <h6 className="mt-2">{address?.name} - {address?.phone}</h6>
                                            <h6>{address?.address}</h6>
                                            <p className="text-danger">
                                            {address.isDefault ? 'Mặc định' : ''}
                                            </p>
                                        </div>
                                        <div className='col-md-2 mb-1'>
                                            <Button 
                                            onClick={() => {
                                                setFormFields1({
                                                    ...address,
                                                    isDefault: address.isDefault,
                                                });
                                                setEditingAddress(address); 
                                                setOpenDialog(true);
                                            }}
                                            >Cập nhật</Button>
                                            <Button onClick={() => handleDeleteAddress(address._id)}>Xóa</Button>
                                            {!address.isDefault && (
                                                <Button className="border" onClick={() => handleSetDefaultAddress(address._id)}>Đặt làm mặc định</Button>
                                            )}
                                        </div>
                                    </div>
                                    ))}

                                </>
                                )}
                            </div>

                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                            <DialogTitle>{editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</DialogTitle>
                            <DialogContent>
                                <form onSubmit={(e) => {
                                    e.preventDefault(); 

                                    const fullAddress = `${formFields1.street}, ${formFields1.ward}, ${formFields1.district}, ${formFields1.province}`;
                                    const newAddress = {
                                        name: formFields1.fullName,
                                        phone: formFields1.phone,
                                        address: fullAddress,
                                        province: formFields1.province,
                                        district: formFields1.district,
                                        ward: formFields1.ward,
                                        street: formFields1.street,
                                        isDefault: formFields1.isDefault,
                                        userId: user.userId,
                                    };

                                    if (editingAddress) {
                                        handleEditAddress(newAddress); 
                                    } else {
                                        handleAddAddress(newAddress);
                                    }

                                    setIsEditingAddress(false);  
                                    setEditingAddress(null);   
                                    handleCloseDialog(); 
                                }}>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    label="Họ và tên"
                                                    className="w-100"
                                                    name="fullName"
                                                    variant="outlined"
                                                    value={formFields1.name}
                                                    onChange={onChangeInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <TextField
                                                    label="Số điện thoại"
                                                    className="w-100"
                                                    name="phone"
                                                    variant="outlined"
                                                    value={formFields1.phone}
                                                    onChange={onChangeInput}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <FormControl fullWidth>
                                                    <InputLabel id="province-select-label">Tỉnh/Thành phố</InputLabel>
                                                    <Select
                                                        id="province-select"
                                                        value={formFields1.province}
                                                        label="Tỉnh/Thành phố"
                                                        onChange={handleChangeProvinces}
                                                    >
                                                        {provinces?.map((province) => (
                                                            <MenuItem key={province?.id} value={province?.name}>
                                                                {province?.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <FormControl fullWidth>
                                                    <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
                                                    <Select
                                                        value={formFields1.district}
                                                        label="Quận/Huyện"
                                                        onChange={handleChangeDistricts}
                                                    >
                                                        {districts?.map((district) => (
                                                            <MenuItem key={district?.id} value={district?.name}>
                                                                {district?.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <FormControl fullWidth>
                                                    <InputLabel id="ward-select-label">Phường/Xã</InputLabel>
                                                    <Select
                                                        id="ward-select"
                                                        value={formFields1.ward}
                                                        label="Phường/Xã"
                                                        onChange={handleChangeWards}
                                                    >
                                                        {wards?.map((ward) => (
                                                            <MenuItem key={ward?.id} value={ward?.name}>
                                                                {ward?.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <TextField
                                                    label="Địa chỉ cụ thể"
                                                    className="w-100"
                                                    name="street"
                                                    variant="outlined"
                                                    value={formFields1.street}
                                                    onChange={onChangeInput}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="primary">
                                        Hủy
                                    </Button>
                                    <Button type="submit" color="primary">
                                        {editingAddress ? 'Cập nhật' : 'Thêm'} địa chỉ
                                    </Button>
                                </DialogActions>
                                </form>
                            </DialogContent>
                        </Dialog>


                        </div>
                    </CustomTabPanel>
                    </Box>

            </div>
        </section>
    )
}

export default MyAccount;