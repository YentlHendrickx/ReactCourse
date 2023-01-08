import { useNavigate } from 'react-router-dom';
import CapitalsApi from '../apis/capitals_api';
import HighscoresApi from '../apis/highscores_api';
import { useState } from 'react';
import InputForm from './input_form';


function GetQuestion({questNumber, handleGuess}) {
    const capitalsApi = new CapitalsApi();

    // Pick country
    const country = capitalsApi.get(questNumber).country;
    const answers = capitalsApi.getAnswers(questNumber).map((answer) => {
        return (
            <div className='city' onClick={() => handleGuess(answer)}>
                {answer}
            </div>
        );
    })
    
    return (
        <div>
            <p>{questNumber + 1}. Which city is the capital of {country}?</p>
            {answers}
        </div>
    );
}

function Game() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const capitalsApi = new CapitalsApi();
    const navigate = useNavigate();

    function handleGuess(answer) {
        const capital = capitalsApi.get(current).capital;

        if (capital === answer) {
            setScore(score + 1);
        }

        // If last country
        if (capitalsApi.count() > (current + 1)) {
            setCurrent(current + 1);
        } else {
            setGameOver(true);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const hscoreApi = new HighscoresApi();
        hscoreApi.add(event.target[0].value, score);
        navigate('/');
    }

    if (gameOver) {
        return (
            <div>
                <h2>Game</h2>
                <p>The end! Score: {score}/{capitalsApi.count()}</p>
                <InputForm caption={"Submit"} submitItem={handleSubmit}/>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Game</h2>
                <GetQuestion questNumber={current} handleGuess={handleGuess}/>
            </div>
        );
    }
}

export default Game;