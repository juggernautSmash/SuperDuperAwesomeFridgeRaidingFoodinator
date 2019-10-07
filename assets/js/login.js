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