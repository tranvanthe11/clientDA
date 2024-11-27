import FormGroup from '@mui/material/FormGroup';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useContext, useEffect, useState } from 'react';
import { Mycontext } from '../../App';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const Sidebar = (props) => {
    const context = useContext(Mycontext);

    // const [filteryRating, setFilterByRating] = useState();
    const [brandName, setBrandName] = useState('')

    const [filterCat, setFilterCat] = useState()
    const [catId, setCatId] = useState('');

    const handleChange = (event) => {
        setFilterCat(event.target.value);
        props.filterData(event.target.value)
        setCatId(event.target.value)
    };
    
    const {id} = useParams();
    useEffect(()=>{
        setCatId(id)
    }, [id])
    
    const [value, setValue] = useState([0, 1000000]);
    const [value2, setValue2] = useState(0);
   

    useEffect(()=>{
        props.filterByPrice(value , catId)
    }, [value])

    const filterByRating = (rating) =>{
        props.filterByRating(rating ,catId)
    }
    return(
        <>
            <div className="sidebar">
            <div className='sticky'>
                <div className="filterBox">
                    <h6>Loại sản phẩm</h6>

                    <div className='scroll'>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={filterCat}
                            onChange={handleChange}
                        >
                            <ul>
                                {
                                    context.categoryData?.length!==0 && context.categoryData?.map((item, index)=>{
                                        return(
                                            <li className='w-100'>
                                                <FormControlLabel value={item.id}
                                                control={<Radio  />} label={item.name} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </RadioGroup>
                    </div>
                </div>

                <div className="filterBox">
                    <h6>Tìm theo giá</h6>

                    <RangeSlider value={value} onInput={setValue} min={0} max={1000000} step={50000} />

                    <div className='d-flex pt-2 pb-2 priceRange'>
                        {/* <span><strong className='text-dark'> {value[0]}</strong></span> */}
                        <strong className='text-dark'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value[0])}
                        </strong>
                        {/* <span className='ml-auto'> <strong className='text-dark'> {value[1]}</strong></span> */}
                        <strong className='text-dark ml-auto'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value[1])}
                        </strong>
                    </div>

                </div>

                <div className="filterBox">
                    <h6>Tìm theo đánh giá sao</h6>

                    <div className='scroll'>
                        <ul>
                            <li onClick={()=>filterByRating(5)}>
                                <Rating size="small" name="read-only" value={5} readOnly />
                            </li>
                        </ul>
                        <ul>
                            <li onClick={()=>filterByRating(4)}>
                                <Rating size="small" name="read-only" value={4} readOnly />
                            </li>
                        </ul>
                        <ul>
                            <li onClick={()=>filterByRating(3)}>
                                <Rating size="small" name="read-only" value={3} readOnly />
                            </li>
                        </ul>
                        <ul>
                            <li onClick={()=>filterByRating(2)}>
                                <Rating size="small" name="read-only" value={2} readOnly />
                            </li>
                        </ul>
                        <ul>
                            <li onClick={()=>filterByRating(5)}>
                                <Rating size="small" name="read-only" value={1} readOnly />
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