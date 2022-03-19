import { useState } from 'react';

function AddNewFood() {
  const [newItem, setNewItem] = useState({
    name: '',
    calories: 0,
    img: '',
  });

  function handleClick() {
    return (
      <div></div>
      //   <form>
      //     <input className="input" type="text" label="Insert name of the food" />

      //     <label>
      //       Insert quantity of calories:{' '}
      //       <input
      //         className="input"
      //         type="number"
      //         placeholder="Insert quantity of calories"
      //       ></input>
      //     </label>

      //     <input type="file" />

      //     <button className="button is-info mb-3" type="submit">
      //       Submit
      //     </button>
      //   </form>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNewItem({
      [event.target.name]: event.target.value,
    });
    console.log(newItem);
  }

  return (
    <div>
      <button className="button is-info mb-3" onClick={handleClick}>
        Insert new food
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Insert the food name here:{' '}
          <input className="input mb-3" type="text" name="name" />
        </label>

        <label>
          Insert quantity of calories:{' '}
          <input className="input mb-3" type="number" name="calories" />
        </label>

        <input className="input mb-3" type="file" name="image" />

        <button
          className="button is-info mb-3"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewFood;
