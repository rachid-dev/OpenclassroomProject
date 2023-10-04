import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Title = styled.h1`
    text-align : center;
    `

const HeaderContainer = styled.div`
    display : block flow;
    border-bottom : 2px solid black ;
    padding : 20px;
    `
const Form = styled.form`
    // border : 1px solid black; 
    text-align : center;
    padding-top : 50px;
    padding-bottom : 50px;
    padding-right : 500px;
    padding-left : 500px;
    `

const Input = styled.input`
    position : relative;
    left : ${({left}) => left}
    `
const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const send = (e) =>{
        e.preventDefault()
        fetch('http://localhost:4000/auth/signup', {
            method : 'POST',
            headers : {'Accept' : 'Application/json', 'Content-Type' : 'Application/json'},
            body : JSON.stringify({
                email,
                password
            })
        })
        .then( res => res.json())
        .then(data => {
            if (data.message){
                navigate('/login')
                //console.log(data)
            }
            else{
                setErrorMessage(data.error)
            }
        })
        .catch(err => console.log(err))
    }
    return(
        <div>
            <HeaderContainer>
                <Title>
                    My Market
                </Title>
            </HeaderContainer>

            <Form id = 'form' onSubmit = {send} >
                    <label> email </label> <Input left = {'25px'} value={email}  type={'email'} onChange = {(e) => setEmail(e.target.value)} /> <br/><br/>
                    <label> password </label>  <Input left = {'10px'} value={password} type={'password'} onChange = {e => setPassword(e.target.value)} /><br/><br/>
                    <Input left={'16px'} type={'submit'} value="S'inscrire" /> <br/> <br/>
                    <Link to= '/login'> Vous avez déjà un compte ? </Link> <br/> <br/>
                    <span>{ errorMessage }</span>
                    
            </Form>

        </div>
    )
}

export default SignUp;

