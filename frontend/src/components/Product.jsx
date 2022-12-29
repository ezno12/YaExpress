import styled from "styled-components";
import {publicRequest} from "../js/request";
import { useState, useEffect } from "react";
import { mobile } from "../js/responsive";
import {addProduct, addProd, deleteProd} from "../redux/cartRedux";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link} from 'react-router-dom';
import {
  Favorite,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

/* Card New Style */

const Container = styled.div`
  margin: 2rem;
  min-width:300px;
  max-width: 400px;
  height: 450px;
  min-height:200px;
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  position: relative;
  ${mobile({ height:"200px" ,"min-width":"150px","max-width":"150px", width:"150px" })}
`;

const Buy = styled.a`
  position: relative;
  top: 100px;
  opacity: 0;
  padding: 10px 30px;
  margin-top: 15px;
  color: #000000;
  text-decoration: none;
  background: #ffce00;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    color: white;
  }
`
const Card = styled.div`
  position: relative;
  width: 320px;
  height: 480px;
  background: #191919;
  border-radius: 20px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    width: 100%;
    height: 100%;
    background: #ffce00;
    transform: skewY(345deg);
    transition: 0.5s;
  }
  &:hover::before {
    top: -70%;
    transform: skewY(390deg);
  }
  &::after {
    content: "Ya Express";
    position: absolute;
    bottom: 0;
    left: 0;
    font-weight: 600;
    font-size: 5.5rem;
    color: rgba(0, 0, 0, 0.1);
  }
  &:hover {
    top: 0;
    opacity: 1;
  }
  &:hover ${Buy} {
    top: 0;
    opacity: 1;
  }
`

const ImgBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  z-index: 1;
`
const ProdImg = styled.img`
  height: 300px;
  width: auto;
`
const ContentBox = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
`
const ProdTitle = styled.h3`
  font-size: 18px;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`
const Price = styled.h2`
  font-size: 24px;
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
`

const Icon = styled.div`
  z-index: 3;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  right:0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  transition: all 0.5s ease;
  background-color: black;
    opacity: 0.8;
  
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
  &:active > #Fa {
    transform: scale(1.1);
  }
  ${mobile({   width: "5px",height: "5px",margin: "15px" })}
`;


const Product = ({ item }) => {

  const cart = useSelector(state => state.cart)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const dispatch  = useDispatch()
  const [size, setSize] = useState("")

  const index=cart.wishlist.findIndex((prod) => prod.title === item.title);
  
  const handleClick= () =>{
    dispatch( 
      addProduct({...item, quantity, color, size }))
    window.location.assign('/checkout')
  }
  const handleWish= () =>{
    dispatch( 
      addProd({...item, quantity, color, size}))
  }
  const handleDWish= () =>{
    dispatch( 
      deleteProd(item))
  }

  return (
    <Container>
    <Card>
      {index>=0 ? <Icon><Favorite id="Fa" style={{color:'#ffce00'}} onClick={handleDWish}/></Icon>:<Icon><FavoriteBorderOutlined id="Fa" style={{color:'#ffce00'}} onClick={handleWish}/></Icon>}
      <Link to={`/product/${item._id}`}>
      <ImgBox>
        <ProdImg src={item.img}></ProdImg>
      </ImgBox>
      </Link>

      <ContentBox>
      <Link to={`/product/${item._id}`}><ProdTitle>{item.title}</ProdTitle></Link>
        <Price>{item.price}$</Price>
        <Buy onClick={handleClick}>Buy Now</Buy> 
      </ContentBox>
    </Card>
    </Container>
  );
};

export default Product;
