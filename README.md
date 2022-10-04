# Project_manager
create and manage projects and users. Please go through the following steps to understand the
detailed requirements for this project.

#Authentication and middleware
You will be creating a server with a user sign-up and login, storing usernames and hashed
passwords with a basic logging middleware, further the authenticated user (whose user type is
admin) can create more users and projects

#Types of Users
We will have two types of Users:
*. Admin can
i. create projects
ii. see the list of all projects
iii. see the list of all users
iv. Grant or deny a project’s request from a client

*. Client can
i. Request access from the Admin for a project (Can make multiple requests) ii.
Can see the project(s) they have access to

#use some npm packages for this
1. bycrypt
A password hashing library. If you have problems installing this module (since it uses
C++ bindings), you can also try bcrypt.js which has the same API with is 100%
written in JS
2. express-session
An introductory session middleware for Express (helps to manage sessions)
3. passport.js
An authentication middleware for Node.js, either use express-session or passport.js
for advanced authentication
