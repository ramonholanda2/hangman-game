import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

const PopUp = ({ correctLetter, wrongLetter, selectedWord, setPlayable, playAgain }) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;

    if( checkWin(correctLetter, wrongLetter, selectedWord) === 'win' ) {
        finalMessage = 'Meus parabéns, você ganhou!!!';
        playable = false;
    } else if(checkWin(correctLetter, wrongLetter, selectedWord) === 'lose') {
        finalMessage = 'Não foi dessa vez, tente novamente!';
        finalMessageRevealWord = `A palavra correta era ${selectedWord}`
        playable = false;
    }

    useEffect(() => setPlayable(playable));

    return (
        <div className="popup-container" style={finalMessage !== '' ? {display: 'flex'} : {}} >
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={playAgain}>Jogar novamente</button>
            </div>
        </div>
    )
}

export default PopUp
