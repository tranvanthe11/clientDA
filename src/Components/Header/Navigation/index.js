import { Button } from '@mui/material';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaAngleRight } from "react-icons/fa";

const Navigation =()=>{

    const [isOpenSlidebarVal, setIsOpenSlidebarVal] = useState(false);

    return(
        <nav>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-2 navPart1'>
                        <div className='catWrapper'>
                            <Button className='allCatTab align-items-center' onClick={()=>setIsOpenSlidebarVal(!isOpenSlidebarVal)}>
                                <span className='icon1 mr-2'><IoMenu /></span>
                                <span className="text">DANH MỤC</span>
                                <span className='icon2 ml-2'><FaAngleDown /></span>
                            </Button>

                            <div className={`sidebarNav ${isOpenSlidebarVal===true ? 'open' : ''}`}>
                                <ul>
                                    <li><Link to="/"><Button>Thời trang nam<FaAngleRight className='ml-auto' /></Button></Link>
                                        <div className='submenu'>
                                            <li><Link to="/"><Button>Hoodie</Button></Link></li>
                                            <li><Link to="/"><Button>Áo gió</Button></Link></li>
                                            <li><Link to="/"><Button>Áo phông</Button></Link></li>
                                            <li><Link to="/"><Button>Quần âu</Button></Link></li>
                                        </div>
                                    </li>
                                    <li><Link to="/"><Button>Thời trang nữ<FaAngleRight className='ml-auto' /></Button></Link>
                                        <div className='submenu'>
                                            <li><Link to="/"><Button>Hoodie</Button></Link></li>
                                            <li><Link to="/"><Button>Áo gió</Button></Link></li>
                                            <li><Link to="/"><Button>Áo phông</Button></Link></li>
                                            <li><Link to="/"><Button>Quần âu</Button></Link></li>
                                        </div>
                                    </li>
                                    <li><Link to="/"><Button>Thời trang trẻ em<FaAngleRight className='ml-auto' /></Button></Link>
                                        <div className='submenu'>
                                            <li><Link to="/"><Button>Hoodie</Button></Link></li>
                                            <li><Link to="/"><Button>Áo gió</Button></Link></li>
                                            <li><Link to="/"><Button>Áo phông</Button></Link></li>
                                            <li><Link to="/"><Button>Quần âu</Button></Link></li>
                                        </div>
                                    </li>
                                    
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div className='col-sm-10 navPart2 d-flex align-items-center'>
                        <ul className='list list-inline ml-auto'>
                            <li className='list-inline-item'><Link to="/"><Button>Home</Button></Link></li>
                            <li className='list-inline-item'>
                                <Link to="/"><Button>Thời trang nam</Button></Link>
                                <div className='submenu shadow'>
                                    <Link to="/cat/1"><Button>Polo</Button></Link>
                                    <Link to="/cat/1"><Button>Sơ mi</Button></Link>
                                    <Link to="/cat/1"><Button>Quần âu</Button></Link>
                                </div>
                            </li>
                            <li className='list-inline-item'>
                                <Link to="/"><Button>Thời trang nữ</Button></Link>
                                <div className='submenu shadow'>
                                    <Link to="/"><Button>Polo</Button></Link>
                                    <Link to="/"><Button>Sơ mi</Button></Link>
                                    <Link to="/"><Button>Quần âu</Button></Link>
                                </div>
                            </li>
                            <li className='list-inline-item'>
                                <Link to="/"><Button>Thời trang trẻ em</Button></Link>
                                <div className='submenu shadow'>
                                    <Link to="/"><Button>Polo</Button></Link>
                                    <Link to="/"><Button>Sơ mi</Button></Link>
                                    <Link to="/"><Button>Quần âu</Button></Link>
                                </div>
                            </li>                            
                            {/* <li className='list-inline-item'>
                                <Link to="/"><Button>Brand 4</Button></Link>
                                <div className='submenu shadow'>
                                    <Link to="/"><Button>Thời trang nam</Button></Link>
                                    <Link to="/"><Button>Thời trang nữ</Button></Link>
                                </div>
                            </li> */}
                        </ul>       
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation