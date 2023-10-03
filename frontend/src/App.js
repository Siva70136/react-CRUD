import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Delete from './components/Delete';
import Update from './components/Update';
import Create from './components/Create';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/protectedRoute'

import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/delete" component={Delete} />
          <ProtectedRoute exact path="/update" component={Update} />
          <ProtectedRoute exact path="/add" component={Create} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
