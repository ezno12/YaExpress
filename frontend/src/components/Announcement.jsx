import styled from "styled-components";
import freeShippingImg from "../assets/free-delivery.png"

const Container = styled.div`
  height: 30px;
  background-color: #ffce00;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Icon = styled.img`
  max-height: 20px;
`;

const Announcement = () => {
  return <Container>
    <Icon src={freeShippingImg} alt="free shipping" />
    &nbsp;&nbsp; Enjoy Free shipping!
  
  </Container>;
};

export default Announcement;
