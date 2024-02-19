
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TicketComponent from './components/ticket/TicketComponent';
import BoardComponent from './components/boards/BoardComponent';

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BoardComponent/>,
  },
  {
    path: "/boards/:boardId",
    element: <TicketComponent/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
