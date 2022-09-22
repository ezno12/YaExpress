import {
  Facebook,
  Instagram,
  MailOutline,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../js/responsive";
const logo = require('../assets/logo.png')

const Container = styled.div`
  display: flex;
  border-bottom: 5px solid black;
  background-color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  ${mobile({ flexDirection: "column" })}
`;

const LogoContainer = styled.div`
background-color: white;
`

const Logo = styled.img`
  max-height: 3.75rem;
  max-width: 12.5rem;
  padding-bottom: 1rem;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;


const CopyRight = styled.div`
  width:100%;
  height: 1.5rem;
  background-color: black;
  text-align: center;
`
const CopyRightText = styled.p`
  color: white;
  inline-height: 0.5rem;
  padding-margin: 0.5rem;
`

const Footer = () => {
  return (
    <div>
    <Container>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="00acee">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>  
    </Container>
    <CopyRight><CopyRightText>Copyright © 2022 _ Bassem Y.</CopyRightText></CopyRight>
    </div>
  );
};

export default Footer;
