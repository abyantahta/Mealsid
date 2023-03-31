import './style/style.css';
import axios from 'axios'

document.addEventListener('DOMContentLoaded', function () {
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
                const container = document.getElementById('container')
                data.forEach(meal => {
                    const article = document.createElement("article")
                    article.classList.add('item')
                    article.addEventListener('click',() =>mealDetails(meal.idMeal))
                    let mealItem = `            
                        <div class="img">
                            <img src=${meal.strMealThumb} alt="">
                        </div>
                        <h3>${meal.strMeal}</h3>`
                    
                    article.innerHTML = mealItem
                    container.appendChild(article)
                })
    } catch (error) {
        console.log(error)
    }
}
const searchMeal = document.querySelector('#searchMeal')
searchMeal.addEventListener('input',async (e)=>{
    e.preventDefault()
    e.preventDefault()
    const searchMeal = document.querySelector('#searchMeal')
    const filter = searchMeal.value;
    const meals = document.querySelectorAll('article')
    
    meals.forEach((meal)=>{
        let title = meal.firstChild.nextSibling.nextSibling.nextSibling.textContent
        if(title.toLowerCase().includes(filter.toLowerCase())){
            meal.style.display = ''
        }
        else{
            meal.style.display = 'none'
        }
    })
})
const mealDetails = async (id)=>{
    const response = await axios.get(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data =  await response.data.meals[0];

    var ingredients="";
    for(let i =1;i<20;i++){
        if(data[`strIngredient${i}`] == '' || data[`strIngredient${i}`] == null) break;
        ingredients += `${data[`strIngredient${i}`]}(${data[`strMeasure${i}`]}) , `
    }
    const overflow = document.createElement('div')
    overflow.classList.add('overflow')
    overflow.innerHTML = `
        <div class="popUp">
            <div class="content">
                <div class="row-1">
                    <div class="img">
                        <img src="${data.strMealThumb}" alt="">
                    </div>
                    <div class="details">
                        <h2 class="mealName">${data.strMeal}</h2>
                        <table>
                            <tr>
                                <td>Area</td>
                                <td>:  ${data.strArea}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>:  ${data.strCategory}</td>
                            </tr>
                            <tr>
                                <td>Ingredients</td>
                                <td>:  ${ingredients}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row-2">
                    <h2>How to make</h2>
                    <h4>${data.strInstructions}</h4>
                </div>
            </div>
            <div class="closeButton">
                <span></span>
                <span></span>
            </div>
        </div>`
        const body = document.querySelector('body')
        body.appendChild(overflow)
        const closeButton = document.querySelector('.closeButton')
        closeButton.addEventListener('click',()=> body.removeChild(overflow))
}

