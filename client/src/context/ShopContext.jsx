import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();


const Shopcontextprovider = (props) => {

    const currency = '₹';
    const deliveryfees = 10;
    const [search , setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(true)

    const value = {
        products, currency , deliveryfees , search , setsearch,showsearch,setshowsearch
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default Shopcontextprovider