import styled from "styled-components";
import {mobile} from "../js/responsive";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import {  useEffect, useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { userCart } from "../redux/cartRedux";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons"

const Container = styled.div`
`;

const ForgetPassword = styled.a`
  margin: 1rem;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  text-decoration: underline;
  flex-direction: column;
  gap: 0.5rem;
  ${mobile({ "font-size": "9px" })}
`;

const Login = () => {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[cartt,setCart]=useState({})
  const[products,setProducts] = useState([])

  const dispatch  = useDispatch(); 

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  useEffect(() => {
    const getProducts = async () =>{
      try{
      const respense = await axios.get("http://localhost:5000/api/products/")
      setProducts(respense.data)
      }
      catch(err){
      }
    }
    getProducts();
  },[])



const handleLogin = async ()=>{
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email:email,
        password:password
      })
      localStorage.setItem('user', JSON.stringify((res).data));
        axios.get("http://localhost:5000/api/carts/find/"+(res).data._id,
        {
          headers: {
            'Authorization': `Basic ${(res).data.token}` 
          }
        }).then(reponse=>setCart((reponse).data)); 
      const prods=products.filter(prod=>cartt.products.every(prodd=>prod._id!==prodd.productId))
      if(cartt){ dispatch(userCart({
        products:prods.map((prod)=>({
          ...cartt.products.find((prodd) => prodd.productId === prod._id && prodd),
          ...prod.quantity,
        })),
        wishlist:products.filter(prod=>cartt.wishlist.every(prodd=>prod._id!==prodd.productId)),
        quantity:prods.length}))
      }
    }
    catch{
      console.log("Error")
    }
  }

  return (
    <Container>
      <Navbar />
      <br /> 
      <Menu />  

  <div class="login-container">
	<div class="login-screen">
		<div class="screen__content">
			<form class="login">
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="email" class="login__input" placeholder="Your Email" required onChange={(e)=>setEmail(e.target.value)}></input>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}></input>
				</div>
				<button class="button login__submit">
					<span class="button__text">Log In Now</span>
				</button>
        <ForgetPassword><Link>Forget Password?</Link>
      <Link to={'register'}>Create a New Account</Link>
      </ForgetPassword>
			</form>
			<div class="social-login">
				<h3>log in via</h3>
				<div class="social-icons">
        <a href="#" class="social-login__icon"><FontAwesomeIcon icon={faFacebook}/></a>
					<a href="#" class="social-login__icon"><FontAwesomeIcon icon={faInstagram}/></a>
					<a href="#" class="social-login__icon"><FontAwesomeIcon icon={faTwitter}/></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    <Footer/>
    </Container>
  );
};

export default Login;
