let fs = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @return {array} Array of Objects with lat and lng attributes.
*/
function generateRandomPoints(center, radius, count) {
    var points = [];
    for (var i = 0; i < count; i++) {
        points.push(generateRandomPoint(center, radius));
    }
    return points;
}


/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
function generateRandomPoint(center, radius) {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);


    const longitude = xp + x0;
    const latitude = y + y0;
    let currentLocation = {
        type: "Point",
        coordinates: [longitude, latitude]
    }
    let cabNumber = (Math.random() + 1).toString(36).substring(7);
    return { cabNumber, currentLocation };
}



async function seedData() {
    await exec('mongoimport -d rideShare -c cabs --file ./seed/geo.json --jsonArray');
    await exec('mongo < ./seed/createIndex.js');
}

function generateLocationData() {
    // Usage Example.
    // Generates 50 points that is in a 1km radius from the given lat and lng point.
    let radiusInMeters = 1000, noOfPoints = 50;
    var randomGeoPoints = generateRandomPoints({ 'lat': 24.2090903, 'lng': 23.1989882 }, radiusInMeters, noOfPoints);
    var randomGeoPoints2 = generateRandomPoints({ 'lat': 15.4540505, 'lng': 75.0066516 }, radiusInMeters, noOfPoints);
    var randomGeoPoints3 = generateRandomPoints({ 'lat': 12.9923035, 'lng': 77.7059399 }, radiusInMeters, noOfPoints);

    randomGeoPoints = randomGeoPoints.concat(randomGeoPoints2).concat(randomGeoPoints3);
    console.log(`Generated ${randomGeoPoints.length} points`);
    fs.writeFileSync('./seed/geo.json', JSON.stringify(randomGeoPoints.concat()), 'utf-8');
}

(async () => {
    try {
        generateLocationData();
        console.log(`Seeding data...`);
        await seedData();
        console.log(`Seeded Data Successfully`);
    } catch (exception) {
        console.log(`Seeding data failed due to : ${exception}`);
    }
})();
