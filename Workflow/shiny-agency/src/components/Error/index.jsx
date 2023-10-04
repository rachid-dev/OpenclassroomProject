import errorPicture from '../../assets/404.svg'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const FirstErrorMessage = styled.h1`
    position : relative;
    text-align : center;
    top : 100px;
`
const ErrorContainer = styled.div`
    background-color : ${colors.backgroundLight};
    margin-top : 50px;
    margin-left : 50px;
    margin-right: 50px;
`
const ErrorImg = styled.img`
    height : 700px;
    width: 600px;
    position : relative;
    left : 250px;
    
`
const SecondErrorMessage = styled.h1`
    position : relative;
    text-align : center;
    bottom : 100px;
`


function Error() {
    return (
        <ErrorContainer>
            <FirstErrorMessage>Oups...</FirstErrorMessage>
            <ErrorImg src={errorPicture} alt="error 404"/>
            <SecondErrorMessage>Il semblerait qu'il y ait un problème</SecondErrorMessage>
        </ErrorContainer>
    )
}
 
export default Error