

// Your web app's Firebase configuration
const firebaseConfig = {
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

document.getElementById('reg').addEventListener('click', e => {
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log('login successful from signUp.js')
            console.log(user)
            console.log(`generating user from from signUp.js`)
            usersDb.doc(email).set({
                displayName: `${firstName} ${lastName}`,
                email: email,
                myFood: [],
                myRecipes: [],
                allergies: []
            })
        }).then(redirect =>{
          const profileURL = "profile.html"
          window.location.replace(profileURL)
        })
        .catch(e => {
            console.log('an error has occured from signOut.js')
            console.log(e.message)
        });
})

// Change text in the password field to show text or dots
document.getElementById('showPass').addEventListener('change', e => {
    //e.preventDefault()
    console.log(`showPass is clicked`)
    //console.log(e)
    const password = document.getElementById("password");
    const showPass = document.getElementsByName('showPassword')
    //let showPass = document.getElementById('showPass')
    //console.log(`showPass is ${showPass.checked}`)

    if (showPass[0].checked) {
        //showPass.checked = false
        console.log(`showPass is ${showPass[0].checked}`)
        password.type = 'text'
    } else {
        console.log(`showPass is ${showPass[0].checked}`)
        password.type = 'password'
    }
})

// Add sign off button
document.getElementById('signOut').addEventListener('click', e => {
    auth.signOut()
})

document.getElementById('signOutm').addEventListener('click', e => {
    auth.signOut()
})