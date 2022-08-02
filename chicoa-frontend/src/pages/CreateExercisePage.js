import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    // State variables that will be set when the user edits the fields
    const [name, setName]           = useState('');
    const [reps, setReps]           = useState('');
    const [weight, setWeight]       = useState('');
    const [unit, setUnit]           = useState('lbs');
    const [date, setDate]           = useState('');
    
    // useHistory state hook that will transfer the user back to the HomePage when they're done adding their exercise
    const history = useHistory();

    // HTTP POST to REST API to CREATE new document with form entered values
    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully Added the Exercise!");
        } else {
            alert("Failed to Add Exercise");
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>New Exercise</h2>
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
                        placeholder="Number of Reps (Min. 1)"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        placeholder="Weight Used (Min. 1)"
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
                        onClick={addExercise}
                        id="submit"
                    >Add Exercise</button>
                    </label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;