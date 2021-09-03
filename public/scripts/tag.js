mapboxgl.accessToken = 'pk.eyJ1IjoiZGhlZWRvdHNpbWhhIiwiYSI6ImNrdDJwdHBzYjBtazEycXIyY2lrNW01ZjUifQ.J-pXtVANuvD57dxmW8rHZw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })

let actualLongitude, actualLatitude;

function successLocation(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])

    actualLongitude = position.coords.longitude
    actualLatitude = position.coords.latitude

}



function errorLocation() {

    setupMap([77.5946, 12.9716])

}



function setupMap(center) {

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 14
    });

    map.addControl(new mapboxgl.NavigationControl())

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
    });

    map.addControl(directions, 'bottom-left');

    const marker = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: true
    }).setLngLat([77.5946, 12.9716])
        .addTo(map);

}


var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Longitude: " + position.coords.longitude +
        "<br>Latitude: " + position.coords.latitude;
}


function coOrdinates() {
    // document.getElementById("coordinates").innerHTML = "1"+position.coords.longitude;
  /* Get the text field */
  var copyText = document.getElementById("coordinates");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
}