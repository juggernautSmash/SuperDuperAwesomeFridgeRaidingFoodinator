//console.log('profile.js is linked')
//console.log('getting email info in localStorae')
let email = localStorage.getItem('email')
//console.log(`email is ${email}`)
//let userIngredients = []

const generateMyRecipeCard = ({id, title, img, url}) => {//Generate recipe card on the DOM based on selected FETCH 
    //console.log(`running generateRecipeCard`)
    let recipeCard = document.createElement('div')
    recipeCard.id = id
    recipeCard.className = 'row'
    recipeCard.innerHTML = `
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                    <a href='${url}' target='_blank'>
                    <img src="${img}">
                    </a>
                <!-- <span class="card-title recipe-title">${title}</span> -->
                <a class="btn-floating halfway-fab waves-effect waves-light activator red">
                    <i class="material-icons">clear</i>
                </a>
                </div>
                <div class="card-content blue-grey darken-4">
                    <a href='${url}' target='_blank'>
                        <p class="recipe-title">${title}</p>
                    </a>
                </div>
                <div class="card-reveal blue-grey darken-4 ">
                    <span class="card-title grey-text text-lighten-4">Remove Recipe?
                        <i class="material-icons right">close</i>
                    </span>
                    <button class="waves-effect waves-light red btn deleteRecipe" data-id=${id}>YES</button>
                </div>
            </div>
        </div>
    `
    document.getElementById('myRecipes').append(recipeCard)
} // end generateMyRecipeCard

const addIngredientToDOM = ingredient => {//Creates an entry under ingredients with checkbox
    let foodDiv = document.createElement('li')
    foodDiv.id = ingredient
    foodDiv.innerHTML = `
        <div class="chip">
            ${ingredient}
            <i data-food='${ingredient}' class="close material-icons">close</i>
        </div>
    `
    document.getElementById('ingredientsList').append(foodDiv)
} //end addIngredientToDOM

const getProfile = () => {
    console.log('running getProfile')

    usersDb.doc(email).get()
    .then(data => {

        //Update Personal Info card
        document.getElementById('name').textContent = data.data().displayName
        document.getElementById('email').textContent = data.data().email

        //Update My Food
        data.data().myFood.forEach(food => {
            addIngredientToDOM(food)
            addToLocalStorage('myFood', food)
        })

        //Update My Recipes
        data.data().myRecipes.forEach( recipe => {
            generateMyRecipeCard(recipe)
            addToLocalStorage('myRecipes', recipe)
        })
    }) // end this
    .catch( e => {
        console.log('an error has occured')
        console.log(e)
    }) // end catch 
    //Remove preloader
    document.getElementById('preload').remove()
} // end getProfile

const addToLocalStorage = (key, value) =>{
    console.log(`running addToLocalStorage`)
    if(localStorage.getItem(key) === null){
        console.log(`${key} does not exist`)
    } else {
        //Get the value in localStorage   
        let keyValue = JSON.parse(localStorage.getItem(key))

        switch (key){
            case 'myFood':
                //console.log(`running case myFood`)
                //console.log(`check is ${keyValue.findIndex( food => food === value) < 0}`)
                if(keyValue.findIndex( food => food === value) < 0){
                    //console.log(`adding to localStorage myFoods`)
                    keyValue.push(value)
                    localStorage.setItem(key,JSON.stringify(keyValue))
                    usersDb.doc(email).update({
                        myFood: firebase.firestore.FieldValue.arrayUnion(value)
                    })
                } else {
                    console.log(`${value} is already in localStorage`)
                }
                break;
            case 'myRecipes':
                //console.log('running case myRecipes')
                //console.log(`check is ${keyValue.findIndex( recipe => recipe.id === value.id)}`)
                if(keyValue.findIndex( recipe => recipe.id === value.id) < 0){
                    //console.log(`adding to localStorage myRecipes`)
                    keyValue.push(value)
                    localStorage.setItem(key,JSON.stringify(keyValue))
                    usersDb.doc(email).update({
                        'myRecipes': keyValue
                    })
                } else {
                    console.log(`${value.title} is already in localStorage`)
                }
                break;
            default:
                console.log(`${key} is unhandled`)
        } // end switch 
    } // end else
} //end addToLocalStorage

const removeFromLocalStorage = (key, value) => {
    console.log(`running removeFromLocalStorage`)
    switch (key){
        case 'myFood':
            let keyValue = JSON.parse(localStorage.getItem(key)) //
            keyValue.splice(keyValue.indexOf(value), 1)
            localStorage.setItem(key,JSON.stringify(keyValue))
            break;
        case 'myRecipes':
            let storedRecipes = JSON.parse(localStorage.getItem('myRecipes'))
            let myRecipeIndex = storedRecipes.findIndex( recipe => recipe.id === value)  
            storedRecipes.splice(myRecipeIndex,1)
            localStorage.setItem('myRecipes', JSON.stringify(storedRecipes))
            usersDb.doc(email).update({
                'myRecipes': storedRecipes
            })
        default:
            console.log(`The key is ${key}`)
    }
} //end removeFromLocalStorage

document.getElementById('addItem').addEventListener('click', e => {// Add button action
    console.log(`add button is pressed`)
    e.preventDefault()

    //take value in the text field
    let ingredient = document.getElementById('foodItem').value

    if(ingredient === ''){//handler if no ingredients text
        swal("Please input an ingredient")
    } else if(JSON.parse(localStorage.getItem('myFood')).indexOf(ingredient) >= 0 ){//if ingredient is already in the list
        swal(`${ingredient} is already in your list`)
    } else{ // if ingredient is not in the list
        //userIngredients.push(ingredient)
        addIngredientToDOM(ingredient)

        // add food ingredient to localStorage
        addToLocalStorage('myFood', ingredient)
    } // end else if

    // Clear the text field
    document.getElementById('foodItem').value = ''
})//end ADD button action

document.addEventListener('click', ({target}) => {

    switch(target.className ){
        case 'close material-icons':
            // Remove from firestore
            usersDb.doc(email).update({
                myFood: firebase.firestore.FieldValue.arrayRemove(target.dataset.food)
            })
            // Remove from localStorage
            removeFromLocalStorage('myFood', target.dataset.food )
            break;
        case 'waves-effect waves-light red btn deleteRecipe':
            document.getElementById(target.dataset.id).remove()
            removeFromLocalStorage('myRecipes', target.dataset.id)
            break;
    }
}) // end event listener

//wait 5 seconds before getProfile
setTimeout( getProfile, 5000)