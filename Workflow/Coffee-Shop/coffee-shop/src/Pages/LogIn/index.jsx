import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { userDataContext } from '../../utils/Context'

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
const LogIn = () => {

    const {setUserData} = useContext(userDataContext)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const send = (e) =>{
        e.preventDefault()
        fetch('http://localhost:4000/auth/login', {
            method : 'POST',
            headers : {'accept' : 'Application/json', 'content-type' : 'Application/json'},
            body : JSON.stringify({
                email,
                password
            })
        })
        .then( res => res.json())
        .then(data => {
            if (data.userId){
                setUserData({...data, isLoggedIn : true})
                sessionStorage.setItem('userData', JSON.stringify({...data, isLoggedIn : true}));
                navigate('/')
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

            <Form onSubmit = {send} >
                    <label> email </label> <Input left = {'25px'} type={'email'} value={email} onChange = {(e) => setEmail(e.target.value)} /> <br/><br/>
                    <label> password </label> <Input left = {'10px'} type={'password'} value={password} onChange = {e => setPassword(e.target.value)} /><br/><br/>
                    <Input left={'16px'} type={'submit'} value='Se connecter' /> <br/> <br/>
                    <Link to= '/signup'> Vous n'avez pas de compte ? </Link>
                    <span>{ errorMessage }</span>
            </Form>
            
        </div>
    )
}

export default LogIn;