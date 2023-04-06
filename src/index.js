import './style/style.css';
import axios from 'axios'

document.addEventListener('DOMContentLoaded', ()=> {
        renderData();
});
const renderData =async () => {
    try {
        const res =await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        const categories = res.data.categories
        console.log(categories)
    } catch (error) {
        
    }
}



