import React from 'react'
import Slidebar from './Slidebar'
import Head from './Head'
import { Provider } from 'react-redux';
import store from '../utils/store';
import MainContainer from './MainContainer';

function Body() {;
  return (
    <Provider store={store}>
      <div className='flex overflow-x-hidden max-h-100vh max-w-100vw'>
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