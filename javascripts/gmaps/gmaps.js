$(function() {
  var stylez = [
    { featureType: 'landscape', elementType: 'geometry', stylers: [
      { hue: '#e3e3eb' },
      { saturation: -38 },
      { lightness: 14 },
      { visibility: 'on' }
    ] },
    { featureType: 'landscape', elementType: 'labels', stylers: [
      { hue: '#6c6c74' },
      { saturation: -87 },
      { lightness: -51 },
      { visibility: 'on' }
    ] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [
      { hue: '#c2c2ca' },
      { saturation: -93 },
      { lightness: 38 },
      { visibility: 'on' }
    ] },
    { featureType: 'road.highway', elementType: 'labels', stylers: [
      { hue: '#c2c2ca' },
      { saturation: -93 },
      { lightness: 38 },
      { visibility: 'on' }
    ] },
    { featureType: 'road.arterial', elementType: 'geometry', stylers: [
      { hue: '#ffffff' },
      { saturation: -100 },
      { lightness: 100 },
      { visibility: 'on' }
    ] },
    { featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [
      { hue: '#d0d0d8' },
      { saturation: -91 },
      { lightness: -17 },
      { visibility: 'on' }
    ] },
    { featureType: 'road.local', elementType: 'geometry.fill', stylers: [
      { hue: '#ffffff' },
      { saturation: -100 },
      { lightness: 100 },
      { visibility: 'on' }
    ] },
    { featureType: 'road.local', elementType: 'geometry.stroke', stylers: [
      { hue: '#d0d0d8' },
      { saturation: -91 },
      { lightness: -17 },
      { visibility: 'on' }
    ] },
    { featureType: 'poi', elementType: 'all', stylers: [
      { hue: '#e3e3eb' },
      { saturation: -61 },
      { lightness: 57 },
      { visibility: 'on' }
    ] },
    { featureType: 'water', elementType: 'all', stylers: [
      { hue: '#c2c2ca' },
      { saturation: -84 },
      { lightness: 7 },
      { visibility: 'on' }
    ] }
  ];
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(47.590266 , 19.046832),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false,
    backgroundColor: '#ceced6'
  };
  var map = new google.maps.Map(document.getElementById('gmaps'),
    mapOptions);
  var mapType = new google.maps.StyledMapType(stylez, { name:"RDI" });
  map.mapTypes.set('rdi', mapType);
  map.setMapTypeId('rdi');
  var rdiMarker = new google.maps.Marker({
    position: new google.maps.LatLng(47.590266 , 19.046832),
    map: map,
    icon: {
      url: 'images/p92rdipin.png'
    }
  });
});
