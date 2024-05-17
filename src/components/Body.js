import React from 'react'
import Slidebar from './Slidebar'
import Head from './Head'
import { Provider } from 'react-redux';
import store from '../utils/store';
import MainContainer from './MainContainer';

function Body() {;
  return (
    <Provider store={store}>
      <div className='flex overflow-hidden max-h-screen max-w-screen'>
          <Slidebar/>
          <section>
              <Head/>
              <MainContainer/>
          </section>
      </div>
    </Provider>
  )
}

export default Body