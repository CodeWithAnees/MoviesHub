import React, { Component } from 'react';

import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import MovieList from './components/movielist';
import MovieDetail from './components/moviedetail';
import PageNotFound from './components/PageNotFound';

import './App.css';

class App extends Component {

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={MovieList}/>
					<Route exact path="/post/:movieId" component={MovieDetail}/>
					<Route path="**" component={PageNotFound} />
				</Switch>
			</Router>
		);
	}
}
export default App;
