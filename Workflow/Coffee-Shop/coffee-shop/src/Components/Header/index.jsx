import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { userDataContext } from '../../utils/Context';

const Title = styled.h1`
    text-align : center;
    `
const HeaderContainer = styled.div`
    display : block flow;
    border-bottom : 2px solid black ;
    padding : 20px;
    
    `
const StyledLink = styled(Link)`
    padding: 10px 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    text-align: center;
    `

const NavContainer = styled.nav`
    padding: 3px;
    position : realtive;
    text-align : right;
    justify-content: space-between;
    align-items: center;
  `

const Header = () => {

    const {setUserData} = useContext(userDataContext);

    const logout = () => {
        setUserData({isLoggedIn : false});
        sessionStorage.clear();
    }

    return (
        <HeaderContainer>
            <Title>
                My Market
            </Title>
            <NavContainer>
                <StyledLink to='/' > Acceuil </StyledLink>
                <StyledLink to='/createProduct' > Ajouter un Produit </StyledLink>
                <button onClick={logout}> Déconnexion </button>

            </NavContainer>
        </HeaderContainer>
    )
}

export default Header