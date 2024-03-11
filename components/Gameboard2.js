import { Text, View, Pressable } from "react-native"
import { Col, Row, Container} from 'react-native-'
import style from '../style/style'
import Header from "./Header"
import Footer from "./Footer"
import { Button, Icon } from "react-native-paper"
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMITS
} from "../constants/Game";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


let board = [];


export default function Gameboard() {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false));

  

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable 
          key={"row" + i}
          onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50} 
          color={getDiceColor(i)}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
  }, [nbrOfThrowsLeft]);

  useEffect(() => {
    if(playerName === '' && TabRouter.param?.player){
      setPlayerName(route.param.playerName)
    }
  })

  //this effect is for reading scoreboard from the asyncstorage. When user navigateing back to screen(have a the game flow so
  // look at the assignment instr.)Trigger here is the navigation for use effect
  //This useeffect is for handling
  //Call the function for calculating points inside text comp to replace 0
  const pointsRow = [];
  for(let spot = 0;spot<MAX_SPOT; spot++){
    pointsRow.push(
      <Col key={'pointsRow'+spot}>
        <Text key={'pointsRow'+spot}>
          0
        </Text>
      </Col>
      
    )
  }

  const pointsToSelectRow =[];
    for (let diceButton=0; diceButton<MAX_SPOT; diceButton++){
      pointsToSelectRow.push(
        <Col key={'buttonsRow' + diceButton}>
        <Pressable 
          key={'buttonsRow' + diceButton}
          //onPress
          >
          <MaterialCommunityIcons>
            name={'numeric-'+(diceButton+1)+'-circle'}
            key={'buttonsRow' + diceButton}
            size ={35}
          </MaterialCommunityIcons>
        </Pressable>
        </Col>
      )
    }
  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";
    }
    else {
      return selectedDices[i] ? "black" : "steelblue";
    }
  }

  function getDecePointsColor(i) {
    if (selectDicePOints[i] && !gameEndStatus){
      return 'black'
    }else {
      return 'steelblue'
    }
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  const checkWinner = () => {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
      setStatus('You won');
    }
    else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
      setStatus('You won, game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else if (nbrOfThrowsLeft === 0) {
      setStatus('Set your points to one  of the spot');
      //setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else {
      setStatus('Keep on throwing');
    }
  }

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
  }

  const selectDicePoints = (i) =>{
    let selectDicePoints = [...selectDicePoints]; 
    let points= [... dicePointsTotal];
    selectDicePoints[i]=true;
    let nbrOfDices = diceSpots.reduce((total,x) => (x===(i+1)?total+1:total),0);
    points[i] = nbrOfDices*(i+1);
    setDicePointTotal(points);
    setSelectedDicePoints(selectedPoints);
    return points[i]
  }
  
  return(
    <View style={style.gameboard}>
      <View style={style.flex}>{row}</View>
      <Container fluid>
        <Row>{pointsToSelectRow}</Row>
      </Container>

      <Text style={style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={style.gameinfo}>{status}</Text>
      <Pressable style={style.button}
        onPress={() => throwDices()}>
          <Text style={style.buttonText}>
            Throw dices
          </Text>
      </Pressable>
    </View>
  )
}