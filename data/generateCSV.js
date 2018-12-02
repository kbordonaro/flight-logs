const fs = require('fs');

// Get the arguments
const args = process.argv.slice(2);
if(args.length < 2) {
  console.log('usage: node generateCSV [filename] [recordCt]');
  return 0;
}

// Create the filename
let filename = args[0];
if(filename.lastIndexOf('.csv') !== filename.length-4) {
  // The csv extension was not included, append the extension.
  filename += '.csv';
}

console.log('Preparing CSV file: ' + filename);

// Functions for generating start and end dates.
const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const randomStartDate = () => {
  const randomDays = (Math.random() * 10) + 1;
  return addDays(new Date(), -1 * randomDays);
};

const addMinutes = (date, minutes) => {
  let result = new Date(date);
  result.setTime(result.getTime() + (minutes*60*1000));
  return result;
};

const randomEndDate = (startDate) => {
  const randomMinutes = (Math.random() * 29) + 1;
  return addMinutes(startDate, randomMinutes);
};

// Random generator for Lat/Lon
const randomCoordinate = () => {
  return ((Math.random() * 30) + 30).toFixed(3);
}

// Generate a UUID
const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const uuid = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

// Generate the data to export.
let content = 'drone,generation,startDate,endDate,latitude,longitude,imagePath\n';
for(let i=0; i<args[1]; i++) {
  // Add the drone id
  content += Math.floor(Math.random() * 1000);
  content += ',';

  // Add the generation
  content += Math.floor(Math.random() * 10);
  content += ',';

  // Start date
  const startDate = randomStartDate();
  content += startDate.toISOString();
  content += ',';

  // End date
  content += randomEndDate(startDate).toISOString();
  content += ',';

  // Latitude
  content += randomCoordinate();
  content += ',';

  // Longitude
  content += randomCoordinate();
  content += ',';

  // Image Path
  content += 'https://s3.amazonaws.com/bucket/path/' + uuid() + '.jpg';
  content += '\n';
}

fs.writeFileSync(filename, content);
