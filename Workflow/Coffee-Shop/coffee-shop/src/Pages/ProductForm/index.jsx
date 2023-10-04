import { useState, useContext } from "react";

import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../../utils/Context";
import { StyledForm, Label, Div, Img } from "./style";



const ProductForm = () => {
    const {userData} = useContext(userDataContext)
    const navigate = useNavigate()
    const [name, setNameValue] = useState('')
    const [price, setPriceValue] = useState(0)
    const [description, setDescriptionValue] = useState('')
    const [image, setImage] = useState({ preview :{ src :'', alt:''}, data:'' })
    
    const uploadImage = () => {
        const imgInp = document.getElementById('imgInp')
        imgInp.click()       
    }

    const handleImageUploading = (e) => {
        const uploadedImg = e.target.files[0];
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
    const sendData = (e) => {

        e.preventDefault();
        const product = {
            userId : userData.userId,
            name,
            price,
            description,
            amount : 0
        }
        
        const formData = new FormData()
        formData.append('image', image.data)
        formData.append('product',JSON.stringify(product))

        fetch(`http://localhost:4000/product`,{
            method : 'POST',
            headers : { Authorization : `Bearer ${userData.token}`},
            body :  formData
        })
        .then(res =>{ 
            return res.json()})
        .then(data => {
            navigate('/')
            console.log(data)
        })
        .catch(err => {
            console.log(err);
            const span = document.createElement('span')
            const newContent = document.createTextNode(err)
            span.appendChild(newContent)
        })
    }

    return (
        <div>

            <Header />
            <StyledForm id="form" >

                <Label htmlFor="name"> Nom du Produit </Label>
                    <input id="name" type={'text'} value={name} onChange={(e)=> setNameValue(e.target.value)} /><br/>

                <Div id='image-input-container'>
                    <button type="button"  onClick={ uploadImage } > Ajouter Image </button>
                    <input id="imgInp" onChange={ handleImageUploading }  type= {'file'} accept='image/*' hidden /><br />
                    {image.preview.src && <Img src={image.preview.src} alt={image.preview.alt} />}
                        
                </Div>

                <Label htmlFor="price"> Prix (FCFA) </Label>
                    <input id="price" type={'number'} value={price} onChange={(e)=> setPriceValue(e.target.value && parseInt( e.target.value, 10))} min='400' max = '100000'/> <br/>

                <Label htmlFor="description"> Description </Label>
                    <textarea rows={'7'} id="description" value={description} onChange={(e)=> setDescriptionValue(e.target.value)} > </textarea><br /><br/>
                <div>
                    <button onClick={sendData}> Valider</button>
                </div>
                 
            </StyledForm>
        </div>
        )
}
export default ProductForm;