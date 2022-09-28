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
  let email = ''
  let password=''
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
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("logged in");
      })
      .catch((error) => {
       alert("Email already exist");
      });
  }
  // "email123@email.com", "test1234"
  function log_in() {
 
    signInWithEmailAndPassword(auth, email,password)
      .then((userCredential) => {
        console.log(`hey youre signed in`);      
        setUser(userCredential.user);
        
      })
      .catch((error) => {
        alert("User not Found, Try Registering an account")
      });
  }
  function log_out() {
    signOut(auth);
    setUser({});
    console.log("logged out");
  }
  function userEmail(){
    email = document.getElementById("email").value
    
  }
  function userPass(){
     password = document.getElementById("password").value
  
  }

  return (
    <div className="App">
      <div className="row">
        <div className="appWrapper">
          <div className="inputWrapper">
          <input id="email" onInput={(userEmail)} type={'email'} placeholder={'Email'}></input>
          <input id="password" onInput={(userPass)} type={'password'} placeholder={'Password'}></input>
          </div>
          <div className="button__wrapper">
          <button className="button" onClick={log_in}>log in</button>
          <button className=" button__register" onClick={register}>Register</button>
          <button className="button" onClick={log_out}>log out</button> 
           {loading ? "loading...." : users.email}
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
