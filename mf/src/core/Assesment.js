import React from "react";
import { Link, Redirect } from "react-router-dom";

class Quiz extends React.Component {
    constructor(props) {
      super(props)
      
      var dataSet = [
        {
          question: " Which type of JavaScript language is ___",
          answers: [
            "Object-Oriented",
            "Object-Based",
            "Assembly-language",
            "High-level"
          ],
          correct: 1
        },
        {
          question: "Which one of the following also known as Conditional Expression:",
              answers: [
                "Alternative to if-else",
                "Switch statement",
                "If-then-else statement",
                "immediate if"
              ],
              correct: 3
        },
         {
              question: "When interpreter encounters an empty statements, what it will do?",
              answers: [
                "Shows a warning",
                "Prompts to complete the statement",
                "Throws an error",
                "Ignores the statements"
              ],
              correct: 3
            },
            {
              question: "The 'function' and  'var' are known as",
              answers: [
                "Keywords",
                "Data types",
                "Declaration statements",
                "Prototypes"
              ],
              correct: 2
            },
            {
              question: "Which one of the following is the correct way for calling the JavaScript code?",
              answers: [
                "Preprocessor",
                "Triggering Event",
                "RMI",
                "Function/Method"
              ],
              correct: 3
            },
            {
              question: "JavaScript can be used in ____ development",
              answers: [
                "Back-End",
                "Front-End",
                "ReactJS",
                "All of the Above"
              ],
              correct: 3
            },
            {
              question: "Which of the following type of a variable is volatile?",
              answers: [
                "Mutable variable",
                "Dynamic variable",
                "Volatile variable",
                "Immutable variable"
              ],
              correct: 0
            },
            {
              question: "In the JavaScript, which one of the following is not considered as an error?",
              answers: [
                "Syntax error",
                "Missing of semicolons",
                "Division by zero",
                "Missing of Bracket"
              ],
              correct: 2
            },
            {
              question: "Which of the following number object function returns the value of the number?",
              answers: [
                "toString()",
                "valueOf()",
                "toLocaleString()",
                "toPrecision()"
              ],
              correct: 1
            },
            {
              question: "In JavaScript the x===y statement implies that",
              answers: [
                "Both x and y are equal in value, type and reference address as well",
                "Both are x and y are equal in value only",
                "Both are equal in the value and data type",
                "Both are not same at all"
              ],
              correct: 2
            },
      ];
      
      this.state = {
        current:0, 
        dataSet:dataSet, 
        correct:0, 
        incorrect:0
      }
      this.handleClick = this.handleClick.bind(this)
         
    } // end constructor
    
    handleClick(choice) {
      if (choice == this.state.dataSet[this.state.current].correct) {
        this.setState({correct: this.state.correct + 1})
      } else {
        this.setState({incorrect: this.state.incorrect + 1})
      }
      
      if (this.state.current == 9) {
        if(this.state.correct/10 > 0.7){
            alert("you passed the Test");
            window.location.href = "/course/enrolments";
        }
        alert("Try again!")
        this.setState({current: 0})
        this.setState({incorrect: 0})
        this.setState({correct: 0})
      } else {
           this.setState({current: this.state.current + 1}) 
      }
    }
    
    render() {
      return(
        <div>
          <ScoreArea correct={this.state.correct} incorrect={this.state.incorrect} />
          <QuizArea handleClick={this.handleClick} dataSet={this.state.dataSet[this.state.current]} />       
        </div>
      )
    }
  }
  
  function Question(props) {
    var style = {
        width: "270%",
        color: "white",
    }
    return (
      <h1 style={style}>{props.dataSet.question}</h1>
    )
  }
  
  function Answer(props) {
    var style = {
      width: "100%",
      height: 50,
      color: "blue"
    }
    return(
      <div>
        <button style={style} onClick={() => props.handleClick(props.choice)}>{props.answer}</button>
      </div>
    )
  }
  
  function AnswerList(props) {
    var answers = []
    for (let i = 0; i < props.dataSet.answers.length; i++) {
      answers.push(<Answer choice={i} handleClick={props.handleClick} answer={props.dataSet.answers[i]} />)
    }
    return(
      <div>
        {answers}
      </div>
    )
  }
  
  function QuizArea(props) {
    var style = {
      width: "25%",
      display: "block",
      textAlign: "center",
      boxSizing: "border-box",
      float: "left",
      padding: "0 2em"
    }
    return(
      <div style={style}>
        <Question dataSet={props.dataSet} />
        <AnswerList dataSet={props.dataSet} handleClick={props.handleClick} />
        <br></br>
        <Link to="/course/enrolments" className="nav-link text-warning">
              Back To Enrolments
        </Link>
      </div>
      
    )
  }
  
  function TotalCorrect(props) {
      var style = {
      display: "inline-block",
      padding: "1em",
      background: "#eee",
      margin: "0 1em 0 0"
    }
    return(
      <h2 style={style}>Correct: {props.correct}</h2>
    )
  }
  
  function TotalIncorrect(props) {
    var style = {
      display: "inline-block",    
      padding: "1em",
      background: "#eee",
      margin: "0 0 0 1em"
    }
    return(
      <h2 style={style}>Incorrect: {props.incorrect}</h2>
    )
  }
  
  function ScoreArea(props) {
    var style = {
      width: "100%",
      display: "block",
      textAlign: "left",
      float: "left",
      padding: "2em"
    }
    return(
      <div style={style} >
        <TotalCorrect correct={props.correct} />
        <TotalIncorrect incorrect={props.incorrect} />
        
      </div>
    )
  }
  

  export default Quiz;