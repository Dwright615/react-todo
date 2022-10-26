# Todo App
This is a simple Todo app using React for the frontend and Node.js with Express and Postgres on the backend.

Currently both applications can be served locally by `cd`ing into their respective directories and running the proper commands.

For now, we will also manually set up the Postgres DB until the `docker-compose` funtionality is working.

## Steps to run Frontend

1. `cd` into *client* directory.
2. Run `npm install` to instal dependencies.
3. Run `npm start`

The application should now be served locally and automatically open in the browser at http://localhost:3000/


## Steps to run Backend

1. `cd` into *api* directory.
2. Run `npm install` to instal dependencies.
3. Run `node index.js`

The application should now be served locally and automatically open in the browser at http://localhost:3001/


## Steps to run local Postgress DB and create table.

### Intructions are for Mac but should be adaptable for other OS

1. Install postgresql
    `brew install postgresql`

2. Start postgresql locally
   `brew install postgresql`

3. Connect to the default postgres. After this command your prompt should show `postgres=#` to indicate you are logged in as the root user.
    `psql postgres`

4. Create a role that we will later use
    `CREATE ROLE me WITH LOGIN PASSWORD ‘password’;`

5. Alter role to give it permission to create our db.
    `ALTER ROLE me CREATEDB;`

6. Run `\du` to list all roles and users. Verify that our new role is present with the proper permissions.

7. Run `\q` to exit the default session.

8. Log in with new role. After this command your prompt should show `postgres=>` to indicate you are no longer logged in as the root user.    
    `psql -d postgres -U me`
   
9. Create DB
    `CREATE DATABASE todo_api;`

10. Create the *tasks* table
    ````
    CREATE TABLE tasks (
      ID SERIAL PRIMARY KEY,
      text VARCHAR(140),
      is_complete BOOLEAN DEFAULT FALSE
    );
    ````

Now that we have our full stack set up we can tast the application. Go into the (UI)[http://localhost:3000/] and test the following functionality.

1. Add tasks
2. Edit tasks
3. Complete the tasks by clicking the text which should add a strikethrough
4. Delete tasks
5. Reload the app to test persistence.


