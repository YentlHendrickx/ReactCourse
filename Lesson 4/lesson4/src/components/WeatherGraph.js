import {useState} from 'react';

import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

function WeatherGraph({title, lineColor, data, dataType, average}) {

    var cardStyle = {
        width: 640,
        textAlign: 'center',
        padding: 20,
        height: 350,
        
        filter: "drop-shadow(0px 0px 5px #888)"
    };

    return (
        <div className='card' style={cardStyle}>
            <h2>{title} ({dataType})</h2>
            <Sparklines data={data} svgWidth={600} svgHeight={200} margin={5}>
                <SparklinesLine color={lineColor}/>
                <SparklinesReferenceLine type="mean"/>
            </Sparklines>
            <p>{Math.round(average, 1)} {dataType}</p>
        </div>
    );
}

export default WeatherGraph;