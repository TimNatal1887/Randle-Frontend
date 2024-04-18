import React, { useEffect, useState } from 'react';
import "../Styles/Leaderboard.css"
import { getGamesByUser, getUsersForLeaderboards } from '../helpers/fetch';
import { useOutletContext } from 'react-router-dom';

const Leaderboard = () => {
    const { user } = useOutletContext();
    const [users, setUsers] = useState([]);
    const [usersGames, setUsersGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        getUsersForLeaderboards()
            .then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        getGamesByUser(user.id)
            .then((data) => setUsersGames(data));
    }, []);

    // Logic to paginate users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

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
                    {currentUsers.map((mappedUser, index) => (
                        <tr key={index} className={mappedUser.id === user.id ? "loggedIn-row" : ""}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{mappedUser.username}</td>
                            <td>{mappedUser.total_score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1} className='prev-page-button'>Previous Page</button>
                <button onClick={nextPage} disabled={currentUsers.length < usersPerPage} className='next-page-button'>Next Page</button>
            </div>
        </div>
    );
};

export default Leaderboard;
