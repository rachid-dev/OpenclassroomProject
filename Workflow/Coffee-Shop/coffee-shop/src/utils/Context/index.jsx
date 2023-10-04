import { createContext, useState } from "react";

export const cartContext = createContext()
export const userDataContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, updateCart] = useState([])
    const [isOpen, setIsOpen] = useState(true)

    return(
        <cartContext.Provider value = {{cart, updateCart, isOpen, setIsOpen}}>
            {children}
        </cartContext.Provider>
    )
}

export const UserDataProvider = ({children}) => {
    const value = sessionStorage.getItem('userData');
    const [userData, setUserData] = useState(value? JSON.parse(value) : {isLogged : false});

    return(
        <userDataContext.Provider value = {{userData, setUserData}}>
            {children}
        </userDataContext.Provider>
    )
}