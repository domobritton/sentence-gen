import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "@emotion/styled/macro";

import Tabletop from "tabletop";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background: #282c34;
`;

const Title = styled.h1`
  margin: 0;
  color: rgb(255, 244, 14);
  font-size: 30px;
  margin-bottom: 40px;

  @media (max-width: 580px) {
    font-size: 25px;
  }
`;

const Button = styled.button`
  border: 1px solid rgb(89, 89, 89);
  background-color: transparent;
  padding: 10px 15px;
  margin-top: 25px;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  color: rgb(255, 244, 14);
  cursor: pointer;
  outline: none;
`;

const Section = styled.section`
  background: #282c34;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
`;

const Sentence = styled.div`
  border: 1px solid rgb(89, 89, 89);
  border-radius: 10px;
  background: rgb(62, 64, 69);
  font-family: "Roboto", sans-serif;
  font-size: 22px;
  color: rgb(255, 244, 14);
  padding: 25px;
  height: 125px;

  @media (max-width: 580px) {
    font-size: 16px;
  }
`;

const App = () => {
  const [words, setWords] = useState({});
  const [sentence, setSentence] = useState("");
  const firstLoad = useRef(true);

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

  useEffect(() => {
    if (firstLoad && Object.keys(words).length !== 0) {
      handleSentenceGen();
      firstLoad.current = false;
    }
  }, [firstLoad, words, handleSentenceGen]);

  return (
    <Wrapper>
      {Object.keys(words).length !== 0 && (
        <Section>
          <Title>SENTENCE GENERATOR</Title>
          <Sentence>{sentence}</Sentence>
          <Button onClick={handleSentenceGen}>GET A NEW SENTENCE</Button>
        </Section>
      )}
    </Wrapper>
  );
};

export default App;
