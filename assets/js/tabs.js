console.log('tabs.js is linked')

// Tabs
const allResultsElem = document.getElementById('allResults')
const yesMakeElem = document.getElementById('yesMake')
const noMakeElem = document.getElementById('noMake')

// Tab Content
const allRecipesElem = document.getElementById('allRecipes')
const makeNowElem = document.getElementById('makeNow')
const makeLaterElem = document.getElementById('makeLater')

allResultsElem.addEventListener('click', e =>{
    console.log(`All Results tab is pressed`)
    
    allRecipesElem.className === 'hide' ? allRecipesElem.className = '' : null
    makeNowElem.className === '' ? makeNowElem.className += 'hide' : null
    makeLaterElem.className === '' ? makeLaterElem.className += 'hide' : null
})

yesMakeElem.addEventListener('click', e =>{
    console.log(`Make Now tab is pressed`)

    allRecipesElem.className === '' ? allRecipesElem.className = 'hide' : null
    makeNowElem.className === 'hide' ? makeNowElem.className = '' : null
    makeLaterElem.className === '' ? makeLaterElem.className = 'hide' : null
})

noMakeElem.addEventListener('click', e =>{
    console.log(`Some Grocery tab is pressed`)

    allRecipesElem.className === '' ? allRecipesElem.className = 'hide' : null
    makeNowElem.className === '' ? makeNowElem.className = 'hide' : null
    makeLaterElem.className === 'hide' ? makeLaterElem.className = '' : null
})