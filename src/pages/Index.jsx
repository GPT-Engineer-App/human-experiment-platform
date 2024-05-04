import React, { useState } from "react";
import { Container, VStack, Button, Text, Box, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";

const gameScenarios = {
  "Prisoner's Dilemma": {
    choices: ["Cooperate", "Defect"],
    outcomes: {
      "Cooperate,Cooperate": "Both players cooperate and receive a moderate benefit.",
      "Cooperate,Defect": "You cooperate but the other defects, you get nothing and the other gets maximum benefit.",
      "Defect,Cooperate": "You defect while the other cooperates, you get maximum benefit and the other gets nothing.",
      "Defect,Defect": "Both players defect and both get a minimal benefit.",
    },
  },
};

const Index = () => {
  const [selectedGame, setSelectedGame] = useState("Prisoner's Dilemma");
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState("");
  const toast = useToast();

  const handlePlay = () => {
    // Simulate other player's choice (randomly for now)
    const otherChoice = Math.random() > 0.5 ? "Cooperate" : "Defect";
    const outcomeKey = `${choice},${otherChoice}`;
    const gameOutcome = gameScenarios[selectedGame].outcomes[outcomeKey];
    setResult(`You chose to ${choice}. The other player chose to ${otherChoice}. Outcome: ${gameOutcome}`);

    toast({
      title: "Game Played",
      description: `Outcome: ${gameOutcome}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Text fontSize="2xl" mb={4}>
            <FaUserFriends /> Game Theory Experiment
          </Text>
          <Text mb={4}>Select your choice for the game scenario: {selectedGame}</Text>
          <Text mb={4}>Payoff Matrix:</Text>
          <Text mb={4}>
            Cooperate: {gameScenarios[selectedGame].outcomes["Cooperate,Cooperate"]} / {gameScenarios[selectedGame].outcomes["Cooperate,Defect"]}
          </Text>
          <Text mb={4}>
            Defect: {gameScenarios[selectedGame].outcomes["Defect,Cooperate"]} / {gameScenarios[selectedGame].outcomes["Defect,Defect"]}
          </Text>
          <RadioGroup onChange={setChoice} value={choice}>
            <Stack direction="row">
              {gameScenarios[selectedGame].choices.map((c, index) => (
                <Radio key={index} value={c}>
                  {c}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Button mt={4} colorScheme="blue" onClick={handlePlay} isDisabled={!choice}>
            Play
          </Button>
          {result && <Text mt={4}>{result}</Text>}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
