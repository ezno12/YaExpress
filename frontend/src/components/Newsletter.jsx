import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../js/responsive";

const Container = styled.div`
  height: 80vh;
  background-color: #ffce00;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: auto;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({  "font-size": "60px" })}
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #000;
  color: white;
  
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Subscriber</Title>
      <Desc>Don't go without a 20% discount</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
