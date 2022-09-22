import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, Sync } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../js/responsive";
import { Link,useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState,useEffect } from "react";
import {publicRequest} from "../js/request";
const logo = require('../assets/logo.png')



const Container = styled.div`
  height: 3.75rem;
  position:relative;
  ${mobile({ height: "2.5rem" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  border-radius: 50px;
  overflow: hidden;
`;

const Input = styled.input`
  min-width:50px;
  border: none;
  border-radius: 50px;
  padding-left:12px;
  height:30px;
  &::placeholder {
    font-size:15px;
    padding-left:10px;
  }
  &:focus-visible + #result{

  }
  ${mobile({ width: "100px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.img`
  max-height: 60px;
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Ul = styled.ul`
  position:absolute;
  top: 46px;
  left: 35px;
  background-color: #ebe9e9;
  min-width: 160px;
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2);
  border-radius:10px;
  z-index: 999;
  list-style: none;
  max-height: 100px;
  display: block;
  
  ${mobile({ top: "42px", left: "0px","min-width": "130px" })}
`;

const Li = styled.li`
color: black;
padding: 12px 16px;
text-decoration: none;
border-radius:10px;
&:hover {
  background: whitesmoke;
}
${mobile({ "font-size":"10px" })}
`;

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [search,setSearch]=useState("");
  const cart = useSelector(state => state.cart)
  const [products,setProducts]=useState([]);
  const [prod,setProd]=useState([]);
  const [exist,setExist]=useState([]);



  useEffect(() => {
    const getCart = async () =>{
      try{
      const res = await axios.get("http://localhost:5000/api/carts/find/"+user._id,
      {
        headers: {
          'Authorization': `Basic ${user.token}` 
        }
      })
      if((res).data.userId){setExist((res).data)}
      }
      catch(err){
      }
    }
    getCart();
  },[])


  useEffect(() => {
    const getProducts = async () =>{
      try{
      const respense = await axios.get("http://localhost:5000/api/products")
      setProducts(respense.data)
      }
      catch(err){
      }
    }
    getProducts();
  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if(e.target.value!==""){
    setProd(products.filter((item)=>item.title.toLowerCase().startsWith(e.target.value)));}
    else setProd([]);
  }
  
  const handleDeconnexion = async () => {
    try{
      if(exist){
        const res = await axios.put("http://localhost:5000/api/carts/"+exist._id, {
          userId:user._id,
          products:cart.products.map(({_id, qnatity})=>({productId:_id,quantity:qnatity})),
          wishlist:cart.wishlist.map(({_id})=>({productId:_id}))
        },
          {
            headers: {
              'Authorization': `Basic ${user.token}` 
            }
          }
        )
      }
      else {
        const res = await axios.post("http://localhost:5000/api/carts/", {
          userId:user._id,
          products:cart.products.map(({_id, qnatity})=>({productId:_id,quantity:qnatity})),
          wishlist:cart.wishlist.map(({_id})=>({productId:_id}))
        },
          {
            headers: {
              'Authorization': `Basic ${user.token}` 
            }
          }
        )
      }
    }
    catch{
      console.log("Error")
    }
    localStorage.clear();
    window.location.reload();
  }

  const handleClick = () => {
    let searchProd=[];
    if(search!==""){
      searchProd=products.filter((item)=>item.title.toLowerCase().startsWith(search) 
        && item.marque.toLowerCase().startsWith(search) 
        && item.sous_cat.toLowerCase().startsWith(search));
    }
    return(<div><Link to='/'></Link>
      {/* {searchProd===[] ? <div><p>Nothing...</p></div>:<div>{searchProd.map((item) =>{<Product item={item} key={item.id} />})}</div>} */}</div>)
  }


  return (
    <Container>
      <Wrapper>
      <Link to={'/'}><Logo src={logo} alt="logo"></Logo></Link>
        <Right>
        <SearchContainer>
            <Input placeholder="Search" onChange={handleSearch} />
            <Search style={{ color: "black", fontSize: 23, cursor:"pointer" }}  onClick={handleClick} />
          </SearchContainer>
          <Ul id="result">{prod.map((item) =>
              <Link to={`/product/${item._id}`}><Li>{item.title}<br/></Li></Link>
            )}</Ul>
            {user ? <MenuItem><Link onClick={handleDeconnexion}>Signed Out</Link></MenuItem>:<MenuItem><Link to={'/login'}>Login</Link></MenuItem>}
            <MenuItem><Link to={'/register'}>Sign up</Link></MenuItem>
          <MenuItem>
          <Link to={'/cart'}>
            <Badge badgeContent={cart.quantity} color={"primary"}>
              <ShoppingCartOutlined />
            </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
