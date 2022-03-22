import { useState } from 'react';

function AddNewFood(props) {
  const [newFood, setNewFood] = useState({});

  function handleSubmitForm(event) {
    event.preventDefault();
    props.insertNewItem({
      ...newFood,
      calories: Number(newFood.calories),
    });
  }

  function handleChangeField(event) {
    const fieldName = event.target.name;
    setNewFood({
      ...newFood,
      [fieldName]: event.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="field">
        <label className="label">Insert the food name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={newFood.name}
            name="name"
            onChange={handleChangeField}
          />
        </div>
      </div>

      <div className="field">
        <label className="label"> Insert quantity of calories</label>
        <div className="control">
          <input
            className="input"
            type="number"
            value={newFood.calories}
            name="calories"
            onChange={handleChangeField}
          />
        </div>
      </div>

      <div className="field">
        <label className="label"> Insert Image URL</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={newFood.image}
            name="image"
            onChange={handleChangeField}
          />
        </div>
      </div>

      <button className="button is-info mb-5" type="submit">
        Insert
      </button>
    </form>
  );
}

export default AddNewFood;
