import styled from "styled-components";
import { mobile } from "../js/responsive";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import {   useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons"

const Container = styled.div`

`;




const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleRegister=async ()=>{
    if(password===cPassword){try{
      const res = axios.post("http://localhost:5000/api/auth/register", {
        email:email,
        password:password,
        username:username
      });
      console.log(res);
    }
    catch{
      console.log("Error")
    }
  }
}


  return (
    <Container>
      <Navbar />
      <br /> 
      <Menu />
      <div class="login-container">
	<div class="login-screen register-screen">
		<div class="screen__content">
			<form class="register" onSubmit={handleRegister}>
      
      <div class="warpper">

          <div class="input-register">
            <div class="login__field">
					    <input type="text" class="login__input" placeholder="First Name (optional)"></input>
				    </div>
            <div class="login__field">
					    <input type="text" class="login__input" placeholder="Last Name (optional)"></input>
				    </div>
          </div>

          <div>
            <div class="login__field">
					    <input type="text" class="login__input" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)}></input>
				    </div>
				    <div class="login__field">
            <input type="password" class="login__input" name="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}></input>
				    </div>
          </div>

          <div>
				    <div class="login__field">
              <input type="email" class="login__input" placeholder="Your Email" required onChange={(e)=>setEmail(e.target.value)}></input>
				    </div>
            <div class="login__field">
					    <input type="password" class="login__input" name="Cpassword" placeholder="Confirm password" required onChange={(e)=>setCPassword(e.target.value)}></input>
				    </div>
          </div>
          {password!==cPassword && <div style={{color:'red',left:"20px"}}> Password Not matched </div>}
          <button class="button register__submit login__submit" type="submit">
					<span class="button__text register_button">Sign up Now</span>
				</button>
        </div>
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

export default Register;
