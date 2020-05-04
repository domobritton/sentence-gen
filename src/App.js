import React, { useState, useEffect, useCallback, useRef } from "react";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import { isMobile, isBrowser } from "react-device-detect";
import { Animated } from "react-animated-css";
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
  font-size: 60px;
  position: relative;
  z-index: 99999;

  @media (max-width: 768px) {
    font-size: 7vw;
  }
`;

const LandScapeTitle = styled(Title)`
  font-size: 40px;
  @media (max-width: 768px) {
    font-size: 6vw;
  }
`;

const Button = styled.button`
  border: 1px solid rgb(89, 89, 89);
  background-color: transparent;
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  color: rgb(255, 244, 14);
  cursor: pointer;
  outline: none;
  transition: box-shadow 100ms ease-in-out;
  box-shadow: ${({ isFocused }) =>
    isFocused
      ? "0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 12px 0 rgba(0, 0, 0, 0.12)"
      : "0 5px 5px -1px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)"};
`;

const Section = styled.section`
  background: #282c34;
  height: 100vh;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  overflow: hidden;
`;

const LandScapeSection = styled(Section)`
  overflow-y: auto;
  @media (max-width: 1020px) {
    height: auto;
    padding: 40px 15px;
  }
`;

const Box = styled.div`
  border: 1px solid rgb(89, 89, 89);
  border-radius: 10px;
  background: rgb(62, 64, 69);
  padding: 25px;
  height: 125px;
  margin: 100px 0;
  position: relative;
  z-index: 0;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
`;

const LandScapeBox = styled(Box)`
  margin: 50px 0;
`;

const Sentence = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 22px;
  color: #eeeeee;

  @media (max-width: 580px) {
    font-size: 16px;
  }
`;

const App = () => {
  const [words, setWords] = useState({});
  const [sentence, setSentence] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const firstLoad = useRef(true);

  const filterWords = (arr) => {
    const nouns = arr.map((obj) => {
      console.log(obj.Nouns);
      if (obj.Nouns.length !== 0) {
        return obj.Nouns;
      }
    });
    const verbs = arr.map((obj) => {
      if (obj.Verbs.length !== 0) {
        return obj.Verbs;
      }
    });
    const adjectives = arr.map((obj) => {
      if (obj.Adjectives.length !== 0) {
        return obj.Adjectives;
      }
    });
    const adverbs = arr.map((obj) => {
      if (obj.Adverbs.length !== 0) {
        return obj.Adverbs;
      }
    });
    const preposition = arr.map((obj) => {
      if (obj.Preposition.length !== 0) {
        return obj.Preposition;
      }
    });
    const sentStart = arr.map((obj) => {
      if (obj.SentenceStart.length !== 0) {
        return obj.SentenceStart;
      }
    });
    setWords({ sentStart, nouns, verbs, adjectives, adverbs, preposition });
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
    const { sentStart, nouns, verbs, adjectives, adverbs, preposition } = words;

    const filterSentStart = sentStart.filter((x) => x !== undefined);
    const filterNouns = nouns.filter((x) => x !== undefined);
    const filterVerbs = verbs.filter((x) => x !== undefined);
    const filterAdj = adjectives.filter((x) => x !== undefined);
    const filterAdv = adverbs.filter((x) => x !== undefined);
    const filterPrep = preposition.filter((x) => x !== undefined);

    const sentStartLength = filterSentStart.length;
    const nounsLength = filterNouns.length;
    const verbsLength = filterVerbs.length;
    const adjectivesLength = filterAdj.length;
    const adverbsLength = filterAdv.length;
    const prepLength = filterPrep.length;
    const rand1 = Math.floor(Math.random() * nounsLength);
    const rand2 = Math.floor(Math.random() * verbsLength);
    const rand3 = Math.floor(Math.random() * adjectivesLength);
    const rand4 = Math.floor(Math.random() * adverbsLength);
    const rand5 = Math.floor(Math.random() * prepLength);
    const rand6 = Math.floor(Math.random() * nounsLength);
    const rand7 = Math.floor(Math.random() * sentStartLength);
    console.log(filterSentStart);
    const sentenceStart = filterSentStart[rand7];

    const content = `${sentenceStart} ${filterAdj[rand1]} ${filterNouns[rand2]} ${filterAdv[rand3]} ${filterVerbs[rand4]} because some ${filterNouns[rand1]} ${filterAdv[rand1]} ${filterVerbs[rand1]} ${filterPrep[rand1]} a ${filterAdj[rand2]} ${filterNouns[rand5]} which, became a ${filterAdj[rand3]}, ${filterAdj[rand4]} ${filterNouns[rand6]}.`;
    setSentence(content);
  }, [words]);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      handleSentenceGen();
    }, 400);
    setIsFocused(true);
    setTimeout(() => setIsFocused(false), 200);
  };

  useEffect(() => {
    if (firstLoad && Object.keys(words).length !== 0) {
      handleSentenceGen();
      firstLoad.current = false;
    }
  }, [firstLoad, words, handleSentenceGen]);

  return (
    <Wrapper>
      <DeviceOrientation>
        <Orientation orientation="landscape" alwaysRender={false}>
          {Object.keys(words).length !== 0 && (
            <>
              {isMobile && (
                <LandScapeSection>
                  <LandScapeTitle>SENTENCE GENERATOR</LandScapeTitle>
                  <Animated
                    animationIn="fadeInLeft"
                    animationOut="fadeOutRight"
                    isVisible={isVisible}
                  >
                    <LandScapeBox>
                      <Animated
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        isVisible={isVisible}
                      >
                        <Sentence>{sentence}</Sentence>
                      </Animated>
                    </LandScapeBox>
                  </Animated>
                  <Button onClick={handleClick} isFocused={isFocused}>
                    GET A NEW SENTENCE
                  </Button>
                </LandScapeSection>
              )}
              {isBrowser && (
                <Section>
                  <Title>SENTENCE GENERATOR</Title>
                  <Animated
                    animationIn="fadeInLeft"
                    animationOut="fadeOutRight"
                    isVisible={isVisible}
                  >
                    <Box>
                      <Animated
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        isVisible={isVisible}
                      >
                        <Sentence>{sentence}</Sentence>
                      </Animated>
                    </Box>
                  </Animated>
                  <Button onClick={handleClick} isFocused={isFocused}>
                    GET A NEW SENTENCE
                  </Button>
                </Section>
              )}
            </>
          )}
        </Orientation>
        <Orientation orientation="portrait" alwaysRender={false}>
          {Object.keys(words).length !== 0 && (
            <Section>
              <Title>SENTENCE GENERATOR</Title>
              <Animated
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                isVisible={isVisible}
              >
                <Box>
                  <Animated
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    isVisible={isVisible}
                  >
                    <Sentence>{sentence}</Sentence>
                  </Animated>
                </Box>
              </Animated>
              <Button onClick={handleClick} isFocused={isFocused}>
                GET A NEW SENTENCE
              </Button>
            </Section>
          )}
        </Orientation>
      </DeviceOrientation>
    </Wrapper>
  );
};

export default App;
