import { useParams } from "react-router-dom"
import styled from 'styled-components'

const Table = styled.table`
    position : relative;
    left: 100px;
    border : 2px solid black;
    border-collapse : collapse;
    ` 

const Th = styled.th`
    font-family :Times New Roman;
    border: 1px solid #333;
    text-transform: uppercase;
    padding : 1px ${({size})=>(size)} ;
    `

const Td = styled.td`
    border-right: ${({right})=>(right===false?(';'):('1px solid #333;'))}
    ${({top})=>(top && 'border-top :1px solid #333;')}
    ${({bottom})=>(bottom && 'border-bottom :1px solid #333;')}
    text-align : center;
    padding : 10px;
    font-family :Times New Roman; 
    `
const H1 = styled.h1`
    font-family :Times New Roman;
    position : relative;
    left : 50px;`

const H2 = styled.h2`
    font-family :Times New Roman;
    position : relative;
    left : 100px;`

// const Div = styled.div`
//     position : relative;
//     left : 200px;
//     `

const DeliveryBill = () =>{
    const {results} = useParams()
    const {cart, clientName, deliveryDate, total} = JSON.parse(results)
    const emptyRows =[0,1,2,3,4,5,6,7,8,9,10,11,12]


    const [year, month, day] = deliveryDate.split('-')
    return(
        <div>
            <span>AGBERE ABDOUL RACHID MSAREY</span><br/>
            <span>BPE 2468    TOROKOROBOUGOU </span><br/>
            <span>BAMAKO - MALI </span><br/>
            <span>TEL 00223 79 02 50 02</span><br/><br/><br/>
            <H1>  FACTURE N° 01 CAFCLAS/03/2022 </H1><br/>
            <H2> DATE   02/03/2022</H2>
            {/* <Div> */}
                <span>DOIT:</span><br/><br/>
                <span>ONOMO HOTEL</span><br/>
                <span>QUARTIER DU FLEUVE</span><br/>
                <span> Adresse :                      BP           BAMAKO  - MALI</span><br/>
                <span> Tel/Fax :     00223 20 70 62 20</span><br/>
                <span> e-mail :</span><br/>

            {/* </Div> */}
            <span> REFERENCE : </span><br/><br/>
            <Table>
                    <thead>
                        <tr >
                            <Th size = "150px">DESIGNATION</Th>
                            <Th size = "10px">Quantité </Th>
                            <Th size = "10px" >P.U (fcfa)</Th>
                            <Th size = "40px">Montant (fcfa)</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(({id, description, amount, price}) => (
                                <tr key = {id}>
                                    <Td>{description}</Td>
                                    <Td>{amount}</Td>
                                    <Td>{price}</Td>
                                    <Td>{ new Intl.NumberFormat().format(parseInt(price.split(' ').join(''), 10) * amount) }</Td>
                                </tr>
                            ))
                        }
                        {
                          emptyRows.map(index => (
                              <tr key ={index}>
                                  {index===4 ?(<Td> LIVRES A {clientName}  / BL DU {day}/{month}/{year}</Td>):(<Td></Td>)}
                                  <Td></Td>
                                  <Td></Td>
                                  <Td></Td>
                              </tr>
                          ))  
                        }
                        <tr>
                            <Td top = {true} right={false}>  </Td>
                            <Td top = {true}>  </Td>
                            <Td top = {true} bottom = {true}> Montant (HT) </Td>
                            <Td top = {true} bottom = {true}> { new Intl.NumberFormat().format(total) } </Td>
                        </tr>
                        <tr>
                            <Td right={false} > Arrêté la présente facture à la somme de: </Td>
                            <Td>  </Td>
                            <Td top = {true} bottom = {true} >  </Td>
                            <Td top = {true} bottom = {true} >  </Td>
                        </tr>
                        <tr>
                            <Td right={false} > Quatre-Vingt-Six Mille Cinq Cents      Francs CFA </Td>
                            <Td>  </Td>
                            <Td top = {true} bottom = {true} >  </Td>
                            <Td top = {true} bottom = {true} >  </Td>
                        </tr>
                        <tr>
                            <Td right={false} > Paiement par virement faveur:</Td>
                            <Td>  </Td>
                            <Td>  </Td>
                            <Td>  </Td>
                        </tr>
                        <tr>
                            <Td right={false} > compte : AGBERE ABDOUL RACHID MSAREY N° 861502262401 -13  chez ECOBANK Mali            </Td>
                            <Td>  </Td>
                            <Td top = {true} > Total a payer </Td>
                            <Td top = {true} > { new Intl.NumberFormat().format(total) } </Td>
                        </tr>
                        
                    </tbody>
                </Table>

        </div>
    )
}

export default DeliveryBill