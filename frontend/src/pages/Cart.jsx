import { Add, Remove, Delete } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../js/responsive";
import {useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Menu from "../components/Menu"
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteProduct, minusQuantity, plusQuantity} from "../redux/cartRedux";
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import {publicRequest} from "../js/request";
import { Hidden } from "@material-ui/core";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  visibility: hidden;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom:solid 1px lightgray;
  border-top:solid 1px lightgray;
  border-radius:20px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  width:100%;
  margin-top: 10px ;
  padding: 14px;
  border-radius: 10px;

  ${mobile({ padding: "8px" })}
`;


const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position:relative;
  justify-content: space-between;
}
`;

const ProductAmountContainer = styled.div`
  border: solid 0px black;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
padding-left: 10px;
padding-right: 10px;
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "0px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: auto;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ffce00;
  color: white;
  border: none;
  font-weight: 600;
  cursor:pointer;
  &:hover {
    background-color: #e9bd03;
  }
`;
const P = styled.div`
  border: solid 0px black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const user = localStorage.getItem('user');
  var priceTotal = 0
  const [products, setProducts] = useState(cart.products);
  const [Promo,setPromo]=useState('')
  const [res,setResp]=useState({})
  const dispatch  = useDispatch(); 
  products.map((product) => (
    priceTotal += (product.price-product.remise)* product.quantity
  ))
  console.log(cart)



  useEffect(() => {
    const getproduct = async () => {
      try{
        const res = await publicRequest.get(`http://localhost:5000/api/codepromo/find/${Promo}`);
        setResp(res.data);
      }
      catch{
      }
    }
    getproduct();
      
  })

  const handleCheckout=()=>{
    Swal.fire({
      title: 'Contact us for Help',
      text:'Connect or Go as a Guest to Confirm your Order',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'Canncel',
      confirmButtonText: 'login',
      denyButtonText: `Guest`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace("/login")
      } else if (result.isDenied) {
        window.location.replace("/checkout")
      }
    })
  }



  return (
    <Container>
      <Announcement />
      <Navbar />
      <br />
      <Menu /> 
      <Wrapper>
        <Title> Shopping Cart</Title>
        <Top>
          <TopButton></TopButton>
          <TopTexts>
            <Link to={'/cart'}><TopText>Bag({products.length})</TopText></Link>
            <Link to={'/wishlist'}><TopText>Wishlist ({cart.wishlist.length})</TopText></Link>
          </TopTexts>
          {cart.products.length? <div>{user? <Link to={'/Checkout'}><Button>CHECKOUT NOW</Button></Link>
                                        :<Button onClick={handleCheckout}>CHECKOUT NOW</Button>}</div>
            :<TopButton onClick={()=>swal("No order Yet...","Go to shopping",'warning')} type="filled">CHECKOUT NOW</TopButton>}
        </Top>
        <Bottom>
        {cart.products.length===0 ? <Info><P>No order yet...</P></Info>:<Info>
       { cart.products.map((product,index) =>(
       <Product key={product._id}>
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
                  {product?.color && <ProductColor color={product?.color} />}
                  {product?.size && 
                  <ProductSize>
                    <b>Size:</b> {product?.size}
                  </ProductSize>}
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                <Remove style={{cursor:"pointer"}} onClick={() =>dispatch(minusQuantity(product))}/>
                  <ProductAmount>{product?.quantity}</ProductAmount>
                 <Add style={{cursor:'pointer'}} onClick={() => dispatch(plusQuantity(product))}/>
                </ProductAmountContainer>
                <ProductPrice>{(product?.price-product?.remise)*product?.quantity+ "$"}</ProductPrice>
                <div style={{cursor:"pointer"}} onClick={()=>{dispatch(deleteProduct(product)) && setProducts(products.filter(product => product._id !== products[index]._id))}}>
                <Delete/>
                </div>
              </PriceDetail>
            </Product>)) }
            <Hr />
          </Info>}
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.totalPrice} $</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>shipping fees</SummaryItemText>
              <SummaryItemPrice>{cart.totalPrice < 100 && cart.totalPrice >0 ? 10+" " : 0+" " }$</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.totalPrice < 100 && cart.totalPrice >0 ? cart.totalPrice+10+" " : cart.totalPrice+" " }$</SummaryItemPrice>
            </SummaryItem>
            
            {cart.products.length? <div>{user? <Link to={'/Checkout'}><Button>CHECKOUT NOW</Button></Link>
                                        :<Button onClick={handleCheckout}>CHECKOUT NOW</Button>}</div>
                  :<Button onClick={()=>swal("No order Yet...","Go to shopping",'warning')}>CHECKOUT NOW</Button>}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
