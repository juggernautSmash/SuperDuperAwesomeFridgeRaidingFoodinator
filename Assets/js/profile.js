console.log('profile.js is linked')

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

const userDb = firebase.firestore().collection('testDb')

const generateMyRecipeCard = ({id, title, img, url}) => {//Generate recipe card on the DOM based on selected FETCH 
    //console.log(`running generateRecipeCard`)
    let recipeCard = document.createElement('div')
    recipeCard.id = id
    recipeCard.className = 'card'
    recipeCard.innerHTML = `
        <div class='card-content'>
            <a href='${url}'>
            <img src='${img}'
            <span class='card-title'>${title}</span>
            </a>
        </div>
    `
    document.getElementById('myRecipes').append(recipeCard)
}// end generateMyRecipeCard

const getProfile = () => {
  userDb.doc('julius.casipit@gmail.com').get()
    .then(data => {
        console.log(data.data())
        document.getElementById('name').textContent = data.data().displayName
        document.getElementById('email').textContent = data.data().email
    })  

  userDb.doc('julius.casipit@gmail.com').get()
    .then(data => {
        console.log(data.data().myFood)
        document.getElementById('ingredientsList').textContent = data.data().myFood
        document.getElementById('email').textContent = data.data().email
            
    })  

  userDb.doc('julius.casipit@gmail.com').get()
    .then(data => {
        console.log(data.data().myRecipe)
        //document.getElementById('recipe').textContent = data.data().myRecipe
        document.getElementById('email').textContent = data.data().email
        
        data.data().myRecipe.forEach( recipe => {
            generateMyRecipeCard(recipe)
        })

    })   

}



const addIngredientToDOM = ingredient => {//Creates an entry under ingredients with checkbox
    let foodDiv = document.createElement('div')
    foodDiv.id = ingredient
    foodDiv.innerHTML = `
        <li>
           
            <span>${ingredient}</span>
        </li>
    `
    document.getElementById('ingredientsList').append(foodDiv)
}//end addIngredientToDOM
document.getElementById('addItem').addEventListener('click', e => {// Add button action
    e.preventDefault()

    //take value in the text field
    let ingredient = document.getElementById('foodItem').value

    //console.log(ingredient)
    // userIngredients.push(ingredient)
    addIngredientToDOM(ingredient)

    document.getElementById('foodItem').value = ''
})//end ADD button action



getProfile()
