// function drawPath(markers) {

//     var max_lat = markers[0].position.lat();
//     var max_lat = markers[0].position.lat();
//     var max_lng = markers[0].position.lng();
//     var max_lng = markers[0].position.lng();

//     markers.forEach(function(marker) {
//         var lng = marker.position.lng()
//         var lat = marker.position.lat()
//         if (lat > max_lat) {
//             max_lat = lat;
//         }
//         if (lng > max_lng) {
//             max_lng = lng;
//         }
//     });

//     var path_marker = new google.maps.Marker({ map: map, position: {lat: lats, lng: lons}, icon: pinImage, draggable: false})
//     path_markers.push(path_marker)
//     poly_path.getPath().push(clickEvent.latLng);

//     var lineSymbol = {
//         path: 'M 0,-1 0,1',
//         strokeOpacity: 1,
//         scale: 4
//     };
//     var line = new google.maps.Polyline({
//         path: [{lat: lats, lng: lons}, {lat: lats + .01, lng: lons + .01}],
//         strokeOpacity: 0,
//         icons: [{
//             icon: lineSymbol,
//             offset: '0',
//             repeat: '20px'
//         }],
//         map: map
//     });

//     console.log(lats);
//     console.log(lons);
// }

// var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "00FF00",
//     new google.maps.Size(21, 34),
//     new google.maps.Point(0,0),
//     new google.maps.Point(10, 34));
$(document).ready(function () {
    var labelnum = 1;
    var map = new google.maps.Map(document.getElementById('map'), { center: new google.maps.LatLng(-35.363296, 149.165207), zoom: 17, mapTypeId: google.maps.MapTypeId.HYBRID, scaleControl: true });
    var isClosed = false;
    var markers = [];
    poly = new google.maps.Polyline({ map: map, path: [], strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2 });
    poly_path = new google.maps.Polyline({ map: map, path: [], strokeColor: "#0000FF", strokeOpacity: 1.0, strokeWeight: 2 });
    google.maps.event.addListener(map, 'click', function (clickEvent) {
        if (isClosed)
            return;
        var markerIndex = poly.getPath().length;
        var isFirstMarker = markerIndex === 0;
        var marker = new google.maps.Marker({ map: map,
                                              position: clickEvent.latLng,
                                              draggable: true,
                                              label: String(labelnum++)
                                            });
        markers.push(marker)
        // if (isFirstMarker) {
        //     google.maps.event.addListener(marker, 'click', function () {
        //         if (isClosed)
        //             return;
        //         var path = poly.getPath();
        //         poly.setMap(null);
        //         poly = new google.maps.Polygon({ map: map, path: path, strokeColor: "#FF0000", strokeOpacity: 0.8, strokeWeight: 2, fillColor: "#FF0000", fillOpacity: 0.35 });
        //         isClosed = true;

        //         // draw a path
        //         // drawPath(markers);

        //     });
        // }
        google.maps.event.addListener(marker, 'drag', function (dragEvent) {
            poly.getPath().setAt(markerIndex, dragEvent.latLng);
        });
        poly.getPath().push(clickEvent.latLng);
    });
    $("#a").click( function() {
        var log = "";
        markers.forEach(function(marker) {
            log += marker.position.lat() + " " + marker.position.lng() + "\n";
        });
        var a = document.getElementById("a");
        var file = new Blob([log], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = "mission.txt";

    })
});
