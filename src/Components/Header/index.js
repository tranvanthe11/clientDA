
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logoclient.jpg'
import CityDropdown from '../CityDropdown';
import { Button } from '@mui/material';
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext } from 'react';
import {  useState } from "react";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import { Mycontext } from '../../App';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const Header =()=>{

    const history = useNavigate()

    const [anchorEl, setAnchorEl] =useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const context = useContext(Mycontext);

    const logout=()=>{
        localStorage.clear();

        setAnchorEl(null);

        context.setAlertBox({
            open: true,
            msg: "Đăng xuất thành công",
            error: false
        })
        context.setIsLogin(false)

        setTimeout(() => {
            history("/signIn");
        }, 2000);
    }

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
                                <Link to={'/'}><img src={Logo} alt="Logo" className='logo' /></Link>
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
                                    <>
                                    <Button onClick={handleClick} className='circle mr-3'><CiUser /></Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="accDrop"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        slotProps={{
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <Link to="/myAccount">
                                        <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <FaUser  fontSize="small" />
                                        </ListItemIcon>
                                        My account
                                        </MenuItem>
                                        </Link>
                                        <Link to="/orders">
                                        <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <FaClipboardCheck fontSize="small" />
                                        </ListItemIcon>
                                        Orders
                                        </MenuItem>
                                        </Link>
                                        <Link to="/myList">
                                            <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <FaHeart  fontSize="small" />
                                            </ListItemIcon>
                                            My List
                                            </MenuItem>
                                        </Link>
                                        <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            <IoLogOutOutline  fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                        </MenuItem>
                                    </Menu>
                                    </>
                                }
                                    {/* <Button className='btn-blue btn-round mr-3'>Sign In</Button> */}
                                    {/* <Button className='circle mr-3'><CiUser /></Button> */}
                                    <div className='ml-auto cartTab d-flex align-items-center'>
                                        <span className='price'>
                                        {
                                            context?.cartData?.length!==0 ? 
                                            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                                context?.cartData
                                                    ?.map(item => parseInt(item.price) * item.quantity)
                                                    ?.reduce((total, value) => total + value, 0))
                                            :
                                            0
                                        }
                                        </span>
                                        <div className='position-relative ml-2'>
                                            <Link to={"/cart"}>
                                                <Button className='circle'><IoCartOutline /></Button>
                                                <span className='count d-flex align-items-center
                                                justify-content-center'>{context?.cartData?.length}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {
                    context?.categoryData?.length !==0 && 
                    <Navigation catData={context?.categoryData} />
                }

            </div>
        </>
    )
}

export default Header;