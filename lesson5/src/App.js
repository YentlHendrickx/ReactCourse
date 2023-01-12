import './App.css';
import { RecoilRoot } from 'recoil';

// import Hello from './components/hello';
// import CharacterCounter from './components/recoil_character_counter';
// import TodoList from './components/todo_list';
import WeatherForecast from './components/weather_forecast'


function App() {
  return (
    <RecoilRoot>
      {/* <Hello /> */}
      <WeatherForecast/>
    </RecoilRoot>
    );
}

export default App;
