import { Button } from '@mui/material';
import { IoSearch } from "react-icons/io5";

const SearchBox =()=>{
    return(
        <div className='headerSearch ml-3 mr-3'>
            <input type='text' placeholder='Tìm kiếm sản phẩm' />
            <Button><IoSearch /></Button>
        </div>
    )
}

export default SearchBox;