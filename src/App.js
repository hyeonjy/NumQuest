import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Container = styled.div`
  background-color: white;
  padding: 20px;
  width: 350px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
`;

const RandomNumber = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  border-width: 2px;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #efefef;
  border-radius: 5px;
  border-color: gray;
  margin: 0px 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Answer = styled.span`
  font-size: 18px;
  display: block;
  text-align: center;
  margin-top: 25px;
`;

function App() {
  const [number, setNumber] = useState("");
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");

  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(Number(value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (number === value) {
      setIsCorrect("정답입니다!");
    } else {
      setIsCorrect(`오답입니다. 정답은 ${number}입니다.`);
    }
  };

  const createRandomNumber = () => {
    setIsCorrect("");
    setValue("");
    const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setNumber(randomNum);
    setIsVisible(true);
  };

  useEffect(() => {
    if (number !== 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [number]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>숫자 기억 게임</Title>
        {isVisible && <RandomNumber>{number}</RandomNumber>}
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            value={value}
            placeholder="숫자를 입력하세요"
          />
          <Button type="button" onClick={createRandomNumber}>
            시작
          </Button>
          <Button type="submit">제출</Button>
        </Form>
        {isCorrect && <Answer>{isCorrect}</Answer>}
      </Container>
    </>
  );
}

export default App;
