import './meal-item.js'
import axios from 'axios'

class MealList extends HTMLElement {
    set meals(meals) {
        this._meals = meals;
        this.render();
    }
    render() {
        this._meals.forEach(meal => {
            const mealItemElement = document.createElement('meal-item');
            mealItemElement.meal = meal;
            mealItemElement.addEventListener('click',() => mealDetails(meal.idMeal))
            this.appendChild(mealItemElement);
        });
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
    }
}
customElements.define('meal-list', MealList);