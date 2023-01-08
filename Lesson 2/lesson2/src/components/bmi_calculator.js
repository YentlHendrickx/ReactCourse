import '../range.css'
import { useState } from 'react';


function Label({ text, value }) {
    var labelStyle = {
        fontFamily: "Verdana",
        fontSize : 20
    };

    return (
        <div style={labelStyle}>
            {text} {value}
        </div>

    );
}

function Slider({ value, min, max, onChange }) {
    return (
        <input type="range"
               value={value}
               min={min}
               max={max}
               onChange={onChange} />
    );
}

function BmiSlider({text, value, min, max, onChange}) {

    return (
        <div>
            <Label text={text} value={value}/>
            <Slider value={value} min={min} max={max} onChange={onChange}/>
        </div> 
    );
}

export default function BmiCalculator() {
        var backgroundStyle = {
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 20,
            paddingBottom: 20,
            border: "#333 2px dotted",
            width: 450,
            borderRadius: 10,
            textAlign: "left"
        };

        var labelStyle = {
            fontFamily: "Verdana",
            fontSize : 40
        };


        const [height, setHeight] = useState(170);
        const [weight, setWeight] = useState(75);
        const [bmi, setBmi] = useState(Math.round(weight / ((height / 100) ** 2), 2));

        function updateHeight(event) {
          setHeight(event.target.value);
          updateBmi();
        }

        function updateWeight(event) {
            setWeight(event.target.value);
            updateBmi();
        }

        function updateBmi() {
            setBmi(Math.round(weight / ((height / 100) ** 2), 2));
        }

        return (
            <div style={backgroundStyle}>
                <div style={labelStyle}>BMI Calculator</div>
                <br />
                <BmiSlider text={"Height:"} value={height} min={0} max={250} onChange={updateHeight}/>
                <BmiSlider text={"Weight:"} value={weight} min={0} max={400} onChange={updateWeight}/>
                <BmiSlider text={"BMI:"} value={bmi} min={0} max={50}/>
            </div>
        );
}