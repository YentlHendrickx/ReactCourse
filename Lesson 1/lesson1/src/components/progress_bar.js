function Label(props) {
    // console.warn(color);
    var labelStyle = {
        color: props.color,
        fontSize: '20px',
        fontWeight: 'bold',
        padding: '0px',
        margin: '0px',
    }

    return (
        <p style={labelStyle}>{props.percentage} %</p>
    );
}

function Bar(props) {
    var barLength = "M20 20 l" + ((props.percentage / 100) * 360).toString() + " 0";
    return (
        <svg height="80" width="400">
            <g fill="none" stroke="lightgrey" strokeWidth="25">
                <path strokeLinecap="round" d="M20 20 l360 0" />
            </g>
            <g fill="none" stroke={props.color} strokeWidth="25">
                <path strokeLinecap="round" d={barLength} />
            </g>
        </svg>
    );
}

function ProgressBar(props) {
    // console.warn(props);
    return (
        <div>
            <Label color={props.color} percentage={props.percentage}/>
            <Bar color={props.color} percentage={props.percentage}/>
        </div>
    );
}


export default ProgressBar;