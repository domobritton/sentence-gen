import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled/macro";

import Tabletop from "tabletop";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background: #282c34;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  margin: 0;
  color: #282c34;
  font-size: 22px;

  @media (max-width: 580px) {
    font-size: 18px;
  }
`;

const Button = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
`;

const Section = styled.section`
  background: #282c34;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Sentence = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 22px;
  color: #ffffff;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0 25px;

  @media (max-width: 580px) {
    font-size: 16px;
  }
`;

const App = () => {
  const [words, setWords] = useState([]);
  const [sentence, setSentence] = useState("");

  const filterWords = (arr) => {
    const nouns = arr.map((obj) => obj.Nouns);
    const verbs = arr.map((obj) => obj.Verbs);
    const adjectives = arr.map((obj) => obj.Adjectives);
    const adverbs = arr.map((obj) => obj.Adverbs);
    const preposition = arr.map((obj) => obj.Preposition);
    setWords({ nouns, verbs, adjectives, adverbs, preposition });
  };

  useEffect(() => {
    Tabletop.init({
      key: "1y7oOu5IHn8QNl5lWT6sQ6GEWL5kw7yOFzl9maldX33k",
      callback: (googleData) => {
        filterWords(googleData);
      },
      simpleSheet: true,
    });
  }, []);

  const handleSentenceGen = useCallback(() => {
    const { nouns, verbs, adjectives, adverbs, preposition } = words;
    const sentenceStartArr = ["The", "Their", "His", "Her", "A"];
    const length = nouns.length;
    const rand1 = Math.floor(Math.random() * length);
    const rand2 = Math.floor(Math.random() * length);
    const rand3 = Math.floor(Math.random() * length);
    const rand4 = Math.floor(Math.random() * length);
    const rand5 = Math.floor(Math.random() * length);
    const rand6 = Math.floor(Math.random() * length);
    const rand7 = Math.floor(Math.random() * 5);
    const sentenceStart = sentenceStartArr[rand7];

    const content = `${sentenceStart} ${adjectives[rand1]} ${nouns[rand2]} ${adverbs[rand3]} ${verbs[rand4]} because some ${nouns[rand1]} ${adverbs[rand1]} ${verbs[rand1]} ${preposition[rand1]} a ${adjectives[rand2]} ${nouns[rand5]} which, became a ${adjectives[rand3]}, ${adjectives[rand4]} ${nouns[rand6]}.`;
    setSentence(content);
  }, [words]);

  return (
    <Wrapper>
      <Header>
        <Title>Sentence Generator</Title>
        <Button onClick={handleSentenceGen}>Refresh</Button>
      </Header>
      <Section>
        <Sentence>{sentence}</Sentence>
      </Section>
    </Wrapper>
  );
};

export default App;
