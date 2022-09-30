import React from "react";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./App.css";
import LoggedIn from "./components/afterLogin.jsx"
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


function App() {
  
  let email = ''
  let password=''
  const [users, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [showLoggedIn, setShowLoggedIn] = React.useState(false);


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

  //const element = document.getElementById("App").style.display  
  // "email123@email.com", "test1234"
  function log_in() {
    setLoading(true)    
    signInWithEmailAndPassword(auth, email,password)
      
      .then((userCredential) => {
        console.log(`hey youre signed in`);  
        setUser(userCredential.user);
        document.getElementById("appWrapper").style.display = "none"
        setShowLoggedIn(true)
      })
      .catch((error) => {
        alert("User not Found, Try Registering an account")
        setLoading(false)
      });
  }
  function log_out() {
    signOut(auth);
    setUser({});
    console.log("logged out");
     document.getElementById("appWrapper").style.display = "unset"
     setShowLoggedIn (false)
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
        <div id="appWrapper">
          <div className="inputWrapper">
          <input id="email" onInput={(userEmail)} type={'email'} placeholder={'Email'}></input>
          <input id="password" onInput={(userPass)} type={'password'} placeholder={'Password'}></input>
          </div>
          <div className="button__wrapper"> 
              {/* <button className="button" onClick={log_in} >log in</button>  */}
              <Router>
                <Link to="/loggedIn" className="button"  onClick={log_in}>Log in</Link>
              </Router>
          <button className=" button__register" onClick={register}>Register</button>
         
           {loading ? "loading...." : users.email}
         
          </div>
        </div>
      
      {/* <div className="loggedIn__wrapper">
      <Router>
            <Routes>
              <Route path="/loggedIn" element={<LoggedIn></LoggedIn>}></Route>
            </Routes>
        </Router>
        <button className="button" onClick={log_out}>log out</button> 
        </div> */}
        <div className="loggedIn">
          {showLoggedIn ? <LoggedIn logout={log_out}> </LoggedIn>  : ""}
        </div>
        </div>
    </div>
    
 
  );
}

export default App;
