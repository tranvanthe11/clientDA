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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { fetchDataFromApi, postData, postDataUser } from "./utils/api";
import MyList from "./Pages/MyList";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import MyAccount from "./Pages/MyAccount";

const Mycontext = createContext();

function App() {

  const [cityList, setCityList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false)
  const [activeCat, setActiveCat] = useState('')
  const [cartData, setCartData] = useState([])
  const [isOpenProductModal, setIsOpenProductModal] = useState({
    id:'',
    open:false
  });
  const [productData, setProductData] = useState();
  const [alertBox, setAlertBox] = useState({
    msg:'',
    error: false,
    open:false
  })
  const [user, setUser] = useState({
    name:"",
    email:"",
    userId:""
  })



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open:false
    })


  };


  useEffect(()=>{
    getCity("https://provinces.open-api.vn/api/");

    fetchDataFromApi("/api/category").then((res)=>{
      setCategoryData(res.categoryList)
      setActiveCat(res.categoryList[0].name)
    })

    fetchDataFromApi("/api/brand").then((res)=>{
      setBrandData(res)
    })

    const user = JSON.parse(localStorage.getItem("user"))
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res)=>{
            setCartData(res);
        })
  },[])

  const getCartData=()=>{
    const user = JSON.parse(localStorage.getItem("user"))
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res)=>{
            setCartData(res);
        })
  }


  useEffect(()=>{
    isOpenProductModal.open===true &&
    fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res)=>{
      setProductData(res)
    })
  },[isOpenProductModal])

  const getCity =async(url)=>{
    const responsive = await axios.get(url).then((res)=>{
      setCityList(res.data)
    })
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token!==null && token!=="" && token!==undefined){
      setIsLogin(true)
      const userData = JSON.parse(localStorage.getItem("user"));
      
      setUser(userData)
    }else{
      setIsLogin(false)
    }
  },[isLogin])

  const addToCart=(data)=>{


    postDataUser(`/api/cart/add`, data).then((res)=>{
      if(res.status!==false){
          setAlertBox({
            open: true,
            msg: "Đã thêm vào giỏ hàng",
            error: false
        })
    getCartData();


      }else{
        setAlertBox({
          open: true,
          msg: res.msg,
          error: true
      })
      }
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
    setIsLogin,
    alertBox, 
    setAlertBox,
    user, 
    setUser,
    categoryData, 
    setCategoryData,
    brandData, 
    setBrandData,
    activeCat, 
    setActiveCat,
    addToCart,
    cartData, 
    setCartData,
    getCartData
  }

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
      <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertBox.error===false ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertBox.msg}
        </Alert>
      </Snackbar>
      {
        isHeaderFooterShow === true && <Header />
      }
        {/* <Header /> */}
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/category/:id" exact={true} element={<Listing />} />
          <Route path="/productDetails/:id" exact={true} element={<ProductDetails />} />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route path="/signIn" exact={true} element={<SignIn/>} />
          <Route path="/signUp" exact={true} element={<SignUp/>} />
          <Route path="/myList" exact={true} element={<MyList/>} />
          <Route path="/checkout" exact={true} element={<Checkout/>} />
          <Route path="/orders" exact={true} element={<Orders/>} />
          <Route path="/myAccount" exact={true} element={<MyAccount/>} />
        </Routes>
        {
          isHeaderFooterShow === true && <Footer />
        }
        {/* <Footer /> */}

        {
          isOpenProductModal.open===true && <ProductModal data={productData}/>
        }
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;

export {Mycontext};
