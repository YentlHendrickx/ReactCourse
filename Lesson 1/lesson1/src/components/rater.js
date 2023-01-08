
function Label(score) {

    var labelText = "";
    score = score.score;

    switch (true) {
        case score < 0.1:
            labelText = "disaster";
        break;
        case score < 0.3:
            labelText = "insufficient";
        break;
        case score < 0.5:
            labelText = "sufficient";
        break;
        case score < 0.6:
            labelText = "average";
        break;
        case score < 0.8:
            labelText = "good";
        break;
        case score < 0.9:
            labelText = "very good";
        break;
        case score > 0.9:
            labelText = "excellent";
        break;
        default:
        break;
    }

    return (
        <p>{labelText}</p>
    );
}

function Star(mode) {
    var baseUrl = process.env.PUBLIC_URL + "/images/Star";
    var imgSrc = mode === true ? baseUrl + "On.png" : baseUrl + "Off.png";

    return (
       <img src={imgSrc} alt="Star" />
    );
}

function Rater(props) {
    var stars = []

    for (var i = 1; i <= props.max; i++) {
        var starMode = false;
        starMode = props.rating >= i ? true : false;
        stars.push(Star(starMode));
    }

    return (
        <div>
            <Label score={props.rating / props.max} />
            {stars}
        </div>
    );
}


export default Rater;