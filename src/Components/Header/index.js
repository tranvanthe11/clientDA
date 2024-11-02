
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg'
import CityDropdown from '../CityDropdown';
import { Button } from '@mui/material';
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext } from 'react';
import { Mycontext } from '../../App';

const Header =()=>{

    const context = useContext(Mycontext);

    return(
        <>
            <div className="headerWrapper">
                {/* <div className="top-strip bg-blue">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center"> Do ảnh hưởng của bảo <b>YAGI</b> nên hàng có thể bị giao chậm hơn so với dự kiến</p>
                    </div>
                </div> */}

                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="logoWrapper d-flex align-items-center col-sm-2">
                                <Link to={'/'}><img src={Logo} alt="Logo" /></Link>
                            </div>

                            <div className="d-flex align-items-center col-sm-10 part2">

                                {
                                    context.cityList.length!==0 && <CityDropdown />
                                }

                                {/* <CityDropdown /> */}
                                <SearchBox />

                                <div className='part3 d-flex align-items-center ml-auto'>
                                {
                                    context.isLogin!==true ? <Link to="/signIn"><Button className='btn-blue btn-round mr-3'>Đăng nhập</Button></Link> :
                                    <Button className='circle mr-3'><CiUser /></Button>
                                }
                                    {/* <Button className='btn-blue btn-round mr-3'>Sign In</Button> */}
                                    {/* <Button className='circle mr-3'><CiUser /></Button> */}
                                    <div className='ml-auto cartTab d-flex align-items-center'>
                                        <span className='price'>100</span>
                                        <div className='position-relative ml-2'>
                                            <Button className='circle'><IoCartOutline /></Button>
                                            <span className='count d-flex align-items-center
                                            justify-content-center'>4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Navigation />
            </div>
        </>
    )
}

export default Header;