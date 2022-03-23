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
    const foodObjIndex = todayFoods.findIndex(
      (currentFoodObj) => currentFoodObj.name === foodObj.name
    );

    // Verifica se já existe uma comida com esse nome na lista de comidas consumidas hoje
    if (foodObjIndex > -1) {
      // Crie um clone da array de comidas para não modificar a original
      const clone = [...todayFoods];

      // Acesse o objeto a ser atualizado através do índice
      const foodObjToUpdate = clone[foodObjIndex];

      // Some a quantidade existente com a quantidade do novo objeto sendo adicionado
      foodObjToUpdate.quantity = foodObjToUpdate.quantity + foodObj.quantity;

      // Atualiza o state com o clone da array modificado
      return setTodayFoods(clone);
    }

    // Caso não exista, adicione o objeto inteiro
    setTodayFoods([...todayFoods, foodObj]);
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
              todayFoods={todayFoods}
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
