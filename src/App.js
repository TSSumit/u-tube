import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import { Provider } from 'react-redux';
import store from './utils/store';
import SearchPage from './components/SearchPage';
import ErrorPage from './components/ErrorPage';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "",
        element: <MainContainer />
      },
      {
        path: "home",
        element: <MainContainer />
      },
      {
        path: "watch",
        element: <WatchPage />
      },
      {
        path: "channel",
        element: <MainContainer />
      },
      {
        path: "results",
        element: <SearchPage />
      },
      {
        path: "shorts",
        element: <ErrorPage error={{ code: 404, title: 'Page Not Found', message: 'Sorry for the inconvenience. This page does not exist.' }} />
      },
      {
        path: "subscriptions",
        element: <ErrorPage error={{ code: 404, title: 'Page Not Found', message: 'Sorry for the inconvenience. This page does not exist.' }} />
      },
      {
        path: "you",
        element: <ErrorPage error={{ code: 404, title: 'Page Not Found', message: 'Sorry for the inconvenience. This page does not exist.' }} />
      },
      {
        path: "history",
        element: <ErrorPage error={{ code: 404, title: 'Page Not Found', message: 'Sorry for the inconvenience. This page does not exist.' }} />
      }
    ]
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="w-full">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
