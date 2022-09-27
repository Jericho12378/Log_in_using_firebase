import React from "react";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./App.css";
import Register from "./components/Register.jsx";

function App() {
  const [users, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("Register");
    createUserWithEmailAndPassword(auth, "email123@email.com", "test1234")
      .then((user) => {
        console.log("logged in");
      })
      .catch((error) => {
        console.log("Error Log In");
      });
  }

  function log_in() {
    setLoading(true);
    signInWithEmailAndPassword(auth, "email123@email.com", "test1234")
      .then((userCredential) => {
        console.log(`hey youre signed in`);
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log("error");
      });
  }
  function log_out() {
    signOut(auth);
    setUser({});
    console.log("logged out");
  }

  return (
    <div className="App">
      <div className="row">
        <div className="appWrapper">
          <div className="inputWrapper">
          <input type={'email'} placeholder={'Email'}></input>
          <input type={'password'} placeholder={'Password'}></input>
          </div>
          <div className="button__wrapper">
          <button className="button" onClick={log_in}>log in</button>
          <button className=" button__register" onClick={register}>Register</button>
         {/* <button className="button" onClick={log_out}>log out</button> */}
          {loading ? "loading...." : users.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
