$.getScript("js/obj.js")

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

            // if name of place is in the list of names
            // display the team name on the HTML 
            // if (place.name in 
            // console.log(place.name[i]);
            // var x = place.name;

            // var contentString = '<div id="content">'+
            //                     '<div id="siteNotice">'+
            //                     '</div>'+
            //                     '<h3 id="firstHeading" class="firstHeading">' + x + '</h1>'+
            //                     '<div id="bodyContent">'+
            //                     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            //                     '</div>'+
            //                     '</div>';

            // var infowindow = new google.maps.InfoWindow({
            //     content: contentString
            // });
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

                console.log(this.title);
                var x = this.title;
                var y = [];    
                for (var k = 0, t; t = TEAMS[k]; k++) {
                    console.log(t.homeRec);
                    if (t.homeRec == x) {
                        console.log("hi");
                        y.push(t.teamName);
                    } 
                }
                console.log(y);

                if (y[0])
                {
                    var teamName = y[0];
                    var contentString = '<div id="content">'+
                                '<div id="siteNotice">'+
                                '</div>'+
                                '<h2 id="firstHeading" class="firstHeading">' + x + '</h2>'+
                                '<div id="bodyContent">'+
                                '<p><b>' + teamName + '</b> plays here!'+
                                '</div>'+
                                '</div>';

                }
                else {

                var contentString = '<div id="content">'+
                                '<div id="siteNotice">'+
                                '</div>'+
                                '<h3 id="firstHeading" class="firstHeading">' + x + '</h1>'+
                                '<div id="bodyContent">'+
                                '<p>No teams play here.' +
                                '</div>'+
                                '</div>';

                }

                var infowindow = new google.maps.InfoWindow({
                content: contentString
                });

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

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};
 
var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

var SearchList = ['Rufus Garcia' ,'Bernadette Warren' ,'Wilbert Thomas','Celia May','Roy Abbott', 'Warriors', 'Little League', 'Hurricanes', 'Pistons', 'Raptors', 'Colorado State Skiing Team', 'Johnny Walker', 'Rosie Smiles', 'Wayne Bryan', 'Dennis Hong', 'Valentino Rossi', 'Jimmy Charles', 'Martina Petkova', 'Jade Harley', 'Hannah Connor', 'Carrie White', 'Kaitlyn Owen'];
