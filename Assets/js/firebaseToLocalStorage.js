// Initialize Firebase
// This is the code we copied and pasted from our app page
const config = {
  apiKey: "AIzaSyC0N5n6Wa6j4I_UX0DJ2Td1aymh7l2UVq8",
  authDomain: "sdafrf-442fb.firebaseapp.com",
  databaseURL: "https://sdafrf-442fb.firebaseio.com",
  projectId: "sdafrf-442fb",
  storageBucket: "sdafrf-442fb.appspot.com",
  messagingSenderId: "1079646422636",
  appId: "1:1079646422636:web:73b3bec708ef08768f7a49"
}

firebase.initializeApp(config)

// VARIABLES
// --------------------------------------------------------------------------------

// Get a reference to the database service
const db = firebase.firestore()


if (localStorage.getItem('email')) {
  let email = localStorage.getItem('email')
} else {
  alert('Not signed in')
}

// On Click of Button
document.querySelector('#click-button').addEventListener('click', e => {

  //  Store User Data from Firebase to localStorage
  db.collection('testDb').doc(email)
    .get()
    .then(x => {
      localStorage.setItem('myFood', x.data().myFood)
      localStorage.setItem('myRecipe', JSON.stringify(x.data().myRecipe))
    })

})
