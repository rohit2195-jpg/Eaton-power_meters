

//JavaScript to toggle dropdown
document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.querySelectorAll('div.dropdown');

    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('mouseover', function(event) {
            var dropdownContent = this.querySelector('.dropdown-content');
            var isDisplayed = dropdownContent.style.display === 'block';
            dropdownContent.style.display = isDisplayed ? 'none' : 'block';
            // Prevents the click from affecting parent elements
            event.stopPropagation();
        });
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('mouseout', function(event) {
        dropdowns.forEach(function(dropdown) {
            var dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            }
        });
    });
});



document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();


  const formData={



      school: document.querySelector('input[id="school"]:checked') ? 1 : null,
      hotels: document.querySelector('input[id="hotel"]:checked') ? 1 : null,
      buildings: document.querySelector('input[id="building"]:checked') ? 1 : null,
      industrial: document.querySelector('input[id="industrial"]:checked') ? 1 : null,
      rail: document.querySelector('input[id="rail"]:checked') ? 1 : null,
      distribution: document.querySelector('input[id="distribution"]:checked') ? 1 : null,
      power: document.querySelector('input[id="power"]:checked') ? 1 : null,
      electric: document.querySelector('input[id="electric"]:checked') ? 1 : null,
      building_automation: document.querySelector('input[id="building_automation"]:checked') ? 1 : null,
      marine: document.querySelector('input[id="marine"]:checked') ? 1 : null,
      renewable: document.querySelector('input[id="renewable"]:checked') ? 1 : null,
      tenant: document.querySelector('input[id="tenant"]:checked') ? 1 : null,
      commericial: document.querySelector('input[id="commercial"]:checked') ? 1 : null,
      residential: document.querySelector('input[id="residential"]:checked') ? 1 : null,
      data: document.querySelector('input[id="data"]:checked') ? 1 : null,




      realTime: document.querySelector('input[id="Real"]:checked') ? 1 : null,
      healthMonitor: document.querySelector('input[id="health"]:checked') ? 1 : null,
      Time: document.querySelector('input[id="time"]:checked') ? 1 : null,
      daylight_savings: document.querySelector('input[id="daylight"]:checked') ? 1 : null,
      waveform: document.querySelector('input[id="waveform"]:checked') ? 1 : null,
      powerQuality: document.querySelector('input[id="quality"]:checked') ? 1 : null,
      dataLogging: document.querySelector('input[id="datalogging"]:checked') ? 1 : null,
      pulseMetering: document.querySelector('input[id="pulse"]:checked') ? 1 : null,
      sag_swell: document.querySelector('input[id="sag/swell"]:checked') ? 1 : null,
      transient: document.querySelector('input[id="transient"]:checked') ? 1 : null,
      harmonic: document.querySelector('input[id="harmonic"]:checked') ? 1 : null,
      remoteControl: document.querySelector('input[id="remote"]:checked') ? 1 : null,
      webSoftware: document.querySelector('input[id="websoftware"]:checked') ? 1 : null,
      overload: document.querySelector('input[id="overload"]:checked') ? 1 : null





  }

  const selectedCostRadio = document.querySelector('input[name="cost"]:checked');
  if (selectedCostRadio) {
    formData.cost = selectedCostRadio.id;
  }

  // Check if the inputs radio button is selected
  const selectedInputsRadio = document.querySelector('input[name="inputs"]:checked');
  if (selectedInputsRadio) {
    formData.inputs = selectedInputsRadio.id;
  }

  const selectedDisplayRadio = document.querySelector('input[name="display"]:checked');
  if (selectedDisplayRadio) {
    formData.display = selectedDisplayRadio.id;
  }

  //const school = document.getElementById("school");
  //const hotel = document.getElementById("hotel")
  console.log(formData.school);


  console.log(formData.cost);
  console.log(formData.display);
  //console.log(inputs);

  fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      // Log the data received from the server
      console.log('Server Response:', data);

        const recommendation = data.result;
        console.log('Recommendation:', recommendation);

        // Insert the recommendation into the label spot
        const meterLinks = {
          'PXM350': 'https://www.eaton.com/us/en-us/catalog/low-voltage-power-distribution-controls-systems/power-xpert-meter-350.html',
          'PXR25': 'https://www.eaton.com/content/dam/eaton/products/electrical-circuit-protection/molded-case-circuit-breakers/power-defense-molded-case-circuit-breakers/power-xpert-release-trip-units-for-power-defense-mn012007en.pdf',
          "PXM1000": "https://www.eaton.com/us/en-us/catalog/low-voltage-power-distribution-controls-systems/power-xpert-meter-1000.html",
          "PXM3000": "https://www.eaton.com/us/en-us/catalog/low-voltage-power-distribution-controls-systems/power-xpert-meter-3000.html",
          "PXQ-ST1-1A1": "https://www.eaton.com/us/en-us/skuPage.PXQ-ST1-1A1.html",
          "PXQ-ST2-1A1": "https://www.eaton.com/us/en-us/skuPage.PXQ-ST2-1A1.html",
          "PXBCM": "https://www.eaton.com/us/en-us/catalog/low-voltage-power-distribution-controls-systems/power-xpert-branch-circuit-monitor.html",
          "PXMP": "https://www.eaton.com/us/en-us/catalog/low-voltage-power-distribution-controls-systems/power-xpert-protection-manager.html"
        };

        // Clear previous recommendations
        document.getElementById("recommendationSpotButton").textContent = "";
        document.getElementById("recommendationSpot").textContent = "";

        // Loop through the recommendation array and create buttons
      const buttonContainer = document.getElementById('recommendationSpotButton');
      recommendation.forEach(meter => {
        const btxt = document.getElementById('recommendationSpot')
        btxt.innerHTML += meter + ", ";
        const button = document.createElement('button');
        button.textContent = meter;
        const link = meterLinks[meter];
        if (link) {
          button.addEventListener('click', () => {
            window.open(link, '_blank'); // Open the link in a new tab
          });
          buttonContainer.appendChild(button);
        } else {
          console.error(`Link not found for meter: ${meter}`);
        }
      });


        // Open the popup
        openResultPopup();
    })
    .catch(error => console.error('Error:', error));
});

function openResultPopup() {
    document.getElementById("popupA").style.display = "block";
}
function closeResultPopup() {
    document.getElementById("popupA").style.display = "none";
}