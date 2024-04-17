import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../Styles/Dashboard.css"
import { getAllPlayers, getUserById, updateGame, updateUserTotal } from "../helpers/fetch";
import { heightCheck, ageCheck, jerseyCheck } from "../helpers/helpers";
const API = import.meta.env.VITE_BASE_URL

const Dashboard = ({ handleLogout, setToggleLogin }) => {
  const [game, setGame] = useState({})
  const [currentGuess, setCurrentGuess] = useState("")
  const [winStatus, setWinStatus] = useState(false)
  const [players, setPlayers] = useState([])
  const [playersGuessed, setPlayersGuessed] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState({})
  const [gameOver, setGameOver] = useState(false)
  const { user } = useOutletContext();
  const [userObject, setUserObject] = useState({})

  const createGame = () =>{
    const correct_answer = Math.floor(Math.random() * players.length)
    const userId = user.id
    
    const newGame = {
      correct_answer,
      user_id: userId,
      score:0
    }
    
    const token = localStorage.getItem('token')

    fetch(`${API}/api/games`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newGame)
    })
    .then((res)=> res.json()
    .then((data)=> {
      setGame(data)
      fetch(`${API}/api/players/${data.correct_answer}`)
      .then((res)=> res.json())
      .then((data)=> setCorrectAnswer(data))
    }))  
  }

  
  const handleChange = (event) => {
    const value = event.target.value.trim();
    setCurrentGuess(value);
    if (value === '') {
      setFilteredPlayers([]);
      return; 
    }
   
    const filtered = players.filter((player) => {
      const hyphenatedNameParts = player.last_name.split("-");
      const firstName = player.first_name.toLowerCase();
      const lastName = player.last_name.toLowerCase();

      if (firstName.startsWith(value.toLowerCase()) || lastName.startsWith(value.toLowerCase())) {
          return true;
      } else if (hyphenatedNameParts.length === 2) {
          const firstPart = hyphenatedNameParts[0].toLowerCase();
          const secondPart = hyphenatedNameParts[1].toLowerCase();
          if (firstPart.startsWith(value.toLowerCase()) || secondPart.startsWith(value.toLowerCase())) {
              return true;
          }
      }
      return false;
    });
    setFilteredPlayers(filtered);
  };
  const getScore = (guessArray, ) =>{
    const newScore = 700 - (guessArray.length * 100)
    return newScore
  }
  const handleGuess = (player) =>{
    setPlayersGuessed([...playersGuessed, player])
    setCurrentGuess("")
    setFilteredPlayers([])
  }


  const startGame = () =>{
    createGame()
    setHasGameStarted(true)
  }
  
  
  const restartGame = () =>{
    setGame({})
    setCorrectAnswer({})
    setCurrentGuess("")
    setWinStatus(false)
    setFilteredPlayers([])
    setGameOver(false)
    setPlayersGuessed([])
    setHasGameStarted(false)
  }

  const checkGame = (player, correct_answer, guessArray) =>{
    if(player.first_name === correct_answer.first_name){
      setGameOver(true)
      const finishedGame = {...game, score:getScore(guessArray)}
      updateUserTotal(finishedGame,userObject)
      setGame(finishedGame)
      updateGame(finishedGame, finishedGame.id)
      setWinStatus(true)
    }else if(guessArray.length === 6){
      setGameOver(true)
    }
  }
  
  useEffect(()=>{
    getAllPlayers()
    .then((data)=>setPlayers(data))
  },[])

  useEffect(()=>{
    if(playersGuessed.length > 0){
      const lastPlayerGuessed = playersGuessed[playersGuessed.length - 1]
      checkGame(lastPlayerGuessed, correctAnswer, playersGuessed)
    }
  },[playersGuessed])

  useEffect(()=>{
    getUserById(user.id)
    .then((data)=>setUserObject(data))
  },[winStatus])
  
  if(players.length < 1) return null
  return (
    <div className="dashboard-wrap">
      {console.log(correctAnswer)}
      <div className="dashboard-header">
        <div className="welcome-container">
          {user && (
            <h1 className="welcome-message">
              Welcome, {user.username[0].toUpperCase()}
              {user.username.slice(1).toLowerCase()}
            </h1>
          )} 
        </div>
        <div className="logout-container">
          {hasGameStarted && playersGuessed.length > 0 &&
          <button className="restart-button" onClick={restartGame}>Restart Game</button>
          }
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
      <div className="game-container">
        {!hasGameStarted ? (
          <div className="create-button-container">
          <button onClick={(startGame)} className="create-button">
            New Game 
          </button>
          </div>
        ):(
          <div className="game-started-container">
            {gameOver && 
              <h1>{winStatus ? `You won ${game.score} points!`:`You Lose! The correct player was ${correctAnswer.first_name} ${correctAnswer.last_name}`}</h1>
            }
            {!gameOver &&
              <input
                type="text"
                placeholder="Search for players..."
                onChange={handleChange}
                className="player-search-bar"
                value={currentGuess}
              />
            }
          <div className="dropdown">
              {filteredPlayers.length > 0 && (
                  <ul>
                      {filteredPlayers.map((player) => (
                          <li key={player.id} onClick={()=>handleGuess(player)}>
                              {player.first_name} {player.last_name}
                          </li>
                      ))}
                  </ul>
              )}
          </div>
          <div className="guessed-players">
            <h2 className="theader-span">
              <span>Name</span>
              <span>Team</span>
              <span>Conference</span>
              <span>Division</span>
              <span>Position</span>
              <span>Height</span>
              <span>Age</span>
              <span>Number</span>
            </h2>
            <ul className="guessed-players-list">
              {playersGuessed.map((player, index)=> {
                const guessedPlayerHeight = player.height_feet * 12 + player.height_inches
                const correctPlayerHeight = correctAnswer.height_feet * 12 + correctAnswer.height_inches
                
                const sameName = player.first_name + player.last_name === correctAnswer.first_name + correctAnswer.last_name
                const sameTeam = player.current_team === correctAnswer.current_team
                const sameConference = player.conference === correctAnswer.conference
                const sameDivision = player.division === correctAnswer.division
                const samePosition = player.position === correctAnswer.position 
                const sameHeight = heightCheck(player, correctAnswer)
                const sameAge = ageCheck(player, correctAnswer)
                const sameJersey = jerseyCheck(player, correctAnswer)

                
                return (
                <li key={`${player.first_name}${player.last_name}${index}`} className="guessed-player">
                  <span className={`name-span ${sameName ? "correct":"incorrect"}`}>{player.first_name} {player.last_name}</span>
                  <span className={`team-span ${sameTeam ? "correct":"incorrect"}`}>{player.current_team}</span>
                  <span className={`conference-span ${sameConference ? "correct":"incorrect"}`}>{player.conference}</span>
                  <span className={`division-span ${sameDivision ? "correct":"incorrect"}`}>{player.division}</span>
                  <span className={`position-span ${samePosition ? "correct":"incorrect"}`}>{player.position}</span>
                  <span className={`height-span ${typeof(sameHeight) === "string" ? sameHeight: sameHeight ? "correct":"incorrect" }`}>{player.height_feet}'{player.height_inches} { guessedPlayerHeight > correctPlayerHeight ? "⬇️": guessedPlayerHeight < correctPlayerHeight ? "⬆️":""}</span>
                  <span className={`age-span ${typeof(sameAge) === "string" ? sameAge: sameAge ? "correct":"incorrect" }`}>{player.age}{ player.age > correctAnswer.age ? "⬇️": player.age < correctAnswer.age ? "⬆️":""}</span>
                  <span className={`jersey-span ${typeof(sameJersey) === "string" ? sameJersey: sameJersey ? "correct":"incorrect" }`}>{player.jersey_number}{ player.jersey_number > correctAnswer.jersey_number? "⬇️": player.jersey_number < correctAnswer.jersey_number ? "⬆️":""}</span>
                </li>
              )
              })}
            </ul>
          </div>
      </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
