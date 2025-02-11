import React, { useState } from "react";
import logo from "./logo.svg";
import Icon from "./Icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";


const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    if (itemArray[0] !== 'empty' && itemArray[0] === itemArray[1] && itemArray[1] === itemArray[2]){
      setWinMessage(`${itemArray[0]} wins!`);
    }
    else if (itemArray[3] !== 'empty' && itemArray[3] === itemArray[4] && itemArray[4] === itemArray[5]){
      setWinMessage(`${itemArray[3]} wins!`);
    }
    else if (itemArray[6] !== 'empty' && itemArray[6] === itemArray[7] && itemArray[7] === itemArray[8]){
      setWinMessage(`${itemArray[6]} wins!`);
    }
    else if (itemArray[0] !== 'empty' && itemArray[0] === itemArray[3] && itemArray[3] === itemArray[6]){
      setWinMessage(`${itemArray[0]} wins!`);
    }
    else if (itemArray[1] !== 'empty' && itemArray[1] === itemArray[4] && itemArray[4] === itemArray[7]){
      setWinMessage(`${itemArray[1]} wins!`);
    }
    else if (itemArray[2] !== 'empty' && itemArray[2] === itemArray[5] && itemArray[5] === itemArray[8]){
      setWinMessage(`${itemArray[2]} wins!`);
    }
    else if (itemArray[0] !== 'empty' && itemArray[0] === itemArray[4] && itemArray[4] === itemArray[8]){
      setWinMessage(`${itemArray[0]} wins!`);
    }
    else if (itemArray[2] !== 'empty' && itemArray[2] === itemArray[4] && itemArray[4] === itemArray[6]){
      setWinMessage(`${itemArray[2]} wins!`);
    }
  };

  const changeItem = itemNumber => {
    if (winMessage){
      return toast(winMessage, { type : "success"})
    }

    if (itemArray[itemNumber] === "empty"){
      if (isCross){
        itemArray[itemNumber] = "cross";
      }
      else{
        itemArray[itemNumber] = "circle";
      }
      setIsCross(!isCross);
    }
    else{
      return toast("This box is already filled!", { type : "error"})
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          { winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-uppercase text-center text-success">{winMessage}</h1>
              <Button color="success" block onClick={reloadGame}>Reload Game</Button>
            </div>
          ) : (
            <h1 className="text-center text-warning">{ isCross ? "Cross" : "Circle" }'s turn</h1>
          ) }
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card color="warning" key={index} onClick={ () => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
