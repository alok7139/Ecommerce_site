import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();


const Shopcontextprovider = (props) => {

    const currency = '₹';
    const deliveryfees = 99;
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [search , setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(false)
    const [cartitems, setcartitems] = useState({});
    const [token, settoken] = useState('');
    const navigate = useNavigate();
    const [products, setproducts] = useState([])

    const addtocart = async(itemid,size) => {
        if(!size){
            toast.error('Select Product Size');
            return;
        }
        let cartdata = structuredClone(cartitems);
        if(cartdata[itemid]){
            if(cartdata[itemid][size]){
                cartdata[itemid][size] += 1;
            }
            else{
                cartdata[itemid][size] = 1;
            }
        }
        else{
            cartdata[itemid] = {};
            cartdata[itemid][size] = 1;
        }
        setcartitems(cartdata);
    }

    const getcartcount = () => {
        let totalcount = 0;
        for(const items in cartitems){
            for(const item in cartitems[items]){
                try {
                    if(cartitems[items][item] > 0){
                        totalcount+=cartitems[items][item];
                    }
                } catch (error) {
                    
                }
            }

            return totalcount;
        }
    }

    const updatequantity = async(itemid,size,quantity) => {
        let cartdata = structuredClone(cartitems);
        cartdata[itemid][size] = quantity;

        setcartitems(cartdata);


    }

    const getcartamount = () => {
        let totalamount = 0;
        for(const items in cartitems){
            let iteminfo = products.find((product) => product._id === items);
            for(const item in cartitems[items]){
                try {
                    if(cartitems[items][item] > 0){
                        totalamount += iteminfo.price * cartitems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }

        return totalamount;
    }

    const getproductdata = async() => {
        try {
            const res = await axios.get(backendurl + '/api/product/list' , {withCredentials:true })
            if(res.data.success){
                setproducts(res.data.products);
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(res.data.message);
            toast.error(res.data.message);
        }
    }



    useEffect(() => {
        // console.log(cartitems);
        getproductdata();
    } , [cartitems])


    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            settoken(localStorage.getItem('token'));
        }
    })

    const value = {
        products, currency , deliveryfees , search , setsearch,showsearch,setshowsearch,
        addtocart , cartitems , getcartcount , updatequantity,getcartamount,navigate,
        backendurl , token , settoken
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default Shopcontextprovider