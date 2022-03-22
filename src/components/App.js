import { useState, useEffect } from 'react';

import 'bulma/css/bulma.css';
import foodsJson from '../foods.json';

import FoodBox from './FoodBox';
import Search from './Search';
import TodayFoods from './TodayFoods';
import AddNewFood from './AddNewFood';

function App() {
  const [foods, setFoods] = useState([...foodsJson]);
  const [searchTerm, setSearchTerm] = useState('');
  const [todayFoods, setTodayFoods] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

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
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    //
    //
    // const idxCurrentObj = todayFoods.indexOf(foodObj); Só dá -1, mesmo existindo objeto igual dentro.

    const clone = [...todayFoods];

    // if (idxCurrentObj > -1) {
    //   todayFoods[idxCurrentObj].quantity =
    //     todayFoods[idxCurrentObj].quantity + 1;
    // }

    // if (idxCurrentObj < 0) {
    clone.push(foodObj);
    // }

    setTodayFoods(clone);
  }

  function onFoodRemove(obj) {
    const idx = todayFoods.indexOf(obj);
    const clone = [...todayFoods];
    clone.splice(idx, 1);
    setTodayFoods(clone);
  }

  function showForm() {
    setDisplayForm(!displayForm);
  }

  function insertNewItem(itemInserted) {
    setFoods((foods) => [itemInserted, ...foods]);
  }

  return (
    <div className="container">
      <h1 className="title">IronNutrition</h1>

      <button className="button is-info mb-5" onClick={showForm}>
        Insert new Item
      </button>
      {displayForm && (
        <AddNewFood insertNewItem={insertNewItem} showForm={showForm} />
      )}

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
        <TodayFoods todayFoods={todayFoods} onFoodRemove={onFoodRemove} />
      </div>
    </div>
  );
}

export default App;

//o value sempre retorna string!
