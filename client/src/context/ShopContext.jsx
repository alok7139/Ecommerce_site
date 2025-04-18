import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();


const Shopcontextprovider = (props) => {

    const currency = '₹';
    const deliveryfees = 10;
    const [search , setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(false)
    const [cartitems, setcartitems] = useState({});

    const addtocart = async(itemid,size) => {
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

    useEffect(() => {
        console.log(cartitems);
    } , [cartitems])

    const value = {
        products, currency , deliveryfees , search , setsearch,showsearch,setshowsearch,
        addtocart , cartitems
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default Shopcontextprovider