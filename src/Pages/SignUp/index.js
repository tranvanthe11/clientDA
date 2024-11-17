import { useContext, useEffect, useState } from 'react';

import { Mycontext } from "../../App";
import Logo from '../../assets/images/logo.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleImg from "../../assets/images/Google.png";
import { Link, useNavigate } from 'react-router-dom';
import { postData, postDataUser } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';




const SignUp = () => {

    const history = useNavigate();


    const context = useContext(Mycontext)
    const [isLoading, setIsLoading] = useState(false);
    const [formfields, setFormfields] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
        isAdmin: false

    });

    useEffect(()=>{
        context.setIsHeaderFooterShow((false))
    }, []);

    const onchangeInput = (e) => {
        setFormfields(()=>({
            ...formfields,
            [e.target.name]:e.target.value
        }))
    }

    const signup = (e) => {
        setIsLoading(true);
        e.preventDefault();

        try{

            if(formfields.name===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm tên",
                    error: true
                })
                return false;
            }
            if(formfields.email===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm email",
                    error: true
                })
                return false;
            }
            if(formfields.phone===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm phone",
                    error: true
                })
                return false;
            }
            if(formfields.password===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm password",
                    error: true
                })
                return false;
            }
            if(formfields.confirmPassword===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm confirmPassword",
                    error: true
                })
                return false;
            }
            if(formfields.confirmPassword!==formfields.password){
                context.setAlertBox({
                    open: true,
                    msg: "Mật khẩu không đúng",
                    error: true
                })
                return false;
            }

            
            postDataUser("/api/user/signup", formfields).then((res)=>{
                if(res.status!==false){

                    context.setAlertBox({
                        open: true,
                        msg: "Đăng ký thành công",
                        error: false
                    })
                    
                    
                    setTimeout(()=>{
                        setIsLoading(false);
                        history("/signIn")
                    }, 2000)
                }else{
                    context.setAlertBox({
                        open: true,
                        msg: res.msg,
                        error: true
                    })
                }
            }).catch(error => {
                console.error('Error posting data:', error)
            })
        }catch(error){
            console.log(error)
        }

    }
    
    return(
        <section className="section signInPage signUpPage">
            <div className="shape-bottom">
                <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" style={{enableBackground: 'new 0 0 1921 819.8'}}> 
                    <path class="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z">
                    </path> 
                </svg>
            </div>
            <div className="container">
                <div className="box card p-3 shadow border-0">
                    {/* <div className="text-center">
                        <img src={Logo} />
                    </div> */}

                    <form className="mt-2" onSubmit={signup}>
                        <h2 className="mb-3">Đăng ký</h2>

                            <div className="form-group">
                                <TextField label="Name" type="text" 
                                    className="w-100" variant="standard" 
                                    name='name' onChange={onchangeInput}/>
                            </div>

                        
                        
                            <div className="form-group">
                                <TextField label="Phone" type="text" 
                                    className="w-100" variant="standard" 
                                    name='phone' onChange={onchangeInput}/>
                            </div>

                        <div className="form-group">
                            <TextField id="standard-basic" label="Email" type="email" 
                                className="w-100" variant="standard" 
                                name='email' onChange={onchangeInput}/>
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Password" type="password" 
                                className="w-100" variant="standard" 
                                name='password' onChange={onchangeInput}/>
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Confirm Password" type="password" 
                                className="w-100" variant="standard" 
                                name='confirmPassword' onChange={onchangeInput}/>
                        </div>
                        
                        <div className="d-flex align-items-center mt-3 mb-3">
                        <div className="row w-100">
                            <div className="col-md-6">
                                <Button type='submit' className="w-100 btn-blue btn-lg btn-big">
                                {isLoading===true ? <CircularProgress color="inherit" className=' loader' /> : 'Đăng ký'}
                                </Button>
                            </div>
                            <div className="col-md-6 pr-0">
                                <Link to="/" className="d-bock w-100">
                                    <Button className="btn-lg btn-big w-100" variant="outlined" 
                                        onClick={()=>context.setIsHeaderFooterShow(true)}>Hủy</Button>
                                </Link>

                            </div>
                        </div>
                        </div>


                        <p className="txt">Bạn đã có tài khoản?<Link to="/signIn" className="border-effect"> Đăng nhập</Link></p>

                        <h6 className="mt-3 text-center font-weight-bold">Hoặc tiếp tục với tài khoản xã hội</h6>

                        <Button className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg}/>
                            Dăng nhập với Google
                        </Button>

                    </form>
                </div>
            </div>
        </section>
    )

}

export default SignUp;