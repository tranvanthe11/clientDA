import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react';

const Sidebar = () => {

    const [value, setValue] = useState([0, 1000000]);
    const [value2, setValue2] = useState(0);
    return(
        <>
            <div className="sidebar">
            <div className='sticky'>
                <div className="filterBox">
                    <h6>Loại sản phẩm</h6>

                    <div className='scroll'>
                        <ul>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Thời trang nam" />
                            </li>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Thời trang nữ" />
                            </li>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Thời trang trẻ em" />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="filterBox">
                    <h6>Tìm theo giá</h6>

                    <RangeSlider value={value} onInput={setValue} min={0} max={1000000} step={5} />

                    <div className='d-flex pt-2 pb-2 priceRange'>
                        <span><strong className='text-dark'> {value[0]}</strong></span>
                        <span className='ml-auto'> <strong className='text-dark'> {value[1]}</strong></span>
                    </div>

                </div>

                <div className="filterBox">
                    <h6>Trạng thái</h6>

                    <div className='scroll'>
                        <ul>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Còn hàng" />
                            </li>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Hết hàng" />
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="filterBox">
                    <h6>Kiểu</h6>

                    <div className='scroll'>
                        <ul>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Quần âu" />
                            </li>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Hoodie" />
                            </li>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Áo phông" />
                            </li>
                            <li className='w-100'>
                                <FormControlLabel control={<Checkbox />} label="Áo gió" />
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Sidebar;