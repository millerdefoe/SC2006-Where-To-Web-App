# API Documentation

## Routes

1. [/createUser](#--/createUser)
2. [/login](#--/login)
3. [/carparksNearby](#--/carparksNearby)
4. [/carparksPricing](#--/carparksPricing)
5. [/carparksLots](#--/carparksLots)
6. [/getRoute](#--/getRoute)

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

### - /carparksNearby

#### Methods
`GET`

#### Params
    ~none~

#### Headers
    ~Authentication: $TOKEN~

#### Body
    ~{"latitude": "1.31262", "longitude": "103.123712", "maxrange": 1}~
- longitude (Required)
    - Float format
- latitude (Required)
    - Float format
- maxrange (Optional)
    - INT format
    - In KM

#### Return data
    ~[["20","Orchard","Far East Plaza","1.3071","103.83359","C"],...]~
    ~{"status" : "failure", "reason": "Coordinate information was not provided"}~
- success
    - List of all carparks in range will be sent. Each list contains [Carpark ID, Location, Name/Development, Latitude, Longitude, LotType]
    - LotType | C : Car
- login failure
    - "Coordinate information was not a number" - Invalid coordinate information was provided
    - "Coordinate information was not provided" - Body did not contain required information
    - "backend error" - contact backend team to view logs and troubleshoot

### - /carparkPricing

#### Methods
`GET`

#### Params
    ~none~

#### Headers
    ~Authentication: $TOKEN~

#### Body
    ~{"carparkId": "A001"}~
- carparkId (Required)
    - String format

#### Return data
    ~["rate" : "$0.60/half hour"]~
    ~{"status" : "failure", "reason": "Invalid carparkid"}~
- success
    - Retrieves rate of carpark for cars
- failure
    - Invalid carparkId - carparkid does not exist (might be formatting error)

### - /carparkLots

#### Methods
`GET`

#### Params
    ~none~

#### Headers
    ~Authentication: $TOKEN~

#### Body
    ~{"carparkId": "A001"}~
- carparkId (Required)
    - String format

#### Return data
    ~["rate" : "$0.60/half hour"]~
    ~{"status" : "failure", "reason": "Lots were not found for carparkID"}~
- success
    - Retrieves available lots for carpark
- failure
    - Lots were not found for carparkID - carparkid does not exist (might be formatting error)

### - /bookCarpark

#### Methods
`GET`

#### Params
    ~none~

#### Headers
    ~Authentication: $TOKEN~

#### Body
    ~{"carparkId": "A001", "lotType": "C", "userId": 40, "startTime" : "20-03-2025 10:40:00", "duration": 3600}~
- carparkId (Required)
    - String format
- lotType (Required)
    - String format
    - Must be within ["C", "M", "Y", "S", "H", "L"]
- userId (Required)
    - String format
- startTime (Required)
    - String format
    - DD-MM-YYYY HH:MM:SS
- duration (Required)
    - Integer format
    - Duration of parking booking in seconds

#### Return data
    ~["status" : "success", "reason": "Booking for A10/C : 1 | 20-03-2025 10:40:00-3600 was successful"]~
    ~{"status" : "failure", "reason": "Error creating booking. Please check logs"}~
- success
    - Booking given parameters have been made
- failure
    - Error creating booking. Please check logs - Contact backend team
    - Duration provided was not an integer: asd - formatting error for duration
    - Start time provided was not valid - formatting error for start time
    - Lot type provided was not valid - lotType was from within the defined list
    - Error with duration/starttime/etc. provided - Contact backend team

### - /getRoute

#### Methods
`GET`

#### Params
    ~none~

#### Headers
    ~Authentication: $TOKEN~

#### Body
    ~{"source" : {"latitude": "1.31262", "longitude": "103.123712"}, "destination" : {"latitude": "1.341232", "longitude": "103.41231"}}~
- source (Required)
    - Dict format
    - Include latitude and longitude keys
- destination (Required)
    - Dict format
    - Include latitude and longitude keys

#### Return data
    ~{"distance" : 3017, "duration", "614s", "polyline": "asdbUI@GB1823A", "steps": [{"distance": "39 m", "duration": "1 min", "instructions": "Head South", "maneuver": "Depart", "polyline": "as*4@Basd"}, {}]}~
    ~{"error": "No source was specified"}~
- success
    - Route with all steps will be sent
- failure
    - Either source or destination was not provided
    - "Route not found" - No route is available from source to destination