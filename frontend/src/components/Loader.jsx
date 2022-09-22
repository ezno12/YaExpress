import { Circles } from  'react-loader-spinner'
import styled from "styled-components";



const Loader = styled.div`
    position:absolute; 
    width:100%;
    height:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    Flex-direction: column;
    gap: 1rem;
`;

const P = styled.p`
   font-size: 20px; 
   color:black;
   font-weight: bold;
`;


const Spinner = () => {
    return (
     <Loader>
     <Circles
        height="80"
        width="80"
        color="#ffce00"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
    
     <P>Loading...</P>
     </Loader>
    );
};
export default Spinner;