import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyBGwXX4tCj3p1-jCk0VnGNGM-R0LKVZzgk",
    authDomain: "nbaapp-3011.firebaseapp.com",
    databaseURL: "https://nbaapp-3011.firebaseio.com",
    projectId: "nbaapp-3011",
    storageBucket: "nbaapp-3011.appspot.com",
    messagingSenderId: "371114003194"
};


firebase.initializeApp(config);

const db = firebase.database();
const firebaseArticles = db.ref('articles');
const firebaseTeams = db.ref('teams');
const firebaseVideos = db.ref('videos');


const firebaselooper = (snapshot) =>{
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });

    return data;
}

export {
    firebase, db, firebaseArticles, firebaseTeams, firebaseVideos, firebaselooper
}