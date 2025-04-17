import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();


const Shopcontextprovider = (props) => {

    const currency = '$';
    const deliveryfees = 10;

    const value = {
        products, currency , deliveryfees
    }


    return (
        <ShopContext.Provider>
            {props.children}
        </ShopContext.Provider>
    )
}


export default Shopcontextprovider