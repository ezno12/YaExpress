import styled from "styled-components";
import { popularProducts } from "../js/data";
import Product from "./Product";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ReactPaginate from "react-paginate";
import "react-paginate/dist/react-paginate";
import "../styles/global.css"


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const Div = styled.div`

`;


const Products = (cat, filter, sort) => {
  const location = useLocation()
  const home=location.pathname.split("/")[1]
  const [products, setProducts] = useState(cat.prod===undefined ? [] : cat.prod);
  const [filtredProducts, setFiltredProducts] =useState([]);
  const [popProducts, setPopProducts] =useState([]);

  
  useEffect(() => {
    const getProducts = async () =>{
      try{
      if(cat.cat==="discount"){
        const res = await axios.get( cat.cat ? `http://localhost:5000/api/products/${cat.cat}` : "http://localhost:5000/api/products")
      setProducts(res.data)
     }
    else if(cat.cat==="marque"){
    const res = await axios.get(`http://localhost:5000/api/products/marque?marq=${cat.marque}`);
    setProducts(res.data)
    setFiltredProducts(res.data);
     }
    else {
      const res = await axios.get( cat.cat ? `http://localhost:5000/api/products?category=${cat.cat}` : "http://localhost:5000/api/products")
      setProducts(res.data)
    }
  }
      catch(err){
      }
    }
    getProducts();
  },[cat.cat])




  useEffect(() => {
    const getProducts = async () =>{
      try{
      const respense = await axios.get("http://localhost:5000/api/products/pop")
      setPopProducts(respense.data)
      }
      catch(err){
      }
    }
    getProducts();
    console.log(home);
  },[])



useEffect(() => {
  (cat.cat && cat.aaa) && setFiltredProducts(
    products.filter(pr => Object.entries(cat.aaa).every(([key, value])=>
    pr[key].includes(value)))
  );
  },[products,cat, filter])


  



  
  const [pageNumber,setPageNumber] = useState(0)
  const productPage  = 6;
  const pagesVisited = pageNumber * productPage
  const displaysProducts = filtredProducts.slice(pagesVisited, pagesVisited + productPage).map((item)=>
  {
    return ( 
       <Product item={item} key={item.id} />
    )
  });
  const pageCount = Math.ceil(filtredProducts.length / productPage)
  const changePage =({selected}) => {
setPageNumber(selected);
  };
  return (
    <div>
    {home.length!==0 && <div>
    <Container>
      {displaysProducts}
    </Container>
    <Div>
    {products.length!==0  && <ReactPaginate 
    previousLabel={"《"}
    nextLabel={"》"}
    pageCount={pageCount}  
    onPageChange={changePage}
    breakClassName={'pag'}
    pageClassName={'pag pagination-page'}
    containerClassName = {"paginationBttns"}
    previousLinkClassName={"pag previousBttn"}
    nextLinkClassName={"pag nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"pag paginationActive"}
  />}</Div>
  </div>}</div>
  );
};

export default Products;
