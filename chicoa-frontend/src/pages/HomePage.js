// Import React ES Modules
import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'

// Import React components
import ExerciseList from '../components/ExerciseList';

function HomePage({setExercise}) {

    // Use state variable exercises to bring in the data
    const [exercises, setExercises] = useState([]);
    // RETRIEVE the list of exerices
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }
    // Use the useEffect hook to call the loadExercises function when the page first loads
    useEffect(() => {
        loadExercises();
    }, []);

    // DELETE a row
    const deleteExerciseRow = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
            alert('Deleted Exercise Entry');
        } else {
            alert('Failed to Delete Exercise');
        }
    }

    // UPDATE a row
    const history = useHistory();
    const editExerciseRow = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }

    return(
        <>  
            <article>
                <h2>Recorded Exercises</h2>
                <div className="exerciseList">
                <ExerciseList
                    exercises={exercises}
                    editExercise={editExerciseRow}
                    deleteExercise = {deleteExerciseRow}
                />
                </div>
            </article>
             
        </>
    );
}

export default HomePage;
