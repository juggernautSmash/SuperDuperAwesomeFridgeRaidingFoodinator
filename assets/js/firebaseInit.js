console.log('firebaseInit.js is linked')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyC0N5n6Wa6j4I_UX0DJ2Td1aymh7l2UVq8',
    authDomain: 'sdafrf-442fb.firebaseapp.com',
    databaseURL: 'https://sdafrf-442fb.firebaseio.com',
    projectId: 'sdafrf-442fb',
    storageBucket: 'sdafrf-442fb.appspot.com',
    messagingSenderId: '1079646422636',
    appId: '1:1079646422636:web:73b3bec708ef08768f7a49'
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const usersDb = firebase.firestore().collection('testDb')