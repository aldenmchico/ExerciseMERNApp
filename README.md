# Exercise Website (Utilizing the MERN Website Stack)
In this project, I use the Model-View-Controller Structure to design the full backend and frontend of a sample Exercise website using the MongoDB, Express, React, and Node stack (MERN). For the data in this project, I utilize a MongoDB collection named exercises that records the name, reps, weight, unit, and date for a user's exercise routine. My REST API web service contains a POST method to create records in the database, GET methods to retrieve the entire or individual exercises from the database, a PUT method to update values for an existent exercise ID, and a DELETE method to remove exercises from the database. The model that contains functions to perform these actions is separated from the controller that calls the HTTP methods that executes these functions (per the MVC structure). The view for the website is rendered using React and contains three pages (Home Page, Edit Exercise Page, and Create Exercise Page) that all link to one another and contain UI features that allows the user to perform all the described HTTP methods.
<br/><br/>
<h2>Running the Project</h2>
To run the project, you must install a <b>.env</b> file in <b>chicoa-backend</b> and copy-paste the following lines:
<br/>
<br/>
MONGODB_CONNECT_STRING='[INSERT MONGODB CONNECT STRING]' <br/>
PORT=3000
<br/>
<br/>
The MONGODB_CONNECT_STRING is personalized to an individual's account. I did not include my .env file in the repository because that would make access to my MongoDB account public, but you are free to use a MongoDB Connect String from your personal account. 
</br><br/>
After creating the .env file and linking your MongoDB connect string, open a new terminal window, navigate to the chicoa-backend directory and run <b>npm init</b> and <b>npm start</b> to download all the dependencies for the backend code and start the server on <b>localhost:3000</b>. 
</br><br/>
After starting the server, open another terminal window, navigate to the chicoa-frontend directory and run <b>npm init</b> and <b>npm start</b> to download all the dependencies for the frontend code and start the website on localhost:8000. Open a web browser and navigate to <b>http://localhost:8000</b> to start using the website. 
