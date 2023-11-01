
## Daily Scrum Meetings

#### Location: in person after class or in lab
#### Time
- Sprint Planning Meeting: 10/23/2023 In lab
- Meeting 1 : 10/25/2023 After class
- Meeting 2:  10/27/2023 After class
- Meeting 3:  10/30/2023  After class

### Sprint Planning Meeting
##### Agenda
1. Team check-in 
2. Reviewing priorities
	1. Plan the scope of our project
	2. Decide what new features we'll be implementing
	3. Decide on the frameworks we'll use and how we'll write the back-end/front-end
	4. Generate the back-log of this sprint and stretch goals
	5. Create task breakdown, create schedule, and assign roles.
3. Estimating the time on priorities/tasks
	1. Organize tasks into sprints
##### minutes
Attendance: Shahir, Victor, Robbie, Jackson, Lucas
4:10pm - Team check-in
4:12pm - Reviewing Priorities
4:12pm - Planning scope of project and deciding features
	- We want to have 4 screens/UI's for our front-end for the manager, cashier, customer, and menu board
	- We'll add a login page for cashiers and the manager, and implement OAuth with it
	- We'll add google translate and Open Weather map to our project
4:24pm - Deciding on the frameworks we'll use and how we'll write the back-end/front-end
	- We'll re-write our databases as needed, and they'll be based off our back-end this time rather than our back-end being based on our databases
	- We'll use react.js and typescript for front-end and the api
4:35pm - Created and organized the back-log
4:40pm - Assigned roles
	- Victor: populating databases for orders, order submissions, interface for order submissions
	- Jackson: project repo and framework setup, database service setup, implement persistence layer & translation for data structures for menu and Orders
	- Shahir: Define datastructure for menu, orders, employees, and inventory
	- Lucas: create CRUD unit tests for menu, orders, and inventory, create database table management scripts, implement persistence layer and translation for Inventory
	- Robbie: Implement generic menu item button, item cart, and order submission for Cashier entry, implement cart modal component and order submission for Kiosk

### Scrum Meeting sprint 1

SCRUM meeting 1 for rFork
Prepared by: Victor Phan
Meeting Date: 10/25/2023

Meeting Attendees
1. Victor
2. Lucas
3. Robbie
4. Shahir
5. Jackson

Meeting Agenda Items
- Find out where everyone is/what did you?
- Does anybody have any blockers, and if so how and when can we solve them
- What are you goals for today and what do you plan to do before the next meeting

#### status Update since Last meeting
Accomplishments:
- Created github issues
- Created User stories
#### Tasks Completed: 
| Task Description | Assigned to | Completed (yes/no) |
| --- | ----------- | -------------------------- |
| Created template React App | Jackson | yes |
| Create issues and stories | Shahir and Robbie | yes |
| Started Database service setup | Jackson | yes |
| Started repo and framework setup | Jackson | yes |
#### Before the next meeting
| Task Description | Assigned to |
| ------------- | ----------- | 
| Defining data structures | Shahir | 
| Finish Tech Stack (database setup, repo, and framework setup) | Jackson  | 
| Implement Cashier entry | Robbie |
| Implement Cashier item cart | Robbie |
| Implement Cashier order submission | Robbie |
| CRUD unit tests for orders | Lucas |
| CRUD unit tests for menu| Lucas |
| CRUD unit tests for Inventory | Lucas |
| Finish CSV gen, (populate database) | Victor | 

###### Minutes From Previous Meeting:
The minutes from our previous meeting (the sprint planning phase) can be summed up into us planning out what our plans were for the project. We decided that we'd implement the following API's: OAuth, google translate, and OpenWeatherMap. We also decided on what new features we'd add to our application, who would implement those features, and when they would be done by. Then we decided on how we'd implement those features and what framework our back-end and front-end would use this time around. We created a list of tasks we'd want done for each sprint and a backlog of tasks to do.

### Scrum Meeting sprint 2

SCRUM meeting 2 for rFork
Prepared by: Victor Phan
Meeting Date: 10/27/2023

Meeting Attendees
1. Victor
2. Lucas
3. Robbie
4. Shahir
5. Jackson

Meeting Agenda Items
- Find out where everyone is/what did you?
- Does anybody have any blockers, and if so how and when can we solve them
- What are you goals for today and what do you plan to do before the next meeting

#### status Update since Last meeting
Accomplishments:
- Finished the tech stack setup
#### Tasks Completed: 
| Task Description | Assigned to | Completed (yes/no) |
| --- | ----------- | -------------------------- |
| Defining data structures | Shahir | no |
| Finish Tech Stack (database setup, repo, and framework setup) | Jackson | yes  | 
| Implement Cashier entry | Robbie | no |
| Implement Cashier item cart | Robbie | no |
| Implement Cashier order submission | Robbie | no |
| CRUD unit tests for orders | Lucas | no |
| CRUD unit tests for menu| Lucas | no |
| CRUD unit tests for Inventory | Lucas | no |
| Finish CSV gen, (populate database) | Victor | no |
#### Before the next meeting
| Task Description | Assigned to |
| ------------- | ----------- | 
| Finish CSV gen, (populate database) | Victor | 
| Define basic data types| Jackson |
| Define basic add routing | Robbie|
| Add buttons| Robbie |
| Import index.css to every page component| Robbie |
| Config Tailwind CSS| Robbie |
| Add html| Lucas |
| Create README for building | Lucas |
| Stub Screens| Robbie |
| Create project init| Jackson |
| Create CRUD unit tests| Lucas|
|implement persistence layer and translation | Jackson| 

###### Minutes From Previous Meeting:
The minutes from our previous meeting can be summed up into us changing what we wanted our tasks to be to achieve our user stories and finish our MVP, as well as who would be in charge of what. We also discussed on how we would handle routing and how the directory structure of our repo would be formatted.

### Scrum Meeting sprint 3

SCRUM meeting 3 for rFork
Prepared by: Victor Phan
Meeting Date: 10/30/2023

Meeting Attendees
1. Victor
2. Lucas
3. Robbie
4. Shahir
5. Jackson

Meeting Agenda Items
- Find out where everyone is/what did you?
- Does anybody have any blockers, and if so how and when can we solve them
- What are you goals for today and what do you plan to do before the next meeting

#### status Update since Last meeting
Accomplishments:
- Finished the tech stack setup
#### Tasks Completed: 
| Task Description | Assigned to | Completed (yes/no) |
| --- | ----------- | -------------------------- |
| Finish CSV gen, (populate database) | Victor | no |
| Define basic data types| Jackson | yes |
| Define basic add routing | Robbie| yes |
| Add buttons| Robbie | yes |
| Import index.css to every page component| Robbie | yes|
| Config Tailwind CSS| Robbie | yes |
| Add html| Lucas | yes |
| Create README for building | Lucas | yes |
| Stub Screens| Robbie | yes |
| Create project init| Jackson | yes |
| Create CRUD unit tests| Lucas| yes |
|implement persistence layer and translation | Jackson| no |
#### Before the next meeting
| Task Description | Assigned to |
| ------------- | ----------- | 
| Finish CSV gen, (populate database) | Victor | 
|implement persistence layer and translation | Jackson| 
| create order function | Jackson |
| create get all function | jackson |
| Add Kiosk button| Robbie |
| add submit order | Jackson |
| set up the API requests | Robbie
| Implement Database Initialization | Jackson|
| set up jest tests | Jackson| 
###### Minutes From Previous Meeting:
Discussed defining data types for the template, creating the basic page in react, creating basic navigation, and basic code stubs. 
