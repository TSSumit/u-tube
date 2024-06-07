import React from 'react'
import { Provider } from 'react-redux';
import store from '../utils/store';
import { Outlet } from 'react-router-dom';
import Dropdown from './Dropdown';

function Body() {;
  return (
    <Provider store={store}>
      <div className='flex overflow-x-hidden max-h-100vh max-w-100vw'>
          <Dropdown/>
          <Outlet/>
      </div>
    </Provider>
  )
}

export default Body