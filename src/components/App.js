import { useState, useEffect } from 'react';

import 'bulma/css/bulma.css';
import foodsJson from '../foods.json';
import AddNewFood from './AddNewFood';
import FoodBox from './FoodBox';
import Search from './Search';
import TodayFoods from './TodayFoods';

function App() {
  const [foods, setFoods] = useState([...foodsJson]);
  const [searchTerm, setSearchTerm] = useState('');
  const [todayFoods, setTodayFoods] = useState([]);

  // Faz o filtro da lista de comidas somente quando o termo de busca terminou de atualizar
  useEffect(() => {
    filterFoods(searchTerm);
  }, [searchTerm]);

  function filterFoods(term) {
    const clone = [...foods];

    // Extraindo somente as comidas que o nome inclui o termo de busca
    const filtered = clone.filter((currentFoodObj) => {
      return currentFoodObj.name.toLowerCase().includes(term.toLowerCase());
    });

    setFoods(filtered);

    // Se o termo de busca estiver vazio, voltamos o state pra lista original que vem do JSON
    if (!term) {
      setFoods([...foodsJson]);
    }
  }

  function onFoodAdd(foodObj) {
    const clone = [...todayFoods];

    clone.push(foodObj);

    setTodayFoods(clone);
  }

  console.log(todayFoods);

  return (
    <div className="container">
      <h1 className="title">IronNutrition</h1>
      <AddNewFood />
      <Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="columns">
        <div className="column">
          {/* Renderiza uma Foodbox pra cada objeto de comida na array */}
          {foods.map((currentFoodObj) => (
            <FoodBox
              key={currentFoodObj.name}
              food={currentFoodObj}
              onFoodAdd={onFoodAdd}
            />
          ))}
        </div>
        <TodayFoods todayFoods={todayFoods} />
      </div>
    </div>
  );
}

export default App;
