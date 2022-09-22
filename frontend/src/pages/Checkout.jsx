import styled from "styled-components";
import {mobile} from "../js/responsive";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


const Container = styled.div`
`;


const Check=styled.div`
margin-top:30px;
height: auto;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
${mobile({display: "flex","flex-direction": "column-reverse"})}
`;

const Divv =styled.div`
width:60%; 
height: 100%;
display:flex;
justify-content: center;
`;

const Title=styled.div`
font-size: 3rem;
font-weight: 500;
text-transform: uppercase;
text-shadow: 2px 2px 8px black;
Color: #ffce00;
${mobile({"font-size": "15px", margin:"0 auto 0px"})}
`;

const Subtitle=styled.div`
margin-top: 2rem;
margin-bottom:10px;
color: #ffce00;
font-weight: blod;
font-size: 16px; 
font-weight: 500;
${mobile({"font-size": "12px", margin:"0 auto 0px"})}
`;

const Wrapper = styled.div`
  width: 80%; 
  border-radius: 10px;
  padding: 0px;
  border-circle:20px;
  top:20px;
  position:relative;

  ${mobile({ width: "75%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  width:100%;
  margin: 10px 0;
  padding: 19px;
  ;

  ${mobile({ padding: "8px" })}
`;

const Button = styled.button`
margin-top: 1rem;
margin-bottom: 4rem;
width: 40%;
position: relative;
display: inline-block;
background: black;
color: white;
border: none;
border-radius: 0;
padding: 1.25rem 2.5rem;
font-size: 1rem;
font-weight: bold;
text-transform: uppercase;
cursor: pointer;
transform: translateZ(0);
transition: color 0.3s ease;
letter-spacing: 0.0625rem;
&:hover {
  &::before {
    transform: scaleX(1);
  }
}
&::before {
  position: absolute;
  content: '';
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffce00;
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.3s ease-out;
}
  ${mobile({ padding: "8px", "font-size":"10px", })}

`;

const Link1 = styled.a`
  margin: auto;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({ "font-size": "9px" })}
`;


const Order = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  background-color:#f4f4f4;
  padding: 20px;
  height: 100%;
  max-width:360px;
  min-height:800px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  margin: 2rem 0;
`;

const SummaryItem = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "22px"};
`;

const SummaryItemText = styled.span`
`;

const SummaryItemPrice = styled.span``;

const Prods = styled.div`
  width: 100%;
  padding: 10px;
`;
const Prod = styled.div`
  width: 100%;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
  height:100px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;;
`;

const ProductName = styled.span`
font-size:12px;
`;

const ProductId = styled.span`
font-size:12px;

`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  font-size:12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
font-size:12px;
`;
const Div = styled.div`
  display: flex;
  font-size:12px;
  border-radius: 50%;
  position:relative;
`;

const Checkout = () => {
  const cart = useSelector(state => state.cart)
  const user = JSON.parse(localStorage.getItem('user'));
  const [order,setOrder]=useState({
    userId:user? user._id:"",
    products:cart.products,
    ville :"",
    amount:cart.promoPrice? cart.promoPrice:cart.totalPrice,
    address: {
      street:"",
      state:"",
      zip:0
    },
    phoneNumber: 0,
  })
  
  const handleOrder= () =>{
    try{
      const res = axios.post("http://localhost:5000/api/orders", order);
      console.log(res);
    }
    catch{
      console.log("Error")
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
   
  return (
    <Container>
      <Announcement />
      <Navbar />
      <br /> 
      <Menu />  

      <Check>
    {cart.products.length ? <Order>
    <Title>Order Checkout</Title>  
      <Wrapper>
        <Form>
          <Subtitle>Shipping Information</Subtitle>
          {!user && <div><Input placeholder="First Name" required/>
          <Input placeholder="Last Name" required/></div>}
          <Input placeholder="City" required onChange={(e)=>setOrder({...order, ville:e.target.value})}/>
          <Input placeholder="Street" required onChange={(e)=>setOrder({...order, address:{...order.address, street:e.target.value}})}/>
          <Div>
          <Input style={{marginRight:'10px'}} placeholder="State" required onChange={(e)=>setOrder({...order, address:{...order.address, state:e.target.value}})}/>
          <Input type="number" placeholder="Zip Code" required onChange={(e)=>setOrder({...order, address:{...order.address, zip:e.target.value}})}/>
          </Div>
          <Subtitle>Contact Information</Subtitle>
          <Input type="email" placeholder="Email" />
          <Input type="tel" placeholder="Phone Number" required onChange={(e)=>setOrder({...order, phoneNumber:e.target.value})}/>
          <Button onClick={handleOrder}>Confirm Order</Button>
        </Form>
      </Wrapper>
      </Order>:<Divv>No Order yet...</Divv>}
      <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            
            {cart.products.length?
            <Prods>
                {cart.products.map((product)=>(
                    <Prod>
                        <ProductDetail>
                <Image src={product?.img} />
                <Details>
                  <ProductName>
                  <Link to={`/product/${product._id}`}><b>Product:</b> {product?.title}</Link>
                  </ProductName>
                  <ProductId>
                    <b>Brand:</b> {product?.brand}
                  </ProductId>
                  <ProductId>
                    <b>Price:</b> {product?.price-product?.remise}$
                  </ProductId>
                  <ProductId>
                    <b>Quantity:</b> {product?.quantity}
                  </ProductId>
                  {product?.color && <ProductColor color={product?.color} />}
                  {product?.size && 
                  <ProductSize>
                    <b>Size:</b> {product?.size}
                  </ProductSize>}
                </Details>
              </ProductDetail>
                    </Prod>))}
            </Prods>:<div></div>}
            <SummaryItem>
              <SummaryItemText>Products total</SummaryItemText>
              <SummaryItemPrice>{cart.totalPrice+ "$"}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping fees</SummaryItemText>
              <SummaryItemPrice>{cart.totalPrice < 100 && cart.totalPrice >0 ? '10$' : 'gratuit' }</SummaryItemPrice>
            </SummaryItem>
            <hr style={{color:'lightgray',background:'lightgray', margin: " 1.5rem 0"}} />
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              {cart.promoPrice!==0 ? <SummaryItemPrice><sup style={{fontSize:"9px"}}>Promo</sup>{cart.promoPrice < 100 && cart.promoPrice >0 ? cart.promoPrice+10+" " : cart.promoPrice+" " }$</SummaryItemPrice>
              :<SummaryItemPrice>{cart.totalPrice < 100 && cart.totalPrice >0 ? cart.totalPrice+10+" " : cart.totalPrice+" " }$</SummaryItemPrice>}
            </SummaryItem>
          </Summary>
          </Check>
      <Footer/>
      
    </Container>
  );
};

export default Checkout;
