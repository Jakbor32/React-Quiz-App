import React, { useRef, useEffect, useState } from "react";
import img from "./../../img/white.png";
import img2 from "./../../img/banana.png";
import img3 from "./../../img/cow.png";
import img4 from "./../../img/hammer.png";
import img5 from "./../../img/rainbow.png";
import "./quiz.css";
import { useLocation } from "react-router-dom";

const Quiz = () => {
  // set basic state
  const [Question, setQuestion] = useState(0);
  const [Score, setScore] = useState(0);
  const [Class, setClass] = useState(true);
  // quiz data
  const questions = [
    {
      nr: 1,
      question: "What color is in the picture in Hex notation?",
      photo: img,
      answer: [
        { id: 0, text: "#white", good: false },
        { id: 1, text: "#FA5", good: false },
        { id: 2, text: "#XD5", good: false },
        { id: 3, text: "#FFF", good: true },
      ],
    },
    {
      nr: 2,
      question: "What is in the picture?",
      photo: img2,
      answer: [
        { id: 0, text: "Apple", good: false },
        { id: 1, text: "Banana", good: true },
        { id: 2, text: "Orange", good: false },
        { id: 3, text: "Pear", good: false },
      ],
    },
    {
      nr: 3,
      question: "What animal is in the photo?",
      photo: img3,
      answer: [
        { id: 0, text: "Dog", good: false },
        { id: 1, text: "Cat", good: false },
        { id: 2, text: "Mouse", good: false },
        { id: 3, text: "Cow", good: true },
      ],
    },
    {
      nr: 4,
      question: "Is there a hammer in the picture?",
      photo: img4,
      answer: [
        { id: 0, text: "Yes", good: true },
        { id: 1, text: "No", good: false },
      ],
    },
    {
      nr: 5,
      question: "What you see in the picture?",
      photo: img5,
      answer: [
        { id: 0, text: "Sun", good: false },
        { id: 1, text: "Moon", good: false },
        { id: 2, text: "Rainbow", good: true },
        { id: 3, text: "Earth", good: false },
      ],
    },
  ];

  // fetch data from another component
  let { state } = useLocation();
  const { data } = state;

  // clear setTimeout
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const timerRef = useRef(null);

  const optionClicked = (good, id) => {
    // good/wrong button color
    const status = [];
    questions[Question].answer.map((answer) => {
      status.push(answer.good);
    });
    let goodAnswer = status.indexOf(true) + 1;
    const btn = document.querySelectorAll("button");
    good
      ? (btn[id + 1].style.backgroundColor = "#074507")
      : (btn[id + 1].style.backgroundColor = "#6f0707");
    good ? "" : (btn[goodAnswer].style.backgroundColor = "#074507");

    // score +
    good ? setScore(Score + 1) : "";

    // timer - next question
    timerRef.current = setTimeout(
      () => (Question < 4 ? setQuestion(Question + 1) : setClass(!Class)),
      1000
    );

    //timer - reset button color
    timerRef.current = setTimeout(
      () => btn.forEach((item) => (item.style.backgroundColor = "#492d08")),
      1000
    );
  };
  // create new JSON file
  const makeFile = () => {
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(Score));
    let Points = { points: Score };
    let dataJson = { ...data, ...Points };
    const element = document.createElement("a");
    const textFile = new Blob([JSON.stringify(dataJson)], {
      type: "application/json",
    });
    // pass data from localStorage to blob
    element.href = URL.createObjectURL(textFile);
    element.download = `${data.name}_${data.surname} - Quiz App`;
    document.body.appendChild(element);
    element.click();
  };
  return (
    <>
      <div className={Class ? "active" : ""}>
        <h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Name:</span>
                </td>
                <td>{data.name}</td>
              </tr>
              <tr>
                <td>
                  <span>Surname: </span>
                </td>
                <td>{data.surname}</td>
              </tr>
              <tr>
                <td>
                  <span>Email: </span>
                </td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>
                  <span>Your points:</span>
                </td>
                <td>{Score}</td>
              </tr>
            </tbody>
          </table>
        </h3>
        <button className="download" onClick={() => makeFile()}>
          Save my result
        </button>
      </div>
      <div className={Class ? "container" : "active"}>
        <div className="points">Points: {Score}</div>
        <hr />
        <div className="question-nr">Question {questions[Question].nr}</div>
        <hr />
        <div className="question">{questions[Question].question}</div>
        <hr />
        <img className="quiz-photo" src={questions[Question].photo} alt="img" />
        <br />
        <hr />
        <div className="quiz-answer">
          {questions[Question].answer.map((answer) => {
            return (
              <button
                onClick={() => optionClicked(answer.good, answer.id)}
                key={answer.id}
              >
                {answer.text}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Quiz;
