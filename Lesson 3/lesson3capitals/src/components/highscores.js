import HighscoresApi from '../apis/highscores_api';
import { useNavigate, Link } from 'react-router-dom'

function Highscores() {

    const navigate = useNavigate();

    const highscores = new HighscoresApi().all().map((highscore) => {
        return (
            <li key={highscore.player}>
                {highscore.player} - {highscore.score}
            </li>
        );
    });

    return (
        <div>
            <h2>Highscores</h2>
            <ol>
                {highscores}
            </ol>
            <Link onClick={() => navigate(-1)}>Back</Link>
        </div>
    );
}

export default Highscores;