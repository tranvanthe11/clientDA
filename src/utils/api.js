import axios from "axios";
// require('dotenv/config');

export const fetchDataFromApi=async(url)=>{
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}`+url)
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const postDataUser = async (url, formData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}`+url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            const errorData = await response.json();
            return errorData; // Trả về dữ liệu lỗi từ server
        }

        // Trả về dữ liệu nếu thành công
        const data = await response.json();
        return data;
    } catch (error){
        console.log(error);
        return error;
    }
}

export const postData = async (url, formData) => {
    const {res} = await axios.post(`${process.env.REACT_APP_BASE_URL}`+url, formData)
    return res;
}

export const editData = async (url, updatedData) => {
    const {res} = await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`, updatedData)
    return res;
}

export const editDataUser = async (url, updatedData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`, updatedData);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error editing data:", error);
        return error.response ? error.response.data : { msg: "Something went wrong" };
    }
};

export const deleteData = async (url) => {
    const {res} = await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`)
    return res;
}

export const postDataImg = async (url, formData) => {
    try {
        // Gửi formData với axios
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}` + url, formData);
        
        // Trả về data từ response
        return response.data; // response.data chứa dữ liệu trả về từ server
    } catch (error) {
        console.error("Error posting data", error);
        throw error; // Nếu có lỗi, throw error để xử lý ở nơi gọi hàm
    }
}