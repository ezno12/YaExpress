import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../js/responsive";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu"
import { Button, Slider } from "@material-ui/core";
import Spinner from "../components/Loader";
import { useLayoutEffect } from "react";


const Container = styled.div`
`;

const Title = styled.h1`
    font-size: 25px;
    margin-bottom: 15px;
    text-align: center;
    ${mobile({ "font-size": "16px", "margin-bottom": "0px"})}   
`;
const Block = styled.div`
    background: #ebf8e2;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    padding: 0;
    border-radius: 10px;
    ${mobile({ width:"auto" })}  
}
`;
const FilterContainer = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  display:block;
  float:right;
  ${mobile({ display:"none"})}
`;

const Filter = styled.div`
  margin:15px;
  ${mobile({ margin:"5px",width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  padding: 10px;
  border-radius: 10px;
  color: teal;
  font-size: 18px;
  font-weight: 500;
  margin-right: 20px;
  ${mobile({ marginRight: "0px", "font-size": "8px"})}
`;

const Select = styled.select`
padding: 10px;
margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const P = styled.p`
  width: 100%;
  text-align: center;
  margin-top:10px;
  ${mobile({ "font-size": "8px", "margin-top": "0px"})}
`;
const Ul = styled.ul``;
const Li = styled.li`
  width: 100%;
  padding: 10px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${mobile({ "font-size": "8px", padding: "5px"})}
`;
const D =styled.div`
  width: 100%;
  margin-top: 10px;
  ${mobile({ "margin-top": "0px"})}
`;

const Prod =styled.div`
display:flex;
flex-direction: column;
`;

const Prods =styled.div`
  width: 100%;
  position:relative;
  display:flex;
  justify-content: center;

`;

const Butt =styled.button`
display:none;
${mobile({
  display:"block",
position: "relative",
right:"0",
"text-align": "center",
width:"35%",
height:"30px",
border: "solid 0px",
cursor:"pointer",
"background-color":"white",
})}
&:focus + #sidebarMenu {
  ${mobile({  transition: "all 0.3s", "box-sizing": "border-box", transform: "translateX(6%)"})}
}
`;


const INPUT =styled.input`
    margin-right: 3px;
    display: inline-block;
    width: 0.9375rem;
    height: 0.9375rem;
    vertical-align: middle;
    cursor: pointer;
    border: 2px solid #232323;
    ${mobile({ width: "0.7375rem", height: "0.7375rem" })}
`;

const Div =styled.div`
display:none;
${mobile({
  display: "inline-block",
  height: "auto",
  position: "absolute",
  left: "1",
  width: "120px",
  "margin-top": "30px",
  transform: "translateX(-250px)",
  transition: "transform 250ms ease-in-out",
  "z-index":"9"
  
})}
&:hover {
  ${mobile({  transition: "all 0.3s", "box-sizing": "border-box", transform: "translateX(6%)"})}
}

`;



const Brand = () => {
  
  const location = useLocation();
  const Brand = location.pathname.split("/")[3]
  const [filter,setFilter] = useState({})
  const [prod,setProducts] = useState([])
  const [marq,setBrand]=useState([])
  const [remise,setRemise] = useState([])
  const [maxx,setMax]=useState(100)
  const [sort,setSort] = useState([0,maxx])

  useEffect(() => {
    const getProducts = async () =>{
      try{
        const res = await axios.get( Brand ? `http://localhost:5000/api/products/Brand?marq=${Brand}` : "http://localhost:5000/api/products")
      setBrand(res.data)
      console.log(marq);
      }
      catch(err){
      }
    }
    getProducts();
  },[Brand])


const copy = Brand.slice();
const co = Brand.replace(/-/g, " ");
const char = co[0];
const replaced = co.replace(char, char.toUpperCase());
console.log(filter)

  return (
    <Container>
       <Announcement />
      <Navbar />
      <br /> 
      <Menu />
      <Prod>
        <Title>List of products by brand {Brand}</Title>
      <Prods>
      <Products cat={"Brand"} Brand={Brand}/>
      </Prods>
      </Prod>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Brand;
