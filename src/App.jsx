import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Home from './Views/Home'
import MyPokemonList from './Views/MyPokemonList'
import PokemonDex from './Views/PokemonDex'

function App() {
  return (
    <div className="relative pb-10 min-h-screen">
      <Router>
        <Header />

        <div className="p-3">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/list">
              <Home />
            </Route>
            <Route path="/my-pokemon-list">
              <MyPokemonList />
            </Route>
            <Route path="/pokemon/:id">
              <PokemonDex />
            </Route>
          </Switch>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
