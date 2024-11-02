import React, { useEffect } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import { useContext } from 'react';
import { Mycontext } from '../../App';
import removeAccents from 'remove-accents';  // dùng để xóa dấu

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CityDropdown = () => {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);

    const [cityList, setCityList] = useState([]);
    const [originalCityList, setOriginalCityList] = useState([]);  // Danh sách gốc có dấu

    const context = useContext(Mycontext);

    const selectCity = (index, city) => {
        setSelectedTab(index);
        setIsOpenModal(false);
        context.setSelectedCity(city);
    };

    useEffect(() => {
        setCityList(context.cityList);
        setOriginalCityList(context.cityList);  // Lưu danh sách gốc có dấu
    }, [context.cityList]);

    const filterList = (e) => {
        const keyword = removeAccents(e.target.value.toLowerCase());  // Xóa dấu và chuyển về chữ thường
        if (keyword !== "") {
            const list = originalCityList.filter((item) => {
                // So sánh cả tên gốc và phiên bản không dấu
                const itemName = item.name.toLowerCase();
                const itemNameNoAccents = removeAccents(itemName);  // Tên thành phố không dấu

                // So khớp nếu tên thành phố có dấu hoặc không dấu trùng với từ khóa
                return itemName.includes(e.target.value.toLowerCase()) || itemNameNoAccents.includes(keyword);
            });

            setCityList(list);
        } else {
            setCityList(originalCityList);  // Trả về danh sách gốc nếu từ khóa trống
        }
    };

    return (
        <>
            <Button className='cityDrop' onClick={() => setIsOpenModal(true)}>
                <div className='info d-flex flex-column'>
                    <span className="lable">Khu vực của bạn</span>
                    <span className="name">{context.selectedCity !== "" ? context.selectedCity.length > 10
                        ? context.selectedCity?.substr(0, 12) + '...' : context.selectedCity : 'Lựa chọn khu vực'}</span>
                </div>
                <span className="ml-auto"><FaAngleDown /></span>
            </Button>

            <Dialog open={isOpenModal} onClose={() => setIsOpenModal(false)}
                TransitionComponent={Transition} className="locationModal">
                <h4>Chọn địa điểm giao hàng của bạn</h4>
                <Button className="close_" onClick={() => setIsOpenModal(false)}><IoClose /></Button>

                <div className='headerSearch w-100'>
                    <input type='text' placeholder='Tìm kiếm khu vực của bạn' onChange={filterList} />
                    <Button><IoSearch /></Button>
                </div>

                <ul className="cityList mt-3">
                    {
                        cityList.length !== 0 && cityList?.map((item, index) => {
                            return (
                                <li key={index}><Button onClick={() => selectCity(index, item.name)}
                                    className={`${selectedTab === index ? 'active' : ''}`}
                                >{item.name}</Button></li>
                            )
                        })
                    }
                </ul>
            </Dialog>
        </>
    );
};

export default CityDropdown;
