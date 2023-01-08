function Header(number) {
    var headerStyle = {
        fontSize : 50,
        color: "#e65100",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#ff9800"
    };
    
    var numbers = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]

    return (
        <div style={headerStyle}>{numbers[number.number]}</div>
    );
}
  
  
function Row(factor1, factor2) {
    var cellStyle = {
        fontSize : 20,
        color: "#455a64"
    };
    
    return (
      <div style={cellStyle}>{factor1} x {factor2} = {factor1 * factor2}</div>  
    );
}

function Table(props) {
    var tableStyle = {
        fontFamily : "Comic Sans MS",
        textAlign: "center",
        width: 200,
        padding: 0,
        borderRadius: 20,
        backgroundColor: "#ffe0b2",
        filter: "drop-shadow(0px 0px 5px #666)"
    }    

    let rows = [];
    for (var i = 1; i <= 10; i++) {
        rows.push(Row(i, props.number));
    }

    return (
        <div style={tableStyle}>
            <Header number={props.number} />
            {rows}
        </div>
    );
}

export default Table;
  