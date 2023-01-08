import { useState } from 'react';

function Label({text}) {
    var labelStyle = {
        fontFamily: "Verdana",
        color: "#FFF",
        fontSize : 30
    };

    return (
        <div style={labelStyle}>{text}</div>
    );
}

function Button({value, onClick}) {
    var buttonStyle = {
        fontFamily: "Verdana",
        fontSize: 20,
        margin: 5,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        color: "#FFF",
        borderStyle: "solid",
        borderColor: "#CCCCCC",
        borderRadius: 5,
        width: 70,
        height: 70
    };

    return (
        <button style={buttonStyle} onClick={onClick} value={value}>{value}</button>
    );
}

export default function Calculator() {
        var backgroundStyle = {
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: "#00ace6",
            width: 330,
            borderRadius: 10,
            textAlign: "left"
        };

        const [text, setText] = useState("");

        function handleClick(event) {
            var chosenNum = event.target.value;
            console.warn(chosenNum);
    
            switch (chosenNum) {
                case "C":
                    setText("");
                    break;
                case "Del":
                    setText(text.substring(0, text.length -1));
                    break;
                case "=":
                    setText(eval(text));
                    break;
                default:
                    setText(text + chosenNum);
                    console.warn("YEET");
                break;
            }
        }

        var numbers = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=", "/"];

        var numbersArray = [];
        for (var i = 0; i < numbers.length; i++) {
            numbersArray.push(<Button onClick={(event) => handleClick(event)} key={numbers[i]} value={numbers[i]}/>);
        }

        return (
            <div style={backgroundStyle}>
                <Label text={text}/>
                {numbersArray}
            </div>
        );
}