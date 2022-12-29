import {  Favorite } from "@material-ui/icons";
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
import {deleteProd} from "../redux/cartRedux";

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
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  visibility:hidden;
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
  justify-content: center;
  min-height: 400px;
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
  flex-direction: row-reverse;
  position:relative;
  left:-3%;
  justify-content: space-between;
}
`;

const P = styled.div`
  border: solid 0px black;
  display: flex;
  align-items: center;
  justify-content: center;

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

const Wishlist = () => {
  const cart = useSelector(state => state.cart)
  const [prods, setProducts] = useState(cart.wishlist);
  const dispatch  = useDispatch(); 


  return (
    <Container>
      <Announcement />
      <Navbar />
      <br />
      <Menu /> 
      <Wrapper>
        <Title>Wishlist</Title>
        <Top>
          <TopButton><Link to='/'>Continuer mes achats</Link></TopButton>
          <TopTexts>
            <Link to={'/cart'}><TopText>Shopping Bag({cart.products.length})</TopText></Link>
            <Link to={'/wishList'}><TopText>Your Wishlist ({prods.length})</TopText></Link>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
            {prods.length===0 ? 
       <P>wishList empty...</P> : <Info>{prods.map((product,index) => (   
       <Product>
              <ProductDetail>
                <Image src={product?.img} />
                <Details>
                  <ProductName>
                    <Link to={`/product/${product._id}`}><b>Produit:</b> {product?.title}</Link>
                  </ProductName>
                  <ProductId>
                    <b>Marque:</b> {product?.marque}
                  </ProductId>
                  <ProductId>
                    <b>Prix:</b> {product?.price-product?.remise}
                  </ProductId>
                  {product?.color && <ProductColor color={product?.color} />}
                  {product?.size && <ProductSize><b>Size:</b> {product?.size}</ProductSize>}
                </Details>
              </ProductDetail>
              <PriceDetail>
              <Favorite style={{cursor:"pointer",color:"#ff1a1a"}} onClick={()=>dispatch(deleteProd(product)) && setProducts(prods.filter(product => product._id !== prods[index]._id))}/>
              </PriceDetail>
            </Product>)) }
            <Hr />
          </Info> }
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Wishlist;
