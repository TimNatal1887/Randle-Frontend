
export function handleChange(event, formObj, setFunc){
    setFunc({ ...formObj, [event.target.id]: event.target.value });
}

export function heightCheck(guessedPlayer,correctPlayer){
    const guessedPlayerHeight = guessedPlayer.height_feet * 12 + guessedPlayer.height_inches
    const correctPlayerHeight = correctPlayer.height_feet * 12 + correctPlayer.height_inches
    const heightDiff = guessedPlayerHeight - correctPlayerHeight

    if(heightDiff === 0){
       return true
    }else if(heightDiff < 0){
        if(heightDiff < 0 && heightDiff >= -2){
            return "plus two"
        } 
        return "plus"
    }else if(guessedPlayerHeight > correctPlayerHeight){
        if(heightDiff > 0 && heightDiff <= 2){
            return "minus two"
        }
        return "minus"
    }
    return false
}

export function ageCheck(guessedPlayer,correctPlayer){
    const guessedPlayerage = guessedPlayer.age
    const correctPlayerage = correctPlayer.age
    const ageDiff = guessedPlayerage - correctPlayerage
    
    if(ageDiff === 0){
       return true
    }else if(ageDiff < 0){
        if(ageDiff < 0 && ageDiff >= -2){
            return "plus two"
        } 
        return "plus"
    }else if(guessedPlayerage > correctPlayerage){
        if(ageDiff > 0 && ageDiff <= 2){
            return "minus two"
        }
        return "minus"
    }
    return false
}

export function jerseyCheck(guessedPlayer, correctPlayer){
    const {jersey_number:guessedPlayerJerseyNum} = guessedPlayer
    const {jersey_number:correctPlayerJerseyNum} = correctPlayer
    const jersey_numberDiff = guessedPlayerJerseyNum - correctPlayerJerseyNum
    
    if(jersey_numberDiff === 0){
       return true
    }else if(jersey_numberDiff < 0){
        if(jersey_numberDiff < 0 && jersey_numberDiff >= -2){
            return "plus two"
        } 
        return "plus"
    }else if(jersey_numberDiff > 0){
        if(jersey_numberDiff > 0 && jersey_numberDiff <= 2){
            return "minus two"
        }
        return "minus"
    }
    return false
}