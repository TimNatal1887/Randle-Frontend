import React, { useEffect, useState } from 'react';
import "../Styles/Leaderboard.css"
import { getGamesByUser, getUsersForLeaderboards } from '../helpers/fetch';
import { useOutletContext } from 'react-router-dom';



const Leaderboard = () => {
    const {user} = useOutletContext()
    const [users, setUsers] = useState([])
    const [usersGames, setUsersGames] = useState([])

    useEffect(()=>{
        getUsersForLeaderboards()
        .then((data)=> setUsers(data))
    },[])

    useEffect(()=>{
        getGamesByUser(user.id)
        .then((data)=> setUsersGames(data))
    },[])

   

  return (
    <div className='leaderboard-wrap'>
      <h1>Leaderboard</h1>
      <table className='leaderboard-table'>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Username</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((mappedUser, index) => (
              <tr key={index} className={mappedUser.id === user.id ? "loggedIn-row":""}>
              <td>{index + 1}</td>
              <td>{mappedUser.username}</td>
              <td>{mappedUser.total_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
