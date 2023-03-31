import './style/style.css';
import './meal-list.js'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', ()=> {
        renderData();
});
const renderData =async () => {
    try {       
        let urls = []
        const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        alphabet.forEach((letter)=>{
            urls.push(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        })
        const requests = urls.map(async(url)=>await axios.get(url))
        const allData = await axios.all(requests).then((responses)=>{
            var dataAll = []
            responses.forEach((response)=>{
                if(response.data.meals != null){
                    let hasil = response.data.meals
                    dataAll = [...dataAll,...hasil]
                }
            })
            return dataAll
        })
        const data = await allData
        const mealListElement = document.createElement('meal-list');
        mealListElement.meals = data
        const main = document.querySelector('main');
        main.appendChild(mealListElement)
    } catch (error) {
        console.log(error)
    }
}
const searchMeal = document.querySelector('#searchMeal')
searchMeal.addEventListener('input',(e)=> filterMeal(e))
const filterMeal = (e)=>{
    e.preventDefault()
    const searchMeal = document.querySelector('#searchMeal')
    const filter = searchMeal.value;
    const meals = document.querySelectorAll('article-item')
    meals.forEach((meal)=>{

        let title = meal.firstChild.nextSibling.nextSibling.nextSibling.textContent
        if(title.toLowerCase().includes(filter.toLowerCase())){
            meal.style.display = ''
        }
        else{
            meal.style.display = 'none'
        }
    })
}


