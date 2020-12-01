var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();   

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

document.getElementById("select").onclick = function(e){

    var input = document.createElement('input');
    input.type= 'file';
    input.click();

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function(){
            document.getElementById("myimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

document.getElementById('upload').onclick = function(){
    
    ImgName = document.getElementById('Namebox').value;
    var uploadTask = firebase.storage().ref('Images/'+ImgName+".jpeg").put(files[0]);
    
    uploadTask.on('state_changed', function(snapshot){

        
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);});
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('upProgress').innerHTML = 'Upload'+progress+'%';
        // console.log('Upload is ' + progress + '% done');

    },
    function(error){
        alert('error in saving the image');
    },
    // function() {
    // // Handle successful uploads on complete
    // // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //         console.log('File available at', downloadURL);
    //     });
    // });

    function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            ImgUrl = url;
        alert('image added successfully');
        firebase.database().ref('Pictures/'+ImgName).set({
           Name: ImgName,
           Link: ImgUrl  
        });
        
        }
    );
        
});
} 

document.getElementById('retrieve').onclick = function(){

ImgName = document.getElementById('Namebox').value;

firebase.database().ref('Pictures/'+ImgName).on('value', function(snapshot){
    document.getElementById('myimg').src = snapshot.val().Link;
    document.getElementById('myVideo').src = snapshot.val().Link;
});
}