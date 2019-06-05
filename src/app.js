import './scss/index.scss';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/Footer';
import Main from './components/Main';

ReactDOM.render(
  <Fragment>
    <Footer/>
    <Main/>
  </Fragment>, document.getElementById('root'),
);
