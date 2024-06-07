import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import Head from './components/Head';
import { Provider } from 'react-redux';
import store from './utils/store';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />
      },
      {
        path: "watch",
        element: <WatchPage />
      },
      {
        path: "channel",
        element: <MainContainer />
      }
    ]
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="w-full">
        <Head />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
