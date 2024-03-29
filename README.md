
# Dance Kingdom

## [See the App!](https://dancekingdom.netlify.app/)


## Description

This is a Dance Studio app for Teachers and Students that. Teachers are able to create dance classes, and students can subscribe any class they want.
 
## User Stories

- **404** - As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **sign up** - As an anon I can sign up in the platform so that I can start creating and managing my backlog
- **login** - As a user I can login to the platform so that I can start creating and managing my backlog
- **logout** -As a user I can logout from the platform so no one else can modify my informationt
- **Add elements** - As a user I can add dance classes to my backlog
- **Delete elements** - As a user I can delete dance classes from my backlog
- **List elements** - As a user I want to see the dance classes list so that I can choose one to eat.

## Backlog Functionalities

- User Profile
- Comment section
- 

# Client

## Routes

- / - Home Page
- /signup - Sign Up form
- /login - Login form
- /profile - Details from the user and Classes that teacher create
- /dance-classes - Dance Classes List
- /dance-classes/:id - Dance Class Detail (Can edit, delete and comment)
- /dance-classes/class/create - Create a Dance Class
- 404

## Pages
- Home Page (public)
- Login Page (anon only)
- Sign Up Page (anon only)
- Profile Page (user only, where the user "Teacher" can create the dance class)
- Dance Classes Page (user only)
- Dance Class Details Page (user only)

## Components
- AddDanceClass
- Carousel
- commentSection
- DanceClassDetails
- DanceClassesList
- footer
- isAnon
- isPrivate
- NavBar
- ProfileInfo

## IO
## Services
- Auth Service
- Comment Services
- Dance Class Services
- Profile Services

# Service
## Models
- User Model:
    - firstName - string // required
    - lastName - string // required
    - username - string // required
    - email - string // required
    - password - string // required
    - status - string // required
    - profilePictureUrl - string
    - comments - string

- Dance Class Model:
    - title - string // required
    - teacher - string 
    - day - string // required
    - time - string // required
    - description - string // required
    - video - string
    - pictures - string 
    - comments - string 

- Comment Model:
    - text - string // required
    - user - string
    - danceClass - string
    - parentComment - string

# API Endpoints / Backend Routes

- GET /auth/signup
- GET /auth/login
- GET /auth/verify
- POST /comments/class/:id
- GET /dance-classes/
- GET /dance-classes/class/:id
- POST /dance-classes/class/create
- GET /dance-classes/teacher
- PUT dance-classes/class/:id
- DELETE dance-classes/class/:id
- GET /profile/



## Links

## Collaborators

[Adam](https://github.com/Maskedfoxguy)

[Ana Filipa](https://github.com/anafilipareis)

### Project

[Front End Repository Link](hhttps://github.com/anafilipareis/dance-studios-frontent.git)

[Back End Repository Link](https://github.com/anafilipareis/dance-studios-backend.git)

[Deploy Link](https://dancekingdom.netlify.app/)

