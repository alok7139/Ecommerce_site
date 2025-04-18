import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();


const Shopcontextprovider = (props) => {

    const currency = '₹';
    const deliveryfees = 10;
    const [search , setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(false)
    const [cartitems, setcartitems] = useState({});

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

    useEffect(() => {
        console.log(cartitems);
    } , [cartitems])

    const value = {
        products, currency , deliveryfees , search , setsearch,showsearch,setshowsearch,
        addtocart , cartitems , getcartcount
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default Shopcontextprovider