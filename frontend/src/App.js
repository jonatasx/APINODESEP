import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {

  return (
    <>
      <Container>
        <Title> USUÁRIOS</Title>
      </Container>
      
      <GlobalStyle />
    </>

  );
}

export default App;
