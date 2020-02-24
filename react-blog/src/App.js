import React from 'react';
import './App.css';
import {Post} from './Post';
import {
  BrowserRouter,
  StaticRouter,
  Switch,
  Route,
} from 'react-router-dom';
import {PostList} from './PostList';
import {Header} from './Header';
import {isBrowser} from './util/env.util';

function App(props) {

  const Router = isBrowser() ? BrowserRouter : StaticRouter;

  const { renderingOptions, postContent, toc } = props;

  function onClickMenu() {
    document.body.classList.remove('menu-open');
  }

  return (
    <Router location={props.location}>
      <Header options={renderingOptions}></Header>
      <section className="page-menu" onClick={() => onClickMenu()}>
        <PostList toc={toc}></PostList>
      </section>
      <section className="page-content">
        <Switch>
          <Route path="/posts/:id">
            <Post content={postContent}></Post>
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;