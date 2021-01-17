import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import { Home, Login, Register } from './components/pages';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Container>
    </Router>
  );
}

export default App;