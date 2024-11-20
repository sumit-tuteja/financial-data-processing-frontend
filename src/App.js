import './App.css';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';

const AppRoutes = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <div className="App">
      <br/>
      <br/>
      <Router>
        <AppRoutes/>
      </Router>
    </div>
  );
}

export default App;
