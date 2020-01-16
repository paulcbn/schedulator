
# Schedulator
This project is meant to be an improvement to the Computer Science and Mathematics
timetable (of Babes Bolyai University) with options for personal customisation.
At it's core, schedulator takes already existing timetable data from the university's website
and displays it in an actually user-friendly and personalized way. 

## Project stack

#### Backend (API + Crawler)
- Django 2.x - main framework
- Django Rest Framework
- Django knox - for auth tokens 

#### Frontend (Web SPA)
- React (with *react hooks*) - main framework
- Material-UI
- Redux + Redux Thunk
- Axios

## Project setup 

#### Backend
##### Prerequisites (Optional, but rather useful):
   - create a python virtual environment 
   - do all backend project operations from inside the said venv

##### Project setup:
 1. Install the required python packages:  
 `pip install -r requirements.txt`
 4. **Important:** Before running any other command, copy the `.env.example` file  
 into a new file named `.env` (this is where django takes some important configuration  
 from, the server will not run without this)
 2. Make the migrations for both django apps (api & crawler):  
 `python manage.py makemigrations`  
 `python manage.py makemigrations api`  
 `python manage.py makemigrations crawler` (these last two may not be necessary)
 3. Migrate:  
 `python manage.py migrate`  
 4. (Optional) Create admin user:  
 `python manage.py createsuperuser` and follow the prompted steps
 5. (Optional) Populate your db with crawled data:  
 `python manage.py crawl`
 6. (Optional) Generate aliases for subjects:  
 `python manage.py alias`
 7. (Optional) Generate types for formations (eg. GROUP, SEMIGROUP, etc.):  
 `python manage.py formationtypes`
 8. (Optional) Generate static tables:  
 `python manage.py generatestatictables`

##### Project run:
- Run the development server:  
`py manage.py runserver`
- (Optional) Check the admin page at  
<http://localhost:8000/admin>

#### Frontend
The frontend react app is located in the folder `/web`.  
Run all the fronted operations from inside that folder: `cd /web`
##### Prerequisites:
 - node 10.x.y
 
##### Project setup:
 1. Install the required node modules:  
 `npm install`
 
##### Project run:
- Run the local react development server:  
`npm start`
