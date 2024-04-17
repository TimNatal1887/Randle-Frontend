const API = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem('token') 
export function getAllPlayers(){
    return fetch(`${API}/api/players`)
    .then((res)=>res.json())
    .catch((error)=> console.error(error))
}
export function updateGame(game, id){
    return fetch(`${API}/api/games/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(game)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update game');
        }
            return response.json();
        })
}

export function getUsersForLeaderboards () {
    return fetch(`${API}/api/users`)
    .then((res)=> res.json())
}

export function getGamesByUser(userId){
    return fetch(`${API}/api/games/user?userId=${userId}`)
    .then((res)=>res.json())
}

export function updateUserTotal(game,user){
    return fetch(`${API}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({game,user})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update game');
        }
            return response.json();
        })
}

export function getUserById(id){
    return fetch(`${API}/api/users/${id}`)
    .then((res)=>res.json())
}