import styled from "styled-components";

export const Header = styled.header`
    text-align : center;
    margin-bottom : 200px;
    `

export const Footer = styled.footer`
    text-align : center;
    `

export const DeliveryNoteContainer = styled.div`
    margin-bottom : 300px;
    `

export const Table = styled.table`
    position : relative;
    left: 300px;
    border : 2px solid black;
    border-collapse : collapse;
    ` 
export const Td = styled.td`
    border: 1px solid #333;
    text-align : ${({isCenter}) => (isCenter===false? 'left' : 'center')};
    padding : 10px;
    `
export const Th = styled.th`
    border: 1px solid #333;
    text-transform: uppercase;
    padding : 15px ${({size})=>(size)} ;
    `
export const DeliveryNoteTitle = styled.h2`
    text-align : center;
    margin-bottom : 70px;
    text-transform : uppercase;
    `
export const DeliveryAddress = styled.h4`
    text-align : center;
    margin-bottom : 50px;
    `
export const DateContainer = styled.span`
    position : relative;
    top : 40px;
    left : 300px;
    `
export const Supplier = styled.span`
    position : relative;
    top : 100px;
    left : 300px;
    `
export const Client = styled.span`
    position : relative;
    top : 100px;
    left : 690px;
    `
export const Title = styled.h1`
    font-family : Apple Chancery;
    font-size : 40px;
    `
export const StyledH2 = styled.h2`
    font-family : Times New Roman;
    font-style : italic;
    font-size : ${({size})=> (size && size)}
    `
