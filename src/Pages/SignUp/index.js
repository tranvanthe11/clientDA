import { useContext, useEffect } from "react";
import { Mycontext } from "../../App";
import Logo from '../../assets/images/logo.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import GoogleImg from "../../assets/images/Google.png";


const SignUp = () => {

    const context = useContext(Mycontext)

    useEffect(()=>{
        context.setIsHeaderFooterShow((false))
    }, []);
    
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

                    <form className="mt-2">
                        <h2 className="mb-3">Đăng ký</h2>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Name" type="text" required
                                        className="w-100" variant="standard" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Phone" type="text" required
                                        className="w-100" variant="standard" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <TextField id="standard-basic" label="Email" type="email" required
                                className="w-100" variant="standard" />
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Password" type="password" required 
                                className="w-100" variant="standard" />
                        </div>
                        
                        <div className="d-flex align-items-center mt-3 mb-3">
                        <div className="row w-100">
                            <div className="col-md-6">
                                <Button className="w-100 btn-blue btn-lg btn-big">Đăng ký</Button>
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