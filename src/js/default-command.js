// Get Current Location
var Latitude;
var Longitude;

// Show current location on leaflet map
function showMap() {
  var div = document.createElement('div');
  div.innerHTML = `<div id="map"></div>
    
   <div class="command-line typing">
   <span class="prompt"><b>root@pbs:</b>~$</span>
   <input type="text" class="command" oninput="inputData(event)">
   </div>`;
  output.appendChild(div);

  const map = L.map('map').setView([Latitude, Longitude], 12.5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([Latitude, Longitude]).addTo(map)
    .openPopup();

  var newInput = div.querySelector('.command').focus();
  screen.scrollTop = output.scrollHeight;
};


// Function to run a command
function runCommand() {
  // Create a new div element and append
  var div = document.createElement("div");
  div.classList.add("typing");
  div.innerHTML = `
    <div class="command-line">
      <span class="prompt"><b>root@pbs:</b>~$</span>
      <input type="text" class="command" oninput="inputData(event)" placeholder="type help">
    </div>`;
  output.appendChild(div);
  // Set focus on the new input element
  var newInput = div.querySelector(".command").focus();
 
// Current location using geolocation api
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      Latitude = position.coords.latitude;
      Longitude = position.coords.longitude;
    }, error => {
      console.error("Error getting location using Geolocation API: ", error);
    });
  };


  // Add event listener for keydown event on the output element
  output.addEventListener("keydown", function (e) {
    // Check if Enter key is pressed
    if (e.target.classList.contains("command") && e.key === "Enter") {
      // Get the command text from the input and convert it to lowercase
      var commandText = e.target.value.toLowerCase();

      // Create a new div element
      var div = document.createElement("div");
      div.classList.add("typing");
      // Append the div to the output element
      output.appendChild(div);
      // Disable the input and remove the 'command' class
      e.target.disabled = true;
      e.target.classList.remove("command");

      // Check the commandText for different commands and set the inner HTML of the div accordingly
      if (commandText === "help") {
        div.innerHTML = `
          <b class="typing">Available commands:</b>
          <ul class="typing">
            <li>help - shows all available commands.</li>
            <li>pbs - Provides information about digital fingerprinting.</li>
            <li>fetch data --force - Displays your digital fingerprint.</li>
            <li>location - Shows your current location on a map.</li>
            <li>clear - Clears the terminal screen.</li>
          </ul>
          <div class="command-line typing">
            <span class="prompt"><b>root@pbs:</b>~$</span>
            <input type="text" class="command" oninput="inputData(event)">
          </div>`;
      } else if (commandText === "pbs") {
        div.innerHTML = `
          <b class="typing">Fingerprint:</b>
          <p class="typing">This website exhibits the capabilities of web browsers as well as the notion of browser fingerprinting. When you visit any website, they have the capacity to gather and store various information about you, such as your location, browser details, browsing patterns, online activities, and device information, which might be a privacy hazard. To raise awareness and educate people about these concerns, I designed this website, which shows a graphic picture of the data that websites potentially collect. We wish to encourage you to be cautious when accessing unfamiliar or hazardous websites by providing this information.</p>
          <div class="command-line typing">
            <span class="prompt"><b>root@pbs:</b>~$</span>
            <input type="text" class="command" oninput="inputData(event)">
          </div>`;
      } else if (commandText === "fetch data --force") {
        div.innerHTML = `
      <div>
       <b id="fetching-data">Data fetching <span id="loading-value">0%</span>...</b>
      </div>
            
      <div id="progress-bar" style="width: 0%; background-color: #f85a40; transition: all 0.9s ease; height: 5px; margin-bottom: 8px;"></div>
          `;
        runPrint();
      } else if (commandText === 'location') {
        showMap();
      } else if (commandText === "clear") {
        output.innerHTML = "";

        output.innerHTML = `
          <div class="command-line typing">
            <span class="prompt"><b>root@pbs:</b>~$</span>
            <input type="text" class="command" oninput="inputData(event)" placeholder="type help">
          </div>`;
      } else {
        // If the command is invalid, display an error message
        div.innerHTML = `
          <b class="typing" style="color: #f00; text-shadow: 0px 0px 0.9px #f00;">Invalid command:</b>
          <p>Type 'help' for list of commands.</p>
          
          <div class="command-line typing">
            <span class="prompt"><b>root@pbs:</b>~$</span>
            <input type="text" class="command" oninput="inputData(event)">
          </div>`;
      }
      // Set focus on the new input element
      var newInput = div.querySelector(".command").focus();
      // Scroll to the bottom of the output element
      screen.scrollTop = output.scrollHeight;
    }
  });
  // Scroll to the bottom of the output element
  screen.scrollTop = output.scrollHeight;
}


// Browser title change on tab change
let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come back :(";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});
