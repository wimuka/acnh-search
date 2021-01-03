import React, { Fragment } from 'react';

import { VillagerState } from './context/villager/VillagerState';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import VillagersList from './components/pages/VillagersList';
import VillagerCard from './components/villagers/VillagerCard';
import SearchList from './components/pages/SearchList';
import SearchCard from './components/search/SearchCard';
import ItemsList from './components/pages/ItemsList';
import ItemsCard from './components/items/ItemsCard';
import ClothesList from './components/pages/ClothesList';
import ClothesCard from './components/clothes/ClothesCard';
import DiyList from './components/pages/DiyList';
import DiyCard from './components/diy/DiyCard';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Ubuntu',
      'Roboto',
      'Helvetica',
      'Arial',
      'Bungee',
      'sans-serif',
    ].join(','),
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <VillagerState>
          <Fragment>
            <Navbar />
            <Container maxWidth='sm' className='root'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/villagers' component={VillagersList} />
                <Route exact path='/villagers/:id' component={VillagerCard} />
                <Route exact path='/search' component={SearchList} />
                <Route exact path='/search/:id' component={SearchCard} />
                <Route exact path='/items' component={ItemsList} />
                <Route exact path='/items/:id' component={ItemsCard} />
                <Route exact path='/clothes' component={ClothesList} />
                <Route exact path='/clothes/:id' component={ClothesCard} />
                <Route exact path='/diy' component={DiyList} />
                <Route exact path='/diy/:id' component={DiyCard} />
              </Switch>
            </Container>
          </Fragment>
        </VillagerState>
      </ThemeProvider>
    </Router>
  );
};

export default App;
