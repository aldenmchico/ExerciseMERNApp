// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Movies collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
// name: Name of the exercise.
// reps: Number of times exercise was performed.
// weight: The weight used for the exercise.
// unit: Unit of measurement i.e. lbs / kgs / miles
// date: Date exercise was performed

const exerciseSchema = mongoose.Schema({
	name: { type: String, required: true },
	reps: { type: Number, required: true },
	weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
});

// Compile the model from the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);

// Function to determine if the values for the exercise are valid
const isValidInput = (name, reps, weight, unit, date) => {
    if (name.length < 1 || reps <= 0 || weight <= 0 || (unit !== "lbs" && unit !== "kgs" && unit !== "mi" && unit !== "km") || typeof(date)!=="string") {
            return false;
        }
    return true;
}

// CREATE model *****************************************
const createExercise = async (name, reps, weight, unit, date) => {

    // The request body must have valid input for all 5 parameters
    if (isValidInput(name, reps, weight, unit, date) === false){
        throw new Error('Invalid Input Value');
    }
    const newExercise = new Exercise({ 
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date 
    });
    return newExercise.save();
};

// RETRIEVE models *****************************************
// Retrieve all the exercises and return a promise.
const findExercises = async () => {
    const query = Exercise.find();
    return query.exec();
}

// Retrieve exercise based on the ID and return a promise.
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

// UPDATE model *****************************************************
const updateExercise = async (_id, name, reps, weight, unit, date) => {

    // The request body must have valid input for all 5 parameters
    if (isValidInput(name, reps, weight, unit, date) === false){
        throw new Error('Invalid Input Value');
    }
    // All the exercise parameters must be filled to allow an update
    if (name === undefined || reps === undefined ||  weight === undefined|| unit === undefined || date === undefined) {
        throw new Error('Undefined Value Error');
    }
    const result = await Exercise.updateOne({_id: _id }, {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return result.matchedCount;
}


// DELETE model based on ID  *****************************************
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
};


// Exports for exercise-controller
export {createExercise, findExercises, findExerciseById, updateExercise, deleteById};