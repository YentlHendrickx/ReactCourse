import {useState, useEffect} from 'react';

function Label({ number }) {
  const labelStyle = {
    color: "#66FFFF",
    fontSize: 50
  };

  return (
    <h1 style={labelStyle}>{number}</h1>
  );
}

function LightningCounter() {
  const [count, setCount] = useState(0);

  const divStyle = {
    width: 250,
    textAlign: "center",
    backgroundColor: "black",
    padding: 40,
    fontFamily: "sans-serif",
    color: "#999",
    borderRadius: 10
  };

  const textStyles = {
    emphasis: {
      fontSize: 38
    },
    small: {
      fontSize: 17,
      opacity: 0.5
    }
  };

  function add100Strikes() {
    setCount(count + 100);
  }


  useEffect(() => {
    const interval = setInterval(add100Strikes, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div style={divStyle}>
      <Label number={count}/>
      <h2>LIGHTNING STRIKES</h2>
      <h2 style={textStyles.emphasis}>WORLDWIDE</h2>
      <p style={textStyles.small}>(since you loaded this example)</p>
    </div>
  );
}

export default LightningCounter;