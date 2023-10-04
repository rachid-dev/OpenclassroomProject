import styled from 'styled-components';
import Cart from '../../Components/Cart';
import ShoppingList from '../../Components/ShoppingList';
import { useContext, useState } from 'react';
import { cartContext } from '../../utils/Context';
import Header from '../../Components/Header'


const HomeContainer = styled.div`
  display : ${({isOpen}) => (isOpen ? 'flex':'')};
  `
const convertMonthToNumber = (valueToConvert) => {
  const monthsInLetter = ['Jan','Feb','Mar','Apr','May','Jun',
                             'Jul','Aug','Sep','Oct','Nov','Dec']

  const monthsInNumber = ['01','02','03','04','05','06',
                             'O7','08','09','10','11','12']
  for (let index = 0; index < monthsInLetter.length; index++) {
      if ( monthsInLetter[index]===valueToConvert ){
          return monthsInNumber[index]
      }
           
  }
}
const [monthInLetter, day, year] = Date().substring(4,15).split(' ')
const month = convertMonthToNumber(monthInLetter)


function Home() {

  const { isOpen } = useContext(cartContext)
  const [clientName, setClientName] = useState('HOTEL ONOMO')
  const [deliveryDate, setDeliveryDate] = useState(`${year}-${month}-${day}`)
  const [deliveryNumber, setDeliveryNumber] = useState('0001')
  
  

  
  


  
  return (
    <div>
      <Header />
      <HomeContainer isOpen = { isOpen } >
        <Cart clientName ={clientName} deliveryDate={deliveryDate} deliveryNumber = {deliveryNumber} />
        <ShoppingList setClientName ={setClientName} setDeliveryDate={setDeliveryDate} setDeliveryNumber = {setDeliveryNumber} />
      </HomeContainer>
    </div>

  );
}

export default Home;
