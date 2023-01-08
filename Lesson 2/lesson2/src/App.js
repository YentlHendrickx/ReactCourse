import './App.css';

import { students } from './data';
import { ListMap } from './components/lists';
import Counter from './components/counter';
import LightningCounter from './components/lightning_counter';
import Plus3Counter from './components/count_to_three';
import ControlledComponent from './components/controlled_component';
import Form from './components/form';
import Accordion from './components/accordion';
import calculator from './components/calculator';
import Calculator from './components/calculator';
import BmiCalculator from './components/bmi_calculator';

function App() {
  return (
    <div>
      <BmiCalculator/>
      {/* <Accordion />
      <Form />
      <ControlledComponent/>
      <Plus3Counter />
      <LightningCounter />
      <Counter />
      <ListMap students={students} /> */}
      {/* <Calculator /> */}
    </div>
  );
}

export default App;
