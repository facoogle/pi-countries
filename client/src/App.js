import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LangingPage/LandingPage';
import Page404 from './Components/Page404/Page404';
import Home from './Components/Home/Home';
import ActivityCreate from './Components/ActivityCreate/ActivityCreate.jsx';



import Detalles from './Components/Detalles/Detalles';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component = {LandingPage}/>
        <Route exact path= '/home'  component = {Home}/>
        <Route exact path= '/home/:ID'  component = {Detalles} />
        <Route exact path= '/activity'  component = {ActivityCreate}/>
        
        <Route exact path= '/*' component = {Page404}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
