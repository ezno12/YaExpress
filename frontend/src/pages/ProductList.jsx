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



const ProductList = () => {
  
  const location = useLocation();
  const categories = location.pathname.split("/")[2]
  const [filter,setFilter] = useState({})
  const [marque,setMarque] = useState([])
  const [prod,setProducts] = useState([])
  const [cat,setCat]=useState([])
  const [sous_cat,setSous_cat] = useState([])
  const [maxx,setMax]=useState(100)
  const [sort,setSort] = useState([0,maxx])
  
  
  const  baseURLMarque = 'http://localhost:5000/api/brand'
  const  baseURLSous_cat = 'http://localhost:5000/api/products/sous_cat?category='+categories
  const  baseURLProducts = 'http://localhost:5000/api/products'


  useEffect(() => {
    const getProducts = async () =>{
      try{
        const res = await axios.get( categories ? `http://localhost:5000/api/products?category=${categories}` : "http://localhost:5000/api/products")
      setCat(res.data)
      }
      catch(err){
      }
    }
    getProducts();
  },[categories])

  useEffect(() => {

      try{
        axios.get(baseURLProducts).then((response) => {
          setProducts(response.data);
        })
        axios.get(baseURLMarque).then((response) => {
          setMarque(response.data);
      })
        axios.get(baseURLSous_cat).then((response) => {
          setSous_cat(response.data);
    })
    }
      catch(err){

      }
}, [])

useEffect(()=>{
  if(prod.length !== 0){
  prod.sort((a, b )=> b.price- a.price)
  setMax(prod[0].price)
  sort[1]=maxx
}
},[maxx, prod])

const handleSlider =(e,data) =>{
  setSort(data);
}

const handleFilters = (e) => {
  const checked = e.target.checked;
  if(checked){
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
}
else {
  setFilter({});
}
};


const copy = categories.slice();
const co = categories.replace(/-/g, " ");
const char = co[0];
const replaced = co.replace(char, char.toUpperCase());
console.log(filter)

if(prod.length===0){
  return(
    <div style={{display: "flex", "justify-content": "center"}}>
    <Spinner/>
    </div>
   )
}
  return (
    <Container>
       <Announcement />
      <Navbar />
      <br /> 
      <Menu />
  <Prod>
  <div style={{"flex-direction":"row-reverse",display: "flex" }}>
      <Prods>
      <Products cat={location.pathname.split("/")[2]} aaa={filter}/>
      </Prods>
      </div>
      </Prod>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
