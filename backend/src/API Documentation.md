# API Documentation

## Routes

1. [createUser](#--/createUser)
2. [login](#--/login)

___

### - /createUser

#### Methods
`POST`

#### Params
    ~none~

#### Headers
    ~none~

#### Body
    ~{"username": "user1", "password": "pass1"}~
- username (Required)
    - String format
    - Alphanumeric
    - Up to 20 characters long
- password (Required)
    - String format
    - Hashed password (no plain text password)

#### Return data
    ~{"status" : "user created", "userid": 1}~
    ~{"status" : "user not created", "reason": "duplicate username"}~
- user created
    - userid will be sent under "userid" key
- user not created
    - "duplicate username" - username is already in use
    - "backend error" - contact backend team to view logs and troubleshoot
    - "username and/or password was not provided" - invalid api request. Body does not contain required information

### - /login

#### Methods
`POST`

#### Params
    ~none~

#### Headers
    ~none~

#### Body
    ~{"username": "user1", "password": "pass1"}~
- username (Required)
    - String format
    - Alphanumeric
    - Up to 20 characters long
- password (Required)
    - String format
    - Hashed password (no plain text password)

#### Return data
    ~{"status" : "login successful", "userid": 1, "token": "bBN73AUish192bKAHJ1BS"}~
    ~{"status" : "login failure", "reason": "password mismatch"}~
- login successful
    - userid will be sent under "userid" key
- login failure
    - "password mismatch" - password provided is wrong. ensure password is provided in correct format
    - "username does not exist" - provided username is invalid
    - "username and/or password was not provided" - invalid api request. Body does not contain required information

