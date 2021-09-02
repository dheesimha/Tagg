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

    setupMap([12.9716, 77.5946])

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
        accessToken: mapboxgl.accessToken
    });

    map.addControl(directions, 'bottom-left');

}
