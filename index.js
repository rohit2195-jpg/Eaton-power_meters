const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/search', (req, res) => {
  const formData = req.body;

  // Process the form data and search the CSV file
  searchCSV(formData, (result) => {
      // Send the result back to script.js
      res.json({ result });
    });
});

function searchCSV(formData, callback) {
  let scores = {}; // Initialize scores object to store scores for each meter
  let bestMeters = [];

  // Use csv-parser to read and search through the CSV file
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      const meters = Object.keys(row); // Get the meters from the row

      // Iterate over meters starting from the second column
      for (let i = 1; i < meters.length; i++) {
        const meter = meters[i];
        scores[meter] = scores[meter] || 0; // Initialize score for the meter if not already initialized

        // Check if the row is the "Cost" row
        if (row.Meter === 'Cost' && row[meter] === formData.cost) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Display' && row[meter] === formData.display) {
          scores[meter]++; // Increment score for matching meter
        }

        // Check if the row is the "Number of Sensing Inputs" row
        if (row.Meter === 'Number of Sensing Inputs' && (row[meter]) === formData.inputs) {
          scores[meter] ++; // Increment score for matching meter
        }

        // Check if the row is "Applications" row
        if (row.Meter === 'School' && parseInt(row[meter]) === formData.school) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Hotels' && parseInt(row[meter]) === formData.hotels) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Buildings' && parseInt(row[meter]) === formData.buildings) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Industrial Environment/Automation' && parseInt(row[meter]) === formData.industrial) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Rail Transport' && parseInt(row[meter]) === formData.rail) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Distribution Cabinet' && parseInt(row[meter]) === formData.distribution) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Power Distribution Automation' && parseInt(row[meter]) === formData.power) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Electric Switch Gear and Control Panels' && parseInt(row[meter]) === formData.electric) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Building Automation' && parseInt(row[meter]) === formData.building_automation) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Marine Applications' && parseInt(row[meter]) === formData.marine) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Renewable Energy' && parseInt(row[meter]) === formData.renewable) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Tenant Metering' && parseInt(row[meter]) === formData.tenant) {
          scores[meter]++; // Increment score for matching meter

        }if (row.Meter === 'Commercial Metering' && parseInt(row[meter]) === formData.commercial) {
          scores[meter]++; // Increment score for matching meter
          
        }
        
        if (row.Meter === 'Residential Metering' && parseInt(row[meter]) === formData.residential) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Data Center' && parseInt(row[meter]) === formData.data) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Real Time Metering' && parseInt(row[meter]) === formData.realTime) {
          scores[meter]++; // Increment score for matching meter
          
        }

        if (row.Meter === 'Health Monitor' && parseInt(row[meter]) === formData.healthMonitor) {
          scores[meter]++; // Increment score for matching meter
        }

        if (row.Meter === 'Time of Use' && parseInt(row[meter]) === formData.Time) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Daylight Savings Time' && parseInt(row[meter]) === formData.daylight_savings) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Waveform Capture' && parseInt(row[meter]) === formData.waveform) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Power Quality' && parseInt(row[meter]) === formData.powerQuality) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'On Board Data Logging' && parseInt(row[meter]) === formData.dataLogging) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Pulse Metering' && parseInt(row[meter]) === formData.pulseMetering) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Sag/Swell Recording' && parseInt(row[meter]) === formData.sag_swell) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Transient Recording (6MHZ)' && parseInt(row[meter]) === formData.transient) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Harmonic Distortion' && parseInt(row[meter]) === formData.harmonic) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Remote Power Control' && parseInt(row[meter]) === formData.remoteControl) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Onboard web-based software' && parseInt(row[meter]) === formData.webSoftware) {
          scores[meter]++; // Increment score for matching meter
        }
        if (row.Meter === 'Overload Alerts' && parseInt(row[meter]) === formData.overload) {
          scores[meter]++; // Increment score for matching meter
        }
      

      }
    })
    .on('end', () => {
      console.log('Search complete');

      // Find the meter with the highest score
    let maxScore = -1;
      Object.values(scores).forEach((score) => {
        maxScore = Math.max(maxScore, score);
      });

      // Find all meters with the highest score
      Object.entries(scores).forEach(([meter, score]) => {
        if (score === maxScore) {
          bestMeters.push(meter); // Add meter to bestMeters array
        }
      });

      // Invoke the callback with the best recommendation(s)
      callback(bestMeters);
      console.log(scores);
    });
}



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});