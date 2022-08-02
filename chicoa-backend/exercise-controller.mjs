import 'dotenv/config';
import express from 'express';
import * as exerciseModel from './exercise-model.mjs';

const PORT = process.env.PORT;
const app = express();
// Sets Content-Type to application/json for every HTTP method
app.use(express.json());

// CREATE controller ******************************************

// POST /exercises
// Request: No path parameters, Request body is a JSON object with all 5 properties listed in the data model
// Response: Success - Request is valid and a new document was created
    // Body: JSON object with all the properties of the document including unique ID value
    // Status Code: 201
// Response: Failure - Request is invalid
    // Body: JSON object Error
    // Status Code: 400

app.post ('/exercises', (req,res) => { 
    // Create a new Exercise document if the request is valid
    exerciseModel.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
        )
        .then(newExercise => {
            res.status(201).json(newExercise);
        })
        // Catch will occur if a parameter is missing or one of the fields is invalid
        .catch(error => {
            res.status(400).json({ error: 'Invalid request' });
        });
    }
    
);

// RETRIEVE controller ****************************************************

// GET exercises
// Request: No path parameter, no request body
// Response: JSON array containing the entire collection
    // If the collection is empty, response is an empty array

app.get('/exercises', (req, res) => {
    exerciseModel.findExercises()
        .then(exercises => {
            res.status(200).send(exercises);
        })
        .catch(error => {
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// GET /exercises/:_id
// Request: Path parameter contains ID of the document, no request body
// Response: Success - If document exists with specified ID...
    // Body: JSON object with all properties of document including unique ID
    // Status Code: 200
// Response: Failure - No document exists with specified ID...
    // Body: JSON object Error
    // Status Code: 404

app.get('/exercises/:_id', (req, res) => {
// The values for the update are valid
    const exerciseId = req.params._id;
    exerciseModel.findExerciseById(exerciseId)
        .then(exercise => {
            res.status(200).json(exercise);
        })
        .catch(error => {
            res.status(404).json({ Error: 'Specified Document Not Found' });
        });
});

// UPDATE controller ************************************

// PUT /exercises/:id
// Request: Path parameter contains ID of document, request body is a JSON object with all 5 properties for Exercise model
// Response: Success - Request body is valid and document exists with specified ID
    // Body: JSON object with all properties of updated document, including ID
    // Status Code: 200
// Response: Failure - Request body is invalid
    // Body: JSON object Error
    // Status Code: 404

app.put('/exercises/:_id', (req, res) => {
    exerciseModel.updateExercise(
        req.params._id, 
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ 
                _id: req.params._id,
                name: req.body.name,
                reps: req.body.reps, 
                weight: req.body.weight, 
                unit: req.body.unit, 
                date: req.body.date 
            })
        } else {
            res.status(400).json({ Error: 'Required Parameter Not Included in Request' });
        }
    })
    .catch(error => {
        res.status(404).json({ Error: 'Unable to Update Document' });
    });
});


// DELETE Controller ******************************
// DELETE /exercises/:id
// Request: Path parameter contains ID of document, no request body
// Response: Success - Document exists with specified ID
    // Body: No response body
    // Status Code: 204
// Response: Failure - No document exists with specified ID
    // Body: JSON object Error
    // Status Code: 404

app.delete('/exercises/:_id', (req, res) => {
    exerciseModel.deleteById(req.params._id)
        .then(deletedCount => {
                res.status(204).send();
        })
        .catch(error => {
            res.status(404).json({ Error: 'Specified Document Not Found' });
        });
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});