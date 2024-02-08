import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {ACONITE_COLOR, GAME_LENGTH, ROUND_LENGTH,} from '../utils/defaultValues';
import shuffleArray from '../utils/shuffleArray';
import {CLUELESS_URL} from '../utils/url';

export default function Clueless() {
  const navigate = useNavigate();
  const [clusters, setClusters] = useState([]);
  const [round, setRound] = useState(1);
  const [answer, setAnswer] = useState('');
  const [input, setInput] = useState('');
  const [clues, setClues] = useState([]);
  const [message, setMessage] = useState('');
  // const [showAnswer, setShowAnswer] = useState(false);
  // const [gameOver, setGameOver] = useState(false);
  const [roundSeconds, setRoundSeconds] = useState(ROUND_LENGTH);
  const [gameSeconds, setGameSeconds] = useState(GAME_LENGTH);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [points, setPoints] = useState(0);
  const [guesses, setGuesses] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the data from the API
      try {
        const response = await axios.get(CLUELESS_URL);
        const clusters = response.data;
        const shuffledClusters = shuffleArray(clusters);
        setClusters(shuffledClusters);
        setIsDataFetched(true);
      } catch (error) {
        alert('Could not start game, reload!'); // Could not start game, reload! </Alert>;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Waits for the data to be fetched and state is set to start the game
    if (isDataFetched) {
      getCluster();
    }
  }, [isDataFetched]);

  useEffect(() => {
    // Decrease the seconds by 1 every second until it reaches 0
    if (roundSeconds > 0) {
      const timer = setInterval(() => {
        setRoundSeconds((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [roundSeconds]);

  useEffect(() => {
    // Decrease the seconds by 1 every second until it reaches 0
    if (gameSeconds > 0) {
      const timer = setInterval(() => {
        setGameSeconds((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [gameSeconds]);

  const handleTimeUp = () => {
    // Handle when the timer runs out
    shortMessage('Time up! Next round...');
    handleNextRound();
  };

  useEffect(() => {
    // Signal when the timer runs out
    if (gameSeconds === 0) {
      handleGameOver();
    }
    if (roundSeconds === 0) {
      handleTimeUp();
    }
  }, [roundSeconds, gameSeconds]);

  const getCluster = () => {
    // Get the next cluster
    console.log('round: ', round);
    console.log('clusters length: ', clusters.length);
    console.log(message);
    if (round <= clusters.length) {
      setAnswer(clusters[round - 1].answer);
      setClues(shuffleArray(clusters[round - 1]['clues']));
      setRound(round + 1);
    } else {
      // setGameOver(true);
      setMessage('Game over!');
    }
  };

  const shortMessage = (message) => {
    // Shows the argument message for 1 second
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 1_500);
  };

  const onKeyPress = (event) => {
    // Handle enter key press
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  };

  const handleNextRound = () => {
    // Go to the next round
    setRound((prev) => prev + 1);
    setGuesses(1);
    setRoundSeconds(ROUND_LENGTH);
    getCluster();
  };

  const onSubmit = () => {
    // Handle when the user submits an answer
    if (input.toLowerCase() === answer) {
      handlePoints();
      shortMessage(`'${answer}' is correct! Next round...`);
      handleNextRound();
    } else {
      setGuesses((prev) => prev + 1);
      shortMessage('Try again!');
    }
    setInput('');
  };

  const onInputChange = (event) => {
    // Handle when the user types
    const inputElement = event.target;
    setInput(inputElement.value);
    setMessage('');
  };

  const handlePoints = () => {
    // Handle points when the user is correct
    setPoints((prev) => prev + (10 * roundSeconds) / guesses);
  };

  const handleGameOver = () => {
    // Handle when the game is over
    // setGameOver(true);
    navigate('/gameover', {state: points > 0 ? points : '0'});
  };

  return (
    <div style={{textAlign: 'center', marginTop: 20}}>
      <h1
        style={{
          margin: '1em',
          color: ACONITE_COLOR,
          fontStyle: 'italic',
        }}
      >
        Clueless
      </h1>
      <ul style={{display: 'flex', justifyContent: 'center'}}>
        {clues.map((clue, index) => (
          <h2
            style={{marginRight: '2em'}}
            key={index}
          >
            {clue}
          </h2>
        ))}
      </ul>
      <Form>
        <Form.Group
          style={{display: 'flex', justifyContent: 'center'}}
          controlId="formBasicText"
        >
          <Form.Control
            style={{width: '35%', textAlign: 'center', fontSize: 25, margin: '1em'}}
            type="text"
            placeholder="Enter guess"
            value={input}
            onChange={(event) => onInputChange(event)}
            onKeyDown={(event) => onKeyPress(event)}
          />
        </Form.Group>
        <Button
          style={{
            width: 150,
            margin: '1em',
            fontSize: 20,
          }}
          variant="outline-success"
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          style={{
            width: 150,
            margin: '1em',
            fontSize: 20,
          }}
          variant="outline-danger"
          onClick={() => setInput('')}
        >
          Clear
        </Button>
      </Form>
      <h4 style={{color: 'red', marginTop: '1em'}}>Points: {points}</h4>
      <h4 style={{color: 'blue', marginTop: '1em'}}>
        Round Seconds: {roundSeconds}
      </h4>
      <h4 style={{color: 'orange', marginTop: '1em'}}>
        Game Seconds: {gameSeconds}
      </h4>
      <h4 style={{color: 'brown', marginTop: '1em'}}>{message}</h4>
    </div>
  );
}
