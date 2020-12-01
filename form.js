// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA3bdDNIYKX2H72MxitWA2vwzsO2bSl7Vg",
    authDomain: "form-703c0.firebaseapp.com",
    databaseURL: "https://form-703c0.firebaseio.com",
    projectId: "form-703c0",
    storageBucket: "form-703c0.appspot.com",
    messagingSenderId: "555783755111",
    appId: "1:555783755111:web:ab2adc96ab93961488cbc2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth()

    function signUp(){
        // var voteable;

        var email = document.getElementById("email");      
        var password = document.getElementById("password");
        var confirmpassword = document.getElementById("confirmpassword");

        const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      
        promise.catch(e => alert(e.message));
        if ((password.value == confirmpassword.value) && password.value !=='')
            {
                alert("You are registered");
                location.href = "login.html";
            }
        // voteable="<h1 > <font color=red>INCORRECT DETAILS,press F5 and TRY AGAIN</font> </h1>";document.getElementById("demo").innerHTML = voteable;
       }

       function Login(){
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        

        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(user) {
            if (email.value === "teacher@gmail.com"){
                location.href = "teachers.html";
            }
            else{
                location.href = "home.html";
            } 
         }).catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
         
             if (errorCode === 'auth/wrong-password') {
                 alert('Wrong password.');
             } else {
                 alert(errorMessage);         
             }
             console.log(error);
         });
        // const promise = auth.signInWithEmailAndPassword(email.value, password.value);
      
        // promise.catch(e => alert(e.message));        
        auth.onAuthStateChanged(function(user){      
        if(user){      
         var email = user.email; 
         //alert(email);    
           
                 
        //       
        
     
        }else{        
        //  alert("No Active User");     
         //no user is signed in      
        }       
      
       });
       }
    //    function Register(){
    //     location.href = "signup.html";
    //    }