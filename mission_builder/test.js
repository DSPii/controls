var map;
var anotherCoords;
var anotherArea;
var geometryFactory;
var bermudaPolygon;
var anotherPolygon;
var intersection;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: { lat: 24.886, lng: -70.268 },
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // Define the LatLng coordinates for the polygon's path.
  var bermudaCoords = [
    { lat: 25.774, lng: -80.190 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.190 }
  ];

  // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: bermudaCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);

  // Construct another polygon.
  anotherCoords = [
    { lat: 25.774, lng: -85.101 },
    { lat: 25.774, lng: -60.010 }
  ];

  anotherArea = new google.maps.Polygon({
    paths: anotherCoords,
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000FF',
    fillOpacity: 0.35
  });
  anotherArea.setMap(map);



  //calc polygons intersection
  geometryFactory = new jsts.geom.GeometryFactory();
  bermudaPolygon = createJstsPolygon(geometryFactory, bermudaTriangle);
  anotherPolygon = createJstsPolygon(geometryFactory, anotherArea);
  intersection = bermudaPolygon.intersection(anotherPolygon);
  drawIntersectionArea(map, intersection);
}



function drawIntersectionArea(map, polygon) {
  var coords = polygon.getCoordinates().map(function (coord) {
    return { lat: coord.x, lng: coord.y };
  });

  var intersectionArea = new google.maps.Polygon({
    paths: coords,
    strokeColor: '#00FF00',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    fillColor: '#00FF00',
    fillOpacity: 0.35
  });
  intersectionArea.setMap(map);
}



function createJstsPolygon(geometryFactory, polygon) {
  var path = polygon.getPath();
  var coordinates = path.getArray().map(function name(coord) {
    return new jsts.geom.Coordinate(coord.lat(), coord.lng());
  });
  if(coordinates[0].compareTo(coordinates[coordinates.length-1]) != 0) 
      coordinates.push(coordinates[0]);
  var shell = geometryFactory.createLinearRing(coordinates);
  return geometryFactory.createPolygon(shell);
}


google.maps.event.addDomListener(window, 'load', initMap);
