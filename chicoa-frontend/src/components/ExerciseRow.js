import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

function ExerciseRow({exercise, editExercise, deleteExercise}) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td><AiFillEdit onClick={() => editExercise(exercise)}/></td>
            <td><AiFillDelete onClick={() => deleteExercise(exercise._id)}/></td>
        </tr>
    );
}

export default ExerciseRow;