import Product from "../Product";
import { cartContext, userDataContext } from "../../utils/Context";
import { useContext, useEffect, useState } from "react";
import { StyledLi, Button, ProductList, Input } from "./style";



const ShoppingList = ({setClientName, setDeliveryDate, setDeliveryNumber}) => {
    const { cart, updateCart, setIsOpen} = useContext(cartContext)
    const {userData} = useContext(userDataContext)
    const [productList, setProductList] = useState([])
   
    // Get products from the server
    useEffect(()=>{
        
        fetch(`http://localhost:4000/product/all/${userData.userId}`,{
            method : 'GET',
            headers : { 'Authorization' : `Bearer ${userData.token}`}
        })
            .then( res => {
                return res.json()
            })
            .then((products) => {
                setProductList(products)
            })
            .catch( err => ( console.log(err) ))
    },[userData])

    
    // Add product to cart
    const addToCart = (id, name, description, price, amount) => {
        setIsOpen(true)
        const newProduct = {id, name, description, price, amount}
        const product =  cart.find( cartProduct => cartProduct.name === newProduct.name)
        
        //if the product doesn't exists
        if(!product){
            newProduct.amount +=1
            updateCart([...cart, newProduct])
        }
        else{
            const cartCopy = cart
            const index = cartCopy.indexOf(product)
            cartCopy[index].amount +=1
            updateCart([...cartCopy])
        }
    }


    return(
        <div>
            <label htmlFor ={"clientName"}>Nom du client </label> <Input id={"clientName"}  onChange ={(e)=> setClientName(e.target.value)}   type={'text'} placeholder={'--HOTEL ONOMO--'} size={'23'}/>
            <label htmlFor ={"deliveryDate"}>Date de Livraison </label> <Input id={"deliveryDate"} onChange ={(e)=> setDeliveryDate(e.target.value)} type={'Date'} />
            <label htmlFor ={"deliveryNumber"}>Numéro de la commande </label> <input id={"deliveryNumber"} onChange ={(e)=> setDeliveryNumber(e.target.value)} type={'text'} placeholder={'000001'} minLength={'4'} maxLength={'6'} />
            <ProductList>
                {
                    productList && productList.map(({_id, name, description, picture, price, amount}) => (
                        <StyledLi key ={_id}>
                            <Product id = {_id}  name = {name} picture = {picture}  price = {price} />
                            <Button onClick={ () => addToCart(_id, name, description, price, amount)} > Ajouter </Button>
                        </StyledLi>                    
                    ))
                }
            </ProductList>
        </div>
    )
}
export default ShoppingList;