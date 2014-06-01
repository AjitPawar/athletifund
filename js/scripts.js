function initialize() {
    getLocation();
}
google.maps.event.addDomListener(window, 'load', initialize);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        // default location
    }
}

function success(position) {
    //var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var markers = [];
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom : 16,
        center : userLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var defaultBounds = new google.maps.LatLngBounds(
        
    new google.maps.LatLng(position.coords.latitude, position.coords.longitude), new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    //map.fitBounds(defaultBounds);
    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */
    (
    document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox( /** @type {HTMLInputElement} */ (input));
    // [START region_getplaces]
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }
        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var contentString = '<div id="content">'+
                                '<div id="siteNotice">'+
                                '</div>'+
                                '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                                '<div id="bodyContent">'+
                                '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                                '</div>'+
                                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            // var image = {
            //     url: place.icon,
            //     size: new google.maps.Size(71, 71),
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(17, 34),
            //     scaledSize: new google.maps.Size(25, 25)
            // };
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                //icon: image,
                title: place.name,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map, this);
            });
            // google.maps.event.addListener(marker, 'click', function() {
            //     infowindow.open(map,marker);
            // });
            markers.push(marker);
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
    });
    // [END region_getplaces]
    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}

function error(msg) {
    if (msg.code == 1) {
        //PERMISSION_DENIED 
    } else if (msg.code == 2) {
        //POSITION_UNAVAILABLE 
    } else {} //TIMEOUT
}