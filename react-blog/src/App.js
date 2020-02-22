import React from 'react';
import './App.css';
import {Post} from './Post';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {PostList} from './PostList';
import {Header} from './Header';

function App() {
  return (
    <Router>
      <Header></Header>
      <section className="page-menu">
        <PostList></PostList>
      </section>
      <section className="page-content">
        <Switch>
          <Route path="/posts/:id">
            <Post></Post>
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
