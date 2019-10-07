console.log('login.js is linked')

// Get elements
const emailIn = document.getElementById('email')
const passwordIn = document.getElementById('pass')
const loginBtn = document.getElementById('login')
const signUpBtn = document.getElementById('signUp')
const signOutBtn = document.getElementById('signOut')
const signOutBtnM = document.getElementById('signOutm')

loginBtn.addEventListener('click', e => {
    e.preventDefault()
    // Get email and password
    const email = emailIn.value
    const password = passwordIn.value

    if(email.length !== 0){
        console.log(`
        email is ${email}
        password is ${password}
        `)

        auth.signInWithEmailAndPassword(email, password)
        .then(r => {
            console.log('login successful')
            console.log(r)
    
        })
        .catch(e => {
            console.log('an error has occured')
            console.log(e.message)
        })
    } else{
        swal('Please enter user')
    }

})

signUpBtn.addEventListener('click', e => {
    e.preventDefault()
    // Get email and password
    const email = emailIn.value
    const password = passwordIn.value

    auth.createUserWithEmailAndPassword(email, password)
    .then(r => {
        console.log('login successful')
        console.log(r)
    })
    .catch(e => {
        console.log('an error has occured')
        console.log(e.message)
    });
})

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
                localStorage.setItem('email', JSON.stringify(r.data().email))
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

// Change text in the password field to show text or dots
document.getElementById('showPass').addEventListener('change', e => {
    //e.preventDefault()
    console.log(`showPass is clicked`)
    //console.log(e)
    let password = document.getElementById("pass");
    let showPass = document.getElementsByName('showPassword')
    //let showPass = document.getElementById('showPass')
    //console.log(`showPass is ${showPass.checked}`)

    if(showPass[0].checked) {
        //showPass.checked = false
        console.log(`showPass is ${showPass[0].checked}`)
        password.type = 'text'
    } else {
        console.log(`showPass is ${showPass[0].checked}`)
        password.type = 'password'
    }

})