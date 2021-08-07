# Ride Share

An express application to book cab

## Description

This application provides REST interface to
* Book a cab between pickup and dropoff location
* View past bookings
* Get list of cabs that are nearby

## Getting Started

### Dependencies

* Node 10
* MongoDB 3.6

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SyedFayaz/ride_share.git
   ```
2. Create a new .env file and paste contents from .env.example and then replace value of environment variables
   
3. Install NPM dependencies and build code
   ```sh
   npm run setup
   ```
4. Seed location data into db
   ```sh
   npm run seed
   ```

### Executing program

To start the server
```
npm start
```
To run test cases
```
npm test
```
To run test cases with coverage
```
npm run coverage
```


## Authors


SyedFayaz Mujawar
<syedfayaz28@gmail.com>
