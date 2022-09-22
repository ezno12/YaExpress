import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement_pos = ({ item }) => {
  return <Container>
  <p>  Accueil {"> " + item}
</p>
  
  </Container>;
};

export default Announcement_pos;
