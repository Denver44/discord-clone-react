import React, { useEffect } from 'react';
import Sidebar from '../SideBar';
import Chat from '../Chat';
import { selectUser } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login';
import { auth } from '../../firebase/firebase';
import { login, logout } from '../../features/userSlice';
import './style.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
