console.log(`signOut.js is linked`)

// Add sign off button
document.getElementById('signOut').addEventListener('click', e => {
    auth.signOut()
})

document.getElementById('signOutm').addEventListener('click', e => {
    auth.signOut()
})