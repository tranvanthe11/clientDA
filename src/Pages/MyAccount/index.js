import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IoMdCloudUpload } from "react-icons/io";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { editData, editDataUser, fetchDataFromApi, postDataImg } from "../../utils/api";
import { Mycontext } from "../../App";
import NoImage from '../../assets/images/noimage.png'

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
            // setPreviews(res.images);
            setPreviews(res.images || []); 
            console.log(previews)
            // context.setProgress(100);
        })
    }, [])

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
                    </Box>
            </div>
        </section>
    )
}

export default MyAccount;