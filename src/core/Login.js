import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";
import {useHistory} from 'react-router-dom';

const Login = () => {
    const history = useHistory()
    const handleLogin=()=>{
        var firebaseConfig = {
            apiKey: "AIzaSyAAkzHSqj7DYMgtkvNS6jcs7tuo4b9Ew-4",
            authDomain: "meeting-maneger.firebaseapp.com",
            projectId: "meeting-maneger",
            storageBucket: "meeting-maneger.appspot.com",
            messagingSenderId: "320036068179",
            appId: "1:320036068179:web:59599fbba2eafd66379fa6",
            measurementId: "G-6S60XBCP2B"
          };
          // Initialize Firebase
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          } else {
            firebase.app(); // if already initialized, use that one
          }
      
          var provider = new firebase.auth.GoogleAuthProvider();
      
          firebase
            .auth()
            .signInWithPopup(provider)
            .then((data) => {
              const user = data.user
              // console.log(user);
              fetch("https://meetingmanagerapi.pythonanywhere.com/api/login",{
                method:"POST",
                mode:"cors",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
              })
              .then(response=>{
                  return response.json()
              })
              .then(resp=>{
                  if (resp.status==="ok"){
                      Cookies.set("userId",resp.user.id,{expires:365})
                      history.push("/")
                  }
              })
              .catch(err=>{
                  console.log(err);
              })

            })
    }
    return ( 
        <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
            <div className="btn btn-primary" onClick={handleLogin}>
            Login</div>
        </div>
     );
}
 
export default Login;