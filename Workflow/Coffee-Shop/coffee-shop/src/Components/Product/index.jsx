import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductContainer = styled.div`
    margin: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    text-transform: capitalize;
    position: relative;
    `

// const ProductInfo = styled.p`
//     text-align : center;
//     `

const StyledImg = styled.img`
    height: 250px;
    width: 250px;
    border-radius: 20px;
    
    `
const Product = ({id, name, picture, price}) => {
    const formatedPrice = new Intl.NumberFormat().format(price)
    return(
        <ProductContainer>
            <Link to= {`/product/${id}`} >
                <StyledImg src={picture} alt = {name} />
            </Link>
            <span>{ `Nom : ${name}` } <br/></span>
            <span>{`Prix : ${formatedPrice} fcfa`}</span>
        </ProductContainer>
    )
}
export default Product;