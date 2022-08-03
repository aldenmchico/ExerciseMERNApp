import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const EditExercisePage = ({exercise}) => {

    // State variables that will be set when the user edits the fields
    const [name, setName]           = useState(exercise.name);
    const [reps, setReps]           = useState(exercise.reps);
    const [weight, setWeight]       = useState(exercise.weight);
    const [unit, setUnit]           = useState(exercise.unit);
    const [date, setDate]           = useState(exercise.date);

    const history = useHistory();

    // Use HTTP PUT method to edit the exercise with the page filled values
    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Edit Complete");
        } else {
            alert(`Failed to Edit the Page. Check that All Parameters Are Valid`);
        }
        history.push("/");
    }

    return (
        <>
        <article className="editExercise">
            <h2>Edit Exercise</h2>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Exercise Details</legend>
                    <label for="name">Exercise</label>
                    <input
                        type="text"
                        placeholder="Name of Exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="reps">Reps</label>
                    <input
                        type="number"
                        value={reps}
                        min="1"
                        placeholder="Number of Reps"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        placeholder="Weight Used"
                        value={weight}
                        min="1"
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />

                    
                    <select 
                        type="text"
                        name="unit"
                        onChange={e => setUnit(e.target.value)} 
                        id="unit"
                        required>
                            <option value="lbs" selected>lbs</option>
                            <option value="kgs">kgs</option>
                            <option value="mi">mi</option>
                            <option value="km">km</option>
                    </select>

                    <label for="date">Date</label>
                    <input
                        type="date"
                        placeholder="Date Exercised"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={editExercise}
                        id="submit"
                    >Edit Exercise</button>
                    </label>
                </fieldset>
                </form>
            </article>
        </>
    )
}
export default EditExercisePage;
