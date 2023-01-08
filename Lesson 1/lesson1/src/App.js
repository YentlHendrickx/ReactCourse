import Hello from './components/hello';
import Letter from './components/letter';
import Card from './components/color_card';
import MultiplicationTable from './components/multiplication_table';
import Rater from './components/rater';
import ProgressBar from './components/progress_bar';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Card color="#FFA737"/> */}
      {/* <Hello target="Batman" />
      <Hello target="Bono" />

      <Letter bgcolor="#58B3FF">A</Letter>
      <Letter bgcolor="#FF605F">E</Letter>
      <Letter bgcolor="#FFD52E">I</Letter>
      <Letter bgcolor="#49DD8E">O</Letter>
      <Letter bgcolor="#AE99FF">U</Letter>
      
      <MultiplicationTable number="9" />
      <br/>
      <MultiplicationTable number="3" /> */}

      {/* <Rater rating="2" max="4" /> */}
      <ProgressBar percentage="75" color="#ce4b99" />
      <ProgressBar percentage="15" color="#ce1b29" />
      <ProgressBar percentage="65" color="#125b69" />

    </div>
  );
}

export default App;
