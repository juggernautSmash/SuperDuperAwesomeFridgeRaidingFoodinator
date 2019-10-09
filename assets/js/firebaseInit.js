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

const usersDb = firebase.firestore().collection('users')

// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: './profile.html',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
}

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth())

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig)

// simplify auth method
const auth = firebase.auth()

auth.onAuthStateChanged(user => {
    if (user) { // If signed in, disable sign in button and enable sign out button
        //document.getElementById('firebaseui-auth-container').style.display = 'none'
        console.log(`user is signed in`)
        document.getElementById('signOut').classList.remove('hide')
        document.getElementById('signOutm').classList.remove('hide')

        //Check if the user exists
        //let exists = false
        console.log(`user email is ${user.email}`)
        usersDb.doc(user.email).get().then( r => {
            if( r.exists ){//If the user exists
                //push email to localStorage
                console.log(`user exists`)
                console.log(`storing user info from firebase to localStorage`)
                localStorage.setItem('email', r.data().email)
                localStorage.setItem('myFood', JSON.stringify(r.data().myFood))
                localStorage.setItem('myRecipes', JSON.stringify(r.data().myRecipes))
            } else {// if the user does not exist, most likely new user
                console.log(`user does not exist`)
                console.log(`creating user profile in firestore`)
                //Create a user profile in firestore 
                let userObj = {
                    displayName: user.displayName,
                    email: user.email,
                    myFood: [],
                    myRecipes: [],
                    allergies: []
                    }
                console.log(`storing generated user info to localStorage`)
                usersDb.doc(user.email).set(userObj)
                localStorage.setItem('email', userObj.email)
                localStorage.setItem('myFood', JSON.stringify(userObj.myFood))
                localStorage.setItem('myRecipes', JSON.stringify(userObj.myRecipes))            
            }
        })
    } else { // if signed out display sign in button and disable sign out button
        //document.getElementById('firebaseui-auth-container').style.display = 'block'
        console.log(`user is signed out`)
        document.getElementById('signOut').classList += 'hide'
        document.getElementById('signOutm').classList += 'hide'

        //Remove email from local storage
        localStorage.removeItem('email')
        localStorage.removeItem('myFood')
        localStorage.removeItem('myRecipes')
    }
})

// Add sign off button
document.getElementById('signOut').addEventListener('click', e => {
    auth.signOut()
})

document.getElementById('signOutm').addEventListener('click', e => {
    auth.signOut()
})