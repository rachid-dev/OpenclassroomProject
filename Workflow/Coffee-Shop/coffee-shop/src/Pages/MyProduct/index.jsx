import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../../utils/Context";

const StyledForm = styled.form`
    width : 400px;
    border : 1px solid black;
    margin: 100px;
    padding : 50px;
    align-items : left;
    display : flex;
    flex-direction : column;
    `

const Img = styled.img`
    height: 250px;
    width: 250px;
    border-radius: 20px;
    `
const Label = styled.label`
    margin-right : 50px;
    `
const Div = styled.div`
    margin-bottom : 30px;
    `
const DeleteButton = styled.button`
    position : relative;
    left : 140px;
    `


const MyProduct = () => {

    const {userData} = useContext(userDataContext)
    const navigate = useNavigate()
    const [name, setNameValue] = useState('')
    const [price, setPriceValue] = useState(0)
    const [description, setDescriptionValue] = useState('')
    const [image, setImage] = useState({ preview :{ src :'', alt:''}, data:'' })

    const {id} = useParams()

    // get the product we want to modify
    useEffect(() => {

        async function fetchData(){
            try {
                const response = await fetch(`http://localhost:4000/product/${id}`,{
                    method : 'GET',
                    headers : { Authorization : `Bearer ${userData.token}`}
                })
                const product = await response.json()
                setNameValue(product.name)
                setPriceValue(product.price)
                setDescriptionValue(product.description)
                const img = {
                    preview : {
                        src : product.picture,
                        alt : product.name
                    },
                    data : ''
                }
                setImage(img)
            } catch (error) {
                console.log(error);
            }
        }fetchData()
    },[id, userData])


    const uploadImage = () => {
        const imgInp = document.getElementById('imgInp')
        imgInp.click()       
    }


    const handleImageUploading = (e) => {
        const uploadedImg = e.target.files[0]
        if (uploadedImg) {
            const img = {
                preview : {
                    src : URL.createObjectURL(uploadedImg),
                    alt : uploadedImg.name
                },
                data : uploadedImg
            }
            setImage(img)
        }
    }


    //submit function
    const sendData = (e,method) => {
        e.preventDefault()
        const product = {
            userId : userData.userId,
            id,
            name,
            price,
            description,
            amount : 0
        }
    
        const formData = new FormData()
        formData.append('image', image.data)
        formData.append('product',JSON.stringify(product))

        fetch(`http://localhost:4000/product/${id}`,{
            method : method,
            headers : { Authorization : `Bearer ${userData.token}`},
            body :  formData
        })
        .then(res => res.json())
        .then(data => {
            navigate('/')
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <Header />
            <StyledForm id="form" onSubmit={(e) => sendData(e,'PUT') } >
                <Label htmlFor="name"> Nom du Produit </Label>
                    <input id="name" type={'text'} value={name} onChange={(e)=> setNameValue(e.target.value)} /><br/>

                <Div id='image-input-container'>
                    <button type="button"  onClick={ uploadImage } > Modifier Image </button>
                    <input id="imgInp" onChange={ handleImageUploading }  type= {'file'} accept='image/*'  hidden/><br />
                    {image.preview.src && <Img src={image.preview.src} alt={image.preview.alt} />}
                        
                </Div>

                <Label htmlFor="price"> Prix (FCFA) </Label>
                    <input id="price" type={'number'} value={price} onChange={(e)=> setPriceValue(e.target.value && parseInt( e.target.value, 10) )} min='400' max = '100000'/> <br/>

                <Label htmlFor="description"> Description </Label>
                    <textarea rows={'7'} id="description" value={description} onChange={(e)=> setDescriptionValue(e.target.value)} > </textarea><br /><br/>
                <div>
                    <input type={'submit'} value={'Enregistrer les modifications'}/>
                    <DeleteButton  onClick={ (e) => sendData(e,'DELETE') } > Supprimer </DeleteButton>
                </div>
                 
            </StyledForm>
        </div>

    )
}

export default MyProduct;