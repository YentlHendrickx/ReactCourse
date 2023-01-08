import { useState } from 'react';

function Number({ display }) {
  var textStyle = {
    fontSize: 72,
    fontFamily: "sans-serif",
    color: "#333",
    fontWeight: "bold"
  };

  return (
    <div style={textStyle}>
      {display}
    </div>
  );
}

function Button({operation, onClick}) {
  return (
    <button onClick={(event) => onClick(event, operation)}>
      {operation}
    </button>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  const backgroundStyle = {
    padding: 50,
    backgroundColor: "#FFC53A",
    width: 250,
    height: 100,
    borderRadius: 10,
    textAlign: "center"
  };
  
  function handleClick(event, operation) {
    if (event.shiftKey) {
      if (operation === "+") {
        setCount(count + 10);
      } else {
        setCount(count - 10);
      }
    } else {
      if (operation === "+") {
        setCount(count + 1);
      } else {
        setCount(count - 1);
      } 
    }
  }

  return (
    <div style={backgroundStyle}>
      <Number display={count}/>
      <Button operation="+" onClick={handleClick} />
      <Button operation="-" onClick={handleClick} />
    </div>
  );
}

export default Counter;