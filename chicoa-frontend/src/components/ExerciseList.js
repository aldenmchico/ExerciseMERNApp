import React from 'react';
import ExerciseRow from './ExerciseRow';

function ExerciseList({exercises, editExercise, deleteExercise}) {
    return (
        <div className="wrapper">
        <table>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) =>
                <ExerciseRow
                    exercise={exercise}
                    key={i}
                    editExercise={editExercise}
                    deleteExercise={deleteExercise}
                />)}
            </tbody>
        </table>
        </div>
    );
}

export default ExerciseList;