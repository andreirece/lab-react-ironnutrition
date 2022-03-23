function TodayFoods(props) {
  return (
    <div className="column content">
      <h2 className="subtitle">Today's foods</h2>
      <ul>
        {props.todayFoods.map((currentFoodObj) => {
          const { name, quantity, calories } = currentFoodObj;
          const idxCurrentObj = props.todayFoods.indexOf(currentFoodObj);

          console.log(idxCurrentObj);

          return (
            <li key={name}>
              {quantity} {name} = {calories * quantity} cal
              <button
                className="button is-danger ml-2"
                onClick={() => props.onFoodRemove(currentFoodObj)}
              >
                -
              </button>
            </li>
          );
        })}
      </ul>
      <strong>
        Total:{' '}
        {props.todayFoods.reduce((acc, currentFoodObj) => {
          const { quantity, calories } = currentFoodObj;
          return acc + quantity * calories;
        }, 0)}{' '}
        cal
      </strong>
    </div>
  );
}

export default TodayFoods;
