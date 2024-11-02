import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";
import Header from "./Components/Header";
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import Footer from "./Components/Footer";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ProductModal from "./Components/ProductModal";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";

const Mycontext = createContext();

function App() {

  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false)
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);

  useEffect(()=>{
    getCity("https://provinces.open-api.vn/api/");
  },[])

  const getCity =async(url)=>{
    const responsive = await axios.get(url).then((res)=>{
      setCityList(res.data)
      // console.log(res.data)
    })
  }

  const values ={
    cityList,
    setSelectedCity,
    selectedCity,
    isOpenProductModal,
    setIsOpenProductModal,
    isHeaderFooterShow,
    setIsHeaderFooterShow,
    isLogin, 
    setIsLogin
  }

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
      {
        isHeaderFooterShow === true && <Header />
      }
        {/* <Header /> */}
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/cat/:id" exact={true} element={<Listing />} />
          <Route path="/productDetails/:id" exact={true} element={<ProductDetails />} />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route path="/signIn" exact={true} element={<SignIn/>} />
          <Route path="/signUp" exact={true} element={<SignUp/>} />
        </Routes>
        {
          isHeaderFooterShow === true && <Footer />
        }
        {/* <Footer /> */}

        {
          isOpenProductModal===true && <ProductModal/>
        }
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;

export {Mycontext};
