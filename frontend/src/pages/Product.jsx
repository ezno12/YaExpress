import { FavoriteBorderOutlined,Favorite} from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../js/responsive";
import {useState, useEffect } from "react";
import { useLocation } from "react-router";
import {publicRequest} from "../js/request";
import { Link} from 'react-router-dom';
import {addProduct} from "../redux/cartRedux";
import {useDispatch} from "react-redux";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Menu from "../components/Menu"
import Spinner from "../components/Loader"
import { useSelector } from "react-redux";
import {deleteProd,addProd} from "../redux/cartRedux";
import { Images } from "../js/data";

const Container = styled.div`
position:relative;
`;

const Wrapper = styled.div`
  background: #dce8d3;
  border-radius: 5px;
  scroll-snap-align:start;
  width:270px;
  box-shadow: 5px 8px 7px #dfdfdf;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 30vh;
  object-fit: cover;
  
  ${mobile({ height: "29vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  align-items: center;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 100;
  margin: 10px 0px;
`;

const Fav = styled.h4`
  font-size:14px;
  position:absolute;
  display:flex;
  cursor: pointer;
  align-items: center;
  right:0;
  
  &:active > #d {
    transform: scale(1.1);
`;

const Desc = styled.p`
  left:10%;
  top:0;
  position:absolute;
  color:gray;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
`;

const Img = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;


const D = styled.div`
&:active {
  transform: scale(1.1);
}
`;


const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const cart = useSelector(state => state.cart)
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([])
  const [quantity, setquantity] = useState(1)
  const [color, setColor] = useState("")
  const [img, setImg] = useState('')
  const dispatch  = useDispatch()
  const [size, setSize] = useState("")
  const index=cart.wishlist.findIndex((prod) => prod.title === product.title);

  const handleQuantity=(type) => {
  if(type === "dec")
    quantity > 1 && setquantity(quantity-1)
  else
    setquantity(quantity+1)
  }
  
const handleClick= () =>{
  dispatch( 
    addProduct({...product, quantity, color, size }))
}


const handleBuy= () =>{
  dispatch( 
    addProduct({...product, quantity, color, size }))
  window.location.assign('/checkout')
}


useEffect(() => {
  const getProducts = async () =>{
    try{
    const respense = await publicRequest.get("http://localhost:5000/api/products/pop")
    setProducts(respense.data)
    }
    catch(err){
    }
  }
  getProducts();
},[])

useEffect(() => {
    const getproduct = async () => {
      try{
        const res = await publicRequest.get("/products/find/"+id);
        setProduct(res.data);
      }
      catch{
      }
    }
    getproduct();
      
  },[id])

  
  const handleMinus = () => {
    quantity>1 && setquantity(quantity-1);
    
  }
  const handlePlus = () => {
    setquantity(quantity+1);
  }

  const handleWish= () =>{
    dispatch( 
      addProd({...product, quantity, color, size}))
  }
  const handleDWish= () =>{
    dispatch( 
      deleteProd(product))
  }
  
return (
    <Container>
      <Announcement />
      <Navbar />
      <br /> 
      <Menu />
      
    <div>
      <div className="product-detail-container">
        <Img>
          <div className="image-container">
            <img src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9300011-NA-M65_PRO_RGB_BLK_04.png" className="product-detail-image" />
          </div>
        </Img>

        <div className="product-detail-desc">
          <h1>{product.title}</h1>
          <p style={{color:"#ffce00"}} className="price">{parseFloat(product?.price).toFixed(3)+"$"}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={handleMinus}>-</span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={handlePlus}>+</span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="buy-now" onClick={handleBuy}>Buy Now</button>
            <button type="button" className="add-to-cart" onClick={handleClick}>Add to Cart</button>
          </div>
        </div>
      </div>
      <div style={{paddingBottom: "4rem"}}>
          <h5 style={{padding:"10px"}}>Description:</h5>
          <hr />
          <p style={{left: "10%",position:"relative"}}>Quiet Wired Computer Keyboard, 104 Silent Keys, 26 Anti-Ghosting Keys, Spill Resistant, Multimedia Control for PC and Desktop</p>
          <hr style={{color:"white"}}/>
          </div>
    </div>
    <Footer/>
    </Container>
  );
};

export default Product;
