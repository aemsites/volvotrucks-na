/* eslint-disable  */

// Map Sidebar Animation
$('.slider-arrow').click(function () {

  if ($(this).hasClass('show')) {

    if ($(window).width() <= 700) {
      $(".slider-arrow, .sidebar, .sidebar-legend").animate({
        left: "+=80%"
      }, 200, function () {
        // Animation complete.
      });
    }
    else {
      $(".slider-arrow, .sidebar, .sidebar-legend").animate({
        left: "+=483"
      }, 200, function () {
        // Animation complete.
      });
    }

    $(this).removeClass('show').addClass('hide').find('i').removeClass('fa fa-angle-right').addClass('fa fa-angle-left');
  }
  else {

    if ($(window).width() <= 700) {
      $(".slider-arrow, .sidebar, .sidebar-legend").animate({
        left: "-=80%"
      }, 200, function () {
        // Animation complete.
      });
    }
    else {
      $(".slider-arrow, .sidebar, .sidebar-legend").animate({
        left: "-=483"
      }, 200, function () {
        // Animation complete.
      });
    }

    $(this).removeClass('hide').addClass('show').find('i').removeClass('fa fa-angle-left').addClass('fa fa-angle-right');
  }
});

// Global values
$html = $('html');
$pins2 = [];
$pins = [];                                                                                     // array of all pin details (YOUR ARRAY OF PINS GO HERE)
$location = null;                                                                               // stores users current coordinates {lat, lng}
$radius = null;                                                                                 // stores current google maps radius object
$me = null;                                                                                     // stores the 'me' marker object
$nearbyPins = [];                                                                               // stores pin ID's for pins shown in radius
$markers = [];                                                                                  // stores all google marker objects
$radiusControl = $('#filters input[type="range"]');                                             // the radius filter control input
$map = null;                                                                                    // the main google map object
$geocoder = null;                                                                               // geocoder object for all things geocode
$filters = $('.sidebar-content #filter-options input[type="checkbox"]');                        // the radio group filter values
$consolidateFilters = window.locatorConfig.consolidateFilters;                                  // Shows "All Dealers" and "Rental & Leasing" filter options
$viewingPin = null;                                                                             // tracks current pin in view
$pinIcon = 'pin.svg';                                                                           // sets basic marker pin icon
//$pinIconHover = 'pin_hover.svg';                                                              // sets hover marker pin icon
$meIcon = '/blocks/dealer-locator/images/ME.svg';                                               // sets the icon of the ME marker
$panes = [];                                                                                    // cache all panes created
$lastPane = "";                                                                                 // track the last pane in view
$radiusValue = $('#range').val();                                                               // the current radius value
$sortedPins = null;                                                                             // stores all pins by distance (miles)
$offset = ((new Date().getTimezoneOffset()) / 60) * -1;
$key = window?.locatorConfig?.apiKey || '';
$myDealer = null;
$wayPoints = [];
$directionsService = null;
$directionsDisplay = null;
$directionsObject = null;
$printDirections = $('#print-directions');
$printableDirections = $('#printable-directions');
$directionResults = null;
$currentAddress = '';
$directionsMessage = $('#directions-message');
$isAmentities = window.locatorConfig.amenities;
$brandOptionSelected = "";
var uptimeClicked = false;
$electricDealer = false;
$hoverText = $('#hoverText').val();

const colorGrey1 = getComputedStyle(document.documentElement).getPropertyValue('--c-grey-1');
const colorGrey2 = getComputedStyle(document.documentElement).getPropertyValue('--c-grey-2');
const colorGrey3 = getComputedStyle(document.documentElement).getPropertyValue('--c-grey-3');
const colorGrey4 = getComputedStyle(document.documentElement).getPropertyValue('--c-grey-4');

// Google callback letting us know maps is ready to be used
(function () {
  initMap = function () {

    $geocoder = new google.maps.Geocoder();

    $map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 39.670469, lng: -101.766407 },                                             // set default center to be U.S.A
      zoom: 4,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": colorGrey1
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": colorGrey4
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": colorGrey1
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": colorGrey2
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": colorGrey1
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": colorGrey3
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": colorGrey3
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": colorGrey4
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": colorGrey1
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    });

    // Attempt geolocation
    $.fn.setLocation();

    $directionsService = new google.maps.DirectionsService();
    $directionsDisplay = new google.maps.DirectionsRenderer();
  }
})();

$.fn.initGoogleMaps = function () {
  // Lets us control OOO when some cases gmaps takes longer to initialize
  $.ajax({
    type: "GET",
    url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAP8IewqHuU8SMz_6tNiIUlbU_l0GFOd1w&libraries=places,geometry",
    dataType: "script",
    success: function (d) {
      initMap();
    }
  });
};

$.fn.getTimeZoneId = async function (dealer) {
  var lat = dealer.MAIN_LATITUDE;
  var long = dealer.MAIN_LONGITUDE;

  var apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${long}&timestamp=${Math.floor(Date.now() / 1000)}&key=${$key}`;

  var response = await fetch(apiUrl);
  var locationObj = await response.json();

  return locationObj.timeZoneId;
};

$.fn.loadPins = function () {


  $pins = [];
  $nearbyPins = [];
  $markers = [];

  if (!window.locatorConfig.dataSource) {
    // TODO: Review this:
    window.locatorConfig.dataSource = '/simpleprox.ashx?https://dealerlocator.volvotrucks.us/Volvo_DealerJson.ashx';
  }

  $.ajax({
    url: `${window.locatorConfig.dataSource}?state=1`,
    type: "GET",
    success: function (data) {

      try {
        data = JSON.parse(data);
      } catch (e) {
        // data is already an object, proceed.
      }

      for (var country in data.countries) {

        if (data.countries.hasOwnProperty(country)) {

          $country = data.countries[country];

          for (var state in $country.states) {

            if ($country.states.hasOwnProperty(state)) {

              $state = $country.states[state];

              for (var dealer in $state.dealers) {

                if ($state.dealers.hasOwnProperty(dealer)) {

                  $dealer = $state.dealers[dealer];

                  if ($dealer.services) {

                    for (var service in $dealer.services) {

                      if ($dealer.services.hasOwnProperty(service)) {

                        $service = $dealer.services[service];

                        if ($service.toLowerCase().indexOf("certified uptime") > -1) {
                          $dealer.isCertifiedUptimeCenter = true;
                          $electricDealer = false;
                        }

                        if ($service.toLowerCase().indexOf("certified") > -1) {
                          $dealer.isCertifiedCenter = true;
                        }

                        if ($service.toLowerCase().indexOf('premium used') > -1) {
                          $dealer.isPremiumUsedTruckDealer = true;
                          $service = 'Premium Certified Used Truck Dealer';
                        }

                        if ($service.toLowerCase().indexOf('select part store') > -1) {
                          $dealer.services[service] = 'SELECT Part Store&reg;';
                        }
                      }

                    }
                    if (Object.values($dealer.services).includes('Volvo Certified EV Dealer')) {
                      $electricDealer = true;
                      // $dealer.services == "Volvo Certified EV Dealer"
                      // $dealer.services[service] = 'Volvo Certified EV Dealer';
                    }

                  }
                  if ($dealer.isCertifiedUptimeCenter) {
                    var pinIcon = {
                      url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
                      scaledSize: new google.maps.Size(17, 23), // scaled size
                      origin: new google.maps.Point(0, 0), // origin
                      anchor: new google.maps.Point(0, 0)
                    }
                    if ($electricDealer === true || ($dealer.services && Object.values($dealer.services).includes('Volvo Certified EV Dealer'))) {
                      var pinIcon = {
                        url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
                        scaledSize: new google.maps.Size(17, 23), // scaled size
                        origin: new google.maps.Point(0, 0), // origin
                        anchor: new google.maps.Point(0, 0)
                      }
                    }
                  }
                  else if ($electricDealer === true || ($dealer.services && Object.values($dealer.services).includes('Volvo Certified EV Dealer'))) {
                    var pinIcon = {
                      url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
                      scaledSize: new google.maps.Size(17, 23), // scaled size
                      origin: new google.maps.Point(0, 0), // origin
                      anchor: new google.maps.Point(0, 0)
                    }
                  }
                  else {
                    var pinIcon = {
                      url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
                      scaledSize: new google.maps.Size(17, 23), // scaled size
                      origin: new google.maps.Point(0, 0), // origin
                      anchor: new google.maps.Point(0, 0)
                    }
                  }

                  $marker = new google.maps.Marker({
                    id: $dealer.IDENTIFIER_VALUE,
                    position: { lat: parseFloat($dealer.MAIN_LATITUDE), lng: parseFloat($dealer.MAIN_LONGITUDE) },
                    title: $dealer.COMPANY_DBA_NAME,
                    map: $map,
                    icon: pinIcon
                  });

                  // Marker click event listener
                  $marker.addListener('click', function () {

                    var index = $markers.indexOf(this);

                    var marker = $markers[index];

                    $map.panTo(marker.position);

                    if ($lastPane == 'sidebar-select-pins') {

                      var details = null;
                      for (i = 0; i < $pins.length; i++) {

                        if ($pins[i].IDENTIFIER_VALUE == marker.id) {

                          if ($.fn.isWaypoint($pins[i].waypoint)) {
                            continue;
                          }

                          $wayPoints.push($pins[i].waypoint);
                          details = $pins[i];
                          // minus icon
                          var pinIcon = $.fn.drawPin('-', 38, 38, '808080');
                          marker.setIcon(pinIcon);
                          // update select-pins display with location
                          $.fn.renderAddDirectionsPin(marker, details);

                        }

                      }

                      return;
                    }

                    // reset all markers to basic
                    $markers.forEach(function (marker) {

                      var details = $.fn.getPinById(marker.ID);

                      if (details.isCertifiedUptimeCenter) {
                        var pinIcon = {
                          url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
                          scaledSize: new google.maps.Size(17, 23), // scaled size
                          origin: new google.maps.Point(0, 0), // origin
                          anchor: new google.maps.Point(0, 0)
                        }
                        if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
                          var pinIcon = {
                            url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
                            scaledSize: new google.maps.Size(17, 23), // scaled size
                            origin: new google.maps.Point(0, 0), // origin
                            anchor: new google.maps.Point(0, 0)
                          }
                        }
                      }
                      else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
                        var pinIcon = {
                          url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
                          scaledSize: new google.maps.Size(17, 23), // scaled size
                          origin: new google.maps.Point(0, 0), // origin
                          anchor: new google.maps.Point(0, 0)
                        }
                      }
                      else {
                        var pinIcon = {
                          url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
                          scaledSize: new google.maps.Size(17, 23), // scaled size
                          origin: new google.maps.Point(0, 0), // origin
                          anchor: new google.maps.Point(0, 0)
                        }
                      }

                      marker.setIcon(pinIcon);

                    });

                    var details = $.fn.getPinById(marker.ID);
                    if (details.isCertifiedUptimeCenter) {
                      var pinIcon = {
                        url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
                        scaledSize: new google.maps.Size(58, 80), // scaled size
                        origin: new google.maps.Point(0, 0), // origin
                        anchor: new google.maps.Point(0, 0)
                      }
                      if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
                        var pinIcon = {
                          url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
                          scaledSize: new google.maps.Size(58, 80), // scaled size
                          origin: new google.maps.Point(0, 0), // origin
                          anchor: new google.maps.Point(0, 0)
                        }
                      }
                    }
                    else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
                      var pinIcon = {
                        url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
                        scaledSize: new google.maps.Size(58, 80), // scaled size
                        origin: new google.maps.Point(0, 0), // origin
                        anchor: new google.maps.Point(0, 0)
                      }
                    }
                    else {
                      var pinIcon = {
                        url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
                        scaledSize: new google.maps.Size(58, 80), // scaled size
                        origin: new google.maps.Point(0, 0), // origin
                        anchor: new google.maps.Point(0, 0)
                      }
                    }

                    marker.setIcon(pinIcon);

                    $.fn.myDealer();

                    $.fn.switchSidebarPane('sidebar-pin', marker.id);

                  });

                  $markers.push($marker);

                  $marker.ID = $dealer.IDENTIFIER_VALUE;

                  $dealer.waypoint = {
                    id: $dealer.IDENTIFIER_VALUE,
                    point: {
                      location: new google.maps.LatLng($dealer.MAIN_LATITUDE, $dealer.MAIN_LONGITUDE),
                      stopover: false
                    }
                  };

                  $pins.push($dealer);

                  $pins2.push($dealer);

                }

              }
            }
          }
        }
      }

      $.fn.myDealer();
      $.fn.filterRadius();

      var markerId = $.fn.getUrlParameter('view');
      var viewMarker = $.fn.getPinById(markerId);
      if (markerId && viewMarker) {


        //setCenter
        for (i = 0; i < $markers.length; i++) {

          if ($markers[i].id == markerId) {

            $.fn.switchSidebarPane('sidebar-pin', markerId);

          }
        }


      }


    }

  });
};

$.fn.removeWaypoint = function (pin) {

  var $this = $(pin);
  var $id = $this.attr('data-id');

  for (var i = 0; i < $pins.length; i++) {

    if ($markers[i].id == $id) {

      var pinIcon = $.fn.drawPin('+', 38, 38, '4174C4');

      $markers[i].setIcon(pinIcon);
    }

  }

  $wayPoints = $.grep($wayPoints, function (w) {
    return w.id != $id;
  });

  var parent = $this.parents('.panel-card');

  parent.remove();

};

$.fn.isWaypoint = function (waypoint) {

  for (var i = 0; i < $wayPoints.length; i++) {
    if ($wayPoints[i].id == waypoint.id) {
      return true;
    }
  }
  return false;
};

$.fn.formatTime = function (timeString) {
  var [ hour, minutes ] = timeString.split(':');
  var period = 'AM';
  if (hour >= 12) {
    period = 'PM';
    hour = hour - 12;
  }
  return `${hour}:${minutes} ${period}`
}

$.fn.getOpenHours = function (pin) {
  var time = new Date();
  var today = time.getDay();

  var isLeasing = Object.keys(pin.hours)[0].toLowerCase() === 'leasing';
  var allTimes;

  if (!isLeasing) {
    var { Parts: parts, Sales: sales, Service: service } = pin.hours;
    allTimes = [ parts[today], sales[today], service[today] ];
  } else if (isLeasing) {
    var { Leasing: leasing } = pin.hours;
    allTimes = [ leasing[today] ];
  }

  var earliestHour;
  var latestHour;

  allTimes.forEach((time, idx) => {
    var { Start: start, End: end } = time;
    var compareDate = '1/1/2000 '

    switch (start.toLowerCase()) {
      case 'midnight':
      case '24':
        start = '12:00 AM';
        break;
      case 'noon':
        start = '12:00 PM';
        break;
    }

    switch (end.toLowerCase()) {
      case 'midnight':
      case '24':
        end = '11:59 PM';
        break;
      case 'noon':
        end = '12:00 PM';
        break;
    }

    if (idx === 0) {
      earliestHour = start;
      latestHour = end;
    } else {
      if (start != '' && new Date (compareDate + start) < new Date (compareDate + earliestHour) || earliestHour === '') {
        earliestHour = start;
      }
      if (end != '' && new Date (compareDate + end) > new Date (compareDate + latestHour)) {
        latestHour = end;
      }
    }
  });

  return { open: earliestHour, close: latestHour }
};

$.fn.isOpen = async function (dealer, time) {
  var hours = $.fn.getOpenHours(dealer);
  var compareDate = '1/1/2000 '

  if (!dealer.timeZoneId) {
    dealer.timeZoneId = await $.fn.getTimeZoneId(dealer);
  }

  if (hours) {
    var start = new Date(compareDate + hours.open);
    var end = new Date(compareDate + hours.close);

    if (~hours.close.toLowerCase().indexOf("am")) {
      // console.log('end date is AM, add 1 day');
      end.setDate(compareDate.getDate() + 1);
    }

    var openTime = (start.getHours() * 60) + start.getMinutes();
    var closeTime = (end.getHours() * 60) + end.getMinutes();

    var stringDealerDate = moment().tz(dealer.timeZoneId).format();
    var hourPosition = stringDealerDate.indexOf('T');
    var dealerLocalHour = stringDealerDate.substring(hourPosition + 1, hourPosition + 6);
    var [ hour, minutes ] = dealerLocalHour.split(':');
    var dealerTime = (Number(hour) * 60) + Number(minutes);

    if (dealerTime >= openTime && dealerTime < closeTime) {
      return { open: true };
    } else {
      return { open: false };
    }
  }
};

$.fn.canDetermineHours = function (pin) {

  var hours = null;

  if (pin.hours['Parts']) {
    hours = pin.hours['Parts'];
  }

  if (!hours && pin.hours['Service']) {
    hours = pin.hours['Service'];
  }

  if (!hours && pin.hours['Leasing']) {
    hours = pin.hours['Leasing'];
  }

  if (hours) {

    return true;
  }
  return false;
};

$.fn.renderPinDirections = function (markerId) {

  var templateClone = $($('#sidebar-directions').clone(true).html());
  var templateClone = $($('#sidebar-direction-list').clone(true).html());
  var markerDetails;

  $('.add-directions').attr('data-id', markerId);

  for (i = 0; i < $sortedPins.length; i++) {

    if ($sortedPins[i].IDENTIFIER_VALUE == markerId) {

      markerDetails = $sortedPins[i];
    }

  }

  $('.main-header').css('display', 'none');
  $('.main-directions').css('display', 'block');
  $('.go-back').css('display', 'none');

  $origin = $currentAddress;
  if (!$origin || $origin == '') {
    $origin = $location[0] + ',' + $location[1];
    $('.from-directions input').val($origin);
  }

  let {
    MAIN_ADDRESS_LINE_1_TXT: address1,
    MAIN_ADDRESS_LINE_2_TXT: address2,
    MAIN_CITY_NM: mainCity,
    MAIN_STATE_PROV_CD: mainState,
    MAIN_POSTAL_CD: postalCd,
   } = markerDetails;

  $destination = `${address1 || address2} ${mainCity} ${mainState} ${postalCd}`

  if ($('.from-directions input').val()) {
    $origin = $('.from-directions input').val();
  }

  $directionsObject = {
    origin: $origin,
    destination: $destination,
    travelMode: 'DRIVING',
    optimizeWaypoints: true,
    provideRouteAlternatives: true,
    waypoints: $.fn.wayPointArray()
  };

  $directionsService.route(
      $directionsObject,
      function (result, status) {
        if (status == 'OK') {

          $directionsDisplay.setMap($map);

          $directionsDisplay.setPanel(templateClone.find("#directions-container").get(0));
          $directionsDisplay.setDirections(result);
          $directionResults = result;
        }
      }
  );

  $('.from-directions input').val($origin);
  $('.to-directions input').val($destination);

  var waypointDecodeUrl = "";
  for (var x = 0; x < $wayPoints.length; x++) {
    var loc = $wayPoints[x].point.location;

    waypointDecodeUrl += '/' + loc.lat() + ',' + loc.lng() + '/';
  }

  templateClone.find('#gmaps-link').attr('onclick', 'window.open("https://www.google.com/maps/dir/' + $origin + '/' + $destination + waypointDecodeUrl + '", "_blank")');

  return templateClone;
}

// Creates sidebar-pini overview item
$.fn.renderPinDetails = async function (markerId) {

  var templateClone = $($('#sidebar-pin').clone(true).html());
  var markerDetails;

  for (i = 0; i < $sortedPins.length; i++) {
    if ($sortedPins[i].IDENTIFIER_VALUE == markerId) {
      markerDetails = $sortedPins[i];
    }
  }

  var marker;
  for (i = 0; i < $markers.length; i++) {
    if ($markers[i].id == markerId) {
      marker = $markers[i];
      $viewingPin = marker;
    }
  }

  templateClone.find('#title').text($.fn.camelCase(markerDetails.COMPANY_DBA_NAME));
  templateClone.find('#title2').text($.fn.camelCase(markerDetails.COMPANY_DBA_NAME));

  if (!markerDetails.MAIN_ADDRESS_LINE_1_TXT) {
    templateClone.find('#address1 div').text(markerDetails.MAIN_ADDRESS_LINE_2_TXT);
    templateClone.find('#address2').next().remove();
    templateClone.find('#address2').remove();
  } else if (!markerDetails.MAIN_ADDRESS_LINE_2_TXT) {
    templateClone.find('#address1 div').text(markerDetails.MAIN_ADDRESS_LINE_1_TXT);
    templateClone.find('#address2').next().remove();
    templateClone.find('#address2').remove();
  } else {
    templateClone.find('#address1 div').text(markerDetails.MAIN_ADDRESS_LINE_1_TXT);
    templateClone.find('#address2 div').text(markerDetails.MAIN_ADDRESS_LINE_2_TXT);
  }

  templateClone.find('#city-state-zip div').text(markerDetails.MAIN_CITY_NM + ', ' + markerDetails.MAIN_STATE_PROV_CD + ' ' + markerDetails.MAIN_POSTAL_CD);

  if (markerDetails.WEB_ADDRESS) {
    templateClone.find('.detail-website a').attr('href', $.fn.formatWebAddress(markerDetails.WEB_ADDRESS));
    templateClone.find('#website').text(markerDetails.WEB_ADDRESS).css('text-transform','lowercase');
  } else {
    templateClone.find('.detail-website').css({'pointer-events':'none','cursor':'default','opacity':'0.5'});
    templateClone.find('#website').css({'pointer-events':'none','cursor':'default','opacity':'0.5'});
    templateClone.find('#website').parent().addClass('noDataClass');
  }

  if (markerDetails.EMAIL_ADDRESS) {
    templateClone.find('#email').html('<a href="mailto:' + markerDetails.EMAIL_ADDRESS.toLowerCase() + '">' + markerDetails.EMAIL_ADDRESS.toLowerCase() + '</a>');
    templateClone.find('.detail-email').html('<a href="mailto:' + markerDetails.EMAIL_ADDRESS.toLowerCase() + '">' + '<img src="/blocks/dealer-locator/images/Mail-2.png" />' + "Email" + '</a>');
  } else {
    templateClone.find('.detail-email').html('<a>' + '<img src="/blocks/dealer-locator/images/Mail-2.png" />' + "Email" + '</a>');
    templateClone.find('.detail-email').css({'pointer-events':'none','cursor':'default','opacity':'0.5'});
    templateClone.find('#email').parent().addClass('noDataClass');
    templateClone.find('#email').css({'pointer-events':'none','cursor':'default','opacity':'0.5'});
  }

  templateClone.find('#phone div').html('<a href="tel:' + markerDetails.REG_PHONE_NUMBER + '">' + $.fn.formatPhoneNumber(markerDetails.REG_PHONE_NUMBER) + '</a>');
  templateClone.find('#directions').attr('data-id', markerDetails.IDENTIFIER_VALUE);
  templateClone.find('#clipboard-address').attr('data-clipboard', markerDetails.MAIN_ADDRESS_LINE_1_TXT + ' ' + markerDetails.MAIN_ADDRESS_LINE_2_TXT + ' ' + markerDetails.MAIN_CITY_NM + ', ' + markerDetails.MAIN_STATE_PROV_CD + ' ' + markerDetails.MAIN_POSTAL_CD);

  templateClone.find('#open-website').attr('onclick', "window.open('" + $.fn.formatWebAddress(markerDetails.WEB_ADDRESS) + "', '_blank')");

  templateClone.find('#share-link').val(window.location.href.split('?')[0] + '?view=' + markerDetails.IDENTIFIER_VALUE);

  if (markerDetails.REG_PHONE_NUMBER) {
    templateClone.find('.detail-call').html('<a href="tel:' + markerDetails.REG_PHONE_NUMBER + '">' + '<img src="/blocks/dealer-locator/images/Phone-2.png" />' + "Call" + '</a>');
  } else {
    templateClone.find('.detail-call').html('<a>' + '<img src="/blocks/dealer-locator/images/Phone-2.png" />' + "Call" + '</a>');
    templateClone.find('.detail-call').css({'pointer-events':'none','cursor':'default','opacity':'0.5'});
  }

  templateClone.find('#head-marker').attr('src', $viewingPin.icon.url);
  templateClone.find('#head-marker').css('width', '31px');
  templateClone.find('#head-marker').css('height', '43px');

  var myDealer = $.fn.getCookie('my-dealer');

  if (myDealer == markerDetails.IDENTIFIER_VALUE) {
    //  templateClone.find('#set-dealer span').text('Preferred Dealer');
    templateClone.find('#set-dealer').html('<img src="/blocks/dealer-locator/images/Vector-3.svg" />');
    templateClone.find('#head-marker').attr('src', $viewingPin.icon);
  }
  else {
    // templateClone.find('#set-dealer span').text('Set As Your Dealer');
    templateClone.find('#set-dealer').html('<img src="/blocks/dealer-locator/images/Star-1.svg" />');
  }
  templateClone.find('#set-dealer').attr('data-pin', markerDetails.IDENTIFIER_VALUE);

  var openHours = $.fn.getOpenHours(markerDetails);
  var isOpenHtml = "";

  if (openHours.open === '' && openHours.close === '') {
    isOpenHtml = "No schedule information available";
  } else if (openHours.open.toLowerCase() === 'open 24 hours') {
    isOpenHtml = openHours.open
  } else if (openHours.open.toLowerCase() === 'closed') {
    isOpenHtml = openHours.open
  } else {
    var isOpen = await $.fn.isOpen(markerDetails);
    isOpenHtml = `${isOpen.open ? 'Open' : 'Closed' } - ${openHours.open.toLowerCase()} - ${openHours.close.toLowerCase()}`;
  }

  var servicesHtml = templateClone.find('#services');
  var driversHtml = templateClone.find('#drivers');
  var driverAmenities = [];
  var newdriverAmenities = [];
  var serviceAmenities = [];
  if (markerDetails.services) {
    var newMarkerDetail = Object.values(markerDetails.services);
  }
  if (newMarkerDetail) {
    jQuery.grep(newMarkerDetail, function (el) {
      if (jQuery.inArray(el, $isAmentities) == -1) serviceAmenities.push(el);
    });
  }
  if ($isAmentities) {
    jQuery.grep($isAmentities, function (el) {
      if (jQuery.inArray(el, newMarkerDetail) == -1) driverAmenities.push(el);
    });
  }
  if ($isAmentities) {
    jQuery.grep($isAmentities, function (el) {
      if (jQuery.inArray(el, driverAmenities) == -1) newdriverAmenities.push(el);
    });
  }
  if (serviceAmenities) {
    $.each(serviceAmenities, function (i, item) {

      $("<li/>", {
        'html': serviceAmenities[i]
      }).appendTo(servicesHtml);

    });
  }
  if (newdriverAmenities) {
    $.each(newdriverAmenities, function (i, item) {

      $("<li/>", {
        'html': newdriverAmenities[i]
      }).appendTo(driversHtml);
    });
  }
  var driversId = templateClone.find('#drivers');
  if (driversId && !driversId.find('li').length || newdriverAmenities.length == 0) {
    templateClone.find('.header-driver-title').hide();
  } else {
    templateClone.find('.header-driver-title').show();
  }

  if ($.isEmptyObject(markerDetails.services)) {
    templateClone.find('.header-title').css('display', 'none');
  }

  // We need to display all hours to the user in the details pane
  var hours = null;
  var hoursHtml = templateClone.find('#details');
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var hasPartsHours = false,
      hasServiceHours = false,
      hasLeasingHours = false,
      hasSalesHours = false;


  if (markerDetails.hours.Parts) {
    hours = markerDetails.hours.Parts;

    $("<div/>", {
      'html': '<div class="hours-dept">Parts:</div>'
    }).appendTo(hoursHtml);

    var added = 0;
    $.each(hours, function (i, item) {

      if (hours[i].Start.toLowerCase().indexOf('24 hours') >= 0 || hours[i].Start.toLowerCase().indexOf('closed') >= 0) {
        hours[i].Start = '';
      } else if (hours[i].Start.toLowerCase().length <= 0) {
        return;
      }

      $("<div/>", {
        'html': '<span id=day>' + days[i] + '</span> <span id=time>' + hours[i].Start + ((!hours[i].Start) ? '' : ' - ') + hours[i].End + '</span>'
      }).appendTo(hoursHtml);
      added++;
      hasPartsHours = true;
    });

    if (added <= 0) {
      $("<div/>", {
        'html': 'Please call for hours.'
      }).appendTo(hoursHtml);
    }

  }

  if (markerDetails.hours.Service) {
    hours = markerDetails.hours.Service;

    $("<div/>", {
      'html': '<div class="hours-dept">Service:</div>'
    }).appendTo(hoursHtml);

    var added = 0;
    $.each(hours, function (i, item) {

      if (hours[i].Start.toLowerCase().indexOf('24 hours') >= 0 || hours[i].Start.toLowerCase().indexOf('closed') >= 0) {
        hours[i].Start = '';
      } else if (hours[i].Start.toLowerCase().length <= 0) {
        return;
      }

      $("<div/>", {
        'html': '<span id=day>' + days[i] + '</span> <span id=time>' + hours[i].Start + ((!hours[i].Start) ? '' : ' - ') + hours[i].End + '</span>'
      }).appendTo(hoursHtml);
      added++;
      hasServiceHours = true;
    });

    if (added <= 0) {
      $("<div/>", {
        'html': 'Please call for hours.'
      }).appendTo(hoursHtml);
    }
  }

  if (markerDetails.hours.Leasing) {
    hours = markerDetails.hours.Leasing;

    $("<div/>", {
      'html': '<div class="hours-dept">Leasing:</div>'
    }).appendTo(hoursHtml);

    var added = 0;
    $.each(hours, function (i, item) {

      if (hours[i].Start.toLowerCase().indexOf('24 hours') >= 0 || hours[i].Start.toLowerCase().indexOf('closed') >= 0) {
        hours[i].Start = '';
      } else if (hours[i].Start.toLowerCase().length <= 0) {
        return;
      }

      $("<div/>", {
        'html': '<span id=day>' + days[i] + '</span> <span id=time>' + hours[i].Start + ((!hours[i].Start) ? '' : ' - ') + hours[i].End + '</span>'
      }).appendTo(hoursHtml);
      added++;
      hasLeasingHours = true;
    });
    if (added <= 0) {
      $("<div/>", {
        'html': 'Please call for hours.'
      }).appendTo(hoursHtml);
    }
  }


  if (markerDetails.hours.Sales) {
    hours = markerDetails.hours.Sales;

    if (hours[0].Start.length > 0) {
      $("<div/>", {
        'html': '<div class="hours-dept">Sales:</div>'
      }).appendTo(hoursHtml);
      var added = 0;
      $.each(hours, function (i, item) {

        if (hours[i].Start.toLowerCase().indexOf('24 hours') >= 0 || hours[i].Start.toLowerCase().indexOf('closed') >= 0) {
          hours[i].Start = '';
        } else if (hours[i].Start.toLowerCase().length <= 0) {
          return;
        }

        $("<div/>", {
          'html': '<span id=day>' + days[i] + '</span> <span id=time>' + hours[i].Start + ((!hours[i].Start) ? '' : ' - ') + hours[i].End + '</span>'
        }).appendTo(hoursHtml);
        added++;
        hasSalesHours = true;
      });
      if (added <= 0) {
        $("<div/>", {
          'html': 'Please call for hours.'
        }).appendTo(hoursHtml);
      }
    }
  }


  if (!hasPartsHours && !hasServiceHours && !hasLeasingHours && !hasSalesHours) {
    isOpenHtml = "Closed";
  }

  templateClone.find('#hours div').html(isOpenHtml);

  $map.panTo(marker.position);


  return templateClone;
};

$.fn.renderAddDirectionsPin = function (marker, details) {

  var templateClone = $($('#sidebar-select-pin').clone(true).html());

  templateClone.find('.fa-close').attr('data-id', details.IDENTIFIER_VALUE);
  console.log(details, "details")

  var openHours = $.fn.getOpenHours(pin);
  var isOpenHtml = "";
  if (openHours.open === '' && openHours.close === '') {
    isOpenHtml = "No schedule information available";
  } else if (openHours.open.toLowerCase() === 'open 24 hours') {
    isOpenHtml = `${openHours.open}`;
  } else if (openHours.open.toLowerCase() === 'closed') {
    isOpenHtml = `${openHours.open}`;
  } else {
    isOpenHtml = `${openHours.open.toLowerCase()} - ${openHours.close.toLowerCase()}`;
  }

  templateClone.find('.heading p').text($.fn.camelCase(details.COMPANY_DBA_NAME));
  templateClone.find('.hours').text(isOpenHtml);
  templateClone.find('.distance').text('~ ' + Math.round(details.distance) + ' mi');
  templateClone.find('.address').text(details.MAIN_ADDRESS_LINE_1_TXT + ' ' + details.MAIN_ADDRESS_LINE_2_TXT);
  templateClone.find('.city').text(details.MAIN_CITY_NM + ', ' + details.MAIN_STATE_PROV_CD + ' ' + details.MAIN_POSTAL_CD);
  templateClone.find('.phone').text(details.REG_PHONE_NUMBER);
  templateClone.find('.detail-website a').attr("href", $.fn.formatWebAddress(pin.WEB_ADDRESS));
  templateClone.find('.detail-call').html('<a href="tel:' + pin.REG_PHONE_NUMBER + '">' + '<img src="/blocks/dealer-locator/images/Phone-2.png" />' + "Call" + '</a>');


  $("<div/>", {
    'html': templateClone
  }).appendTo('.nearby-select');


};

$.fn.setupAddDirectionsView = function () {

  $('.go-back-pin').attr('onclick', '$.fn.switchSidebarPane(\'add-directions-return\',\'' + $lastPane.split('-').pop().trim() + '\');');

  $('div[id*="sidebar-select-pins"] span#filter').text($.fn.currentFilterHumanReadable());

  for (var i = 0; i < $markers.length; i++) {

    for (var k = 0; k < $pins.length; k++) {

      if ($pins[k].IDENTIFIER_VALUE == $markers[i].id) {

        if ($.fn.showPin($pins[k])) {

          $markers[i].setMap($map);

          if ($.fn.isWaypoint($pins[k].waypoint)) {
            var pinIcon = $.fn.drawPin('-', 38, 38, '808080');
          }
          else {
            var pinIcon = $.fn.drawPin('+', 38, 38, '4174C4');
          }

          $markers[i].setIcon(pinIcon);
        }
      }
    }
  }

  $map.setZoom(8);
};

$.fn.switchSidebarPane = async function (id, e) {
  var markerId = ($(e).data('id') ? $(e).data('id') : e);

  var content = $('#' + id).html();

  var forceRefresh = false;
  if (e && id == 'sidebar-pin') {
    content = await $.fn.renderPinDetails(markerId);
  }
  if ((e && id == 'sidebar-directions') || id == 'add-directions-return' || id == 'sidebar-direction-list') {
    content = $.fn.renderPinDirections(markerId);
    $('.sidebar-content').addClass("direction-content");
    $('.go-back').css('display', 'none');
    $('.sidebar-legend').hide();
    if ($(window).width() < 992) {
      $('.sidebar').css("overflow", "scroll");
      $('.add-directions').text("Recalculate");
    }
    if (id == 'add-directions-return') { forceRefresh = true; }

  } else if (id.indexOf('sidebar-select-pins') >= 0) {

    $.fn.setupAddDirectionsView();
    content = $('#' + id).html();

    $('.main-directions').css('display', 'none');
    $('.main-header').css('display', 'none');

  } else {
    $('.main-directions').css('display', 'none');
    $('.main-header').css('display', 'block');
    $.fn.clearDirections();
    $map.setZoom(8);
  }
  // $('.go-back').css('display', 'none');
  if ($lastPane) {
    $('#d-' + $lastPane).css('display', 'none');
    //   $('.go-back').css('background', '#202A44');
  }
  if (id == 'sidebar-directions' || id == 'sidebar-direction-list') {
    $('.go-back').css('display', 'none');
  }
  else if (id == 'sidebar-filter') {
    $('.go-back').css('display', 'block');
    $('.go-back').css('background', 'none');
  } else if (id == 'sidebar-pin') {
    $('.go-back').css('display', 'block');
    $('.go-back').css('background', '#202A44');
  } else {
    $('.go-back').css('display', 'none');
  }
  document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0;
  $('.sidebar').scrollTop(0);
  id = id + ((e != null) ? '-' + markerId : '');

  var foundPane = false;

  $panes.forEach(function (pane) {
    if (pane == id) {
      if (id.indexOf('directions') >= 0 || id.indexOf('direction') >= 0) {

        $('#d-' + id).remove();
        $('.go-back').css('display', 'none');
      } else if (id.indexOf('sidebar-pin') >= 0 && id.indexOf('sidebar-pin-' + markerId) >= 0) {
        $('#d-' + id).remove();
        //  $('.go-back').css('display', 'none');
      } else {
        $('#d-' + id).css('display', 'block');
        foundPane = true;
      }

    }
  });

  if (!foundPane) {

    $("<div/>", {
      'id': 'd-' + id,
      'html': content
    }).appendTo('.sidebar-content');

    $panes.push(id);
    //  $('.go-back').css('background', '#202A44');
  }

  if (forceRefresh) {
    $('#d-' + id).html(content);
  }


  // Bring pane into view
  if ($('.sidebar').css('left') != '0px') {

    if ($(window).width() <= 700) {
      $(".slider-arrow, .sidebar").animate({
        left: "+=80%"
      }, 200, function () {
        // Animation complete.
      });
    }
    else {
      $(".slider-arrow, .sidebar").animate({
        left: "+=408"
      }, 200, function () {
        // Animation complete.
      });
    }

    $('.slider-arrow').html('&laquo;').removeClass('show').addClass('hide');
  }

  $lastPane = id;
};

$.fn.getPinById = function (id) {

  return $.grep($pins, function (v, i) {
    return v['IDENTIFIER_VALUE'] === id;
  })[0];
};

// When in doubt or need to redraw pins, call this function
$.fn.filterRadius = function () {

  $nearbyPins = [];

  $.fn.myDealer();

  if (!$me && $location) {
    $pin = {
      url: $meIcon,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(100, 100),

      scaledSize: new google.maps.Size(30, 30),

      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),

      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(30, 30)
    };

    $me = new google.maps.Marker({
      position: { lat: $location[0], lng: $location[1] },
      title: 'ME',
      map: $map,
      zIndex: 0,
      icon: $pin
    });

    $me.setZIndex(0);
  }

  var radius = $.fn.milesInMeters($('#range').val());

  var bounds = new google.maps.LatLngBounds();

  var k = 1;
  for (var i = 0; i < $markers.length; i++) {

    if (google.maps.geometry.spherical.computeDistanceBetween($markers[i].getPosition(), $me.getPosition()) < radius) {

      bounds.extend($markers[i].getPosition())

      var pin = $.grep($pins, function (v, b) {
        return v['IDENTIFIER_VALUE'] === $markers[i].ID;
      })[0];


      if ($.fn.showPin(pin)) {

        $markers[i].setMap($map);

        $markers[i].setZIndex(2);



        $nearbyPins.push($markers[i].ID);

        k++;
      }
      else {
        $markers[i].setMap(null);
      }

    } else {
      //$markers[i].setMap(null);

      var pin = $.grep($pins, function (v, b) {
        return v['IDENTIFIER_VALUE'] === $markers[i].ID;
      })[0];

      if ($.fn.showPin(pin)) {
        $markers[i].setMap($map);
      }

      if ($myDealer != null && ($myDealer.IDENTIFIER_VALUE == $markers[i].id)) {
        var pinIcon = $.fn.drawPin('', 43, 63, '328E04');
      }
      else {
        if (pin.isCertifiedUptimeCenter) {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
            scaledSize: new google.maps.Size(17, 23), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0)
          }
          if ($electricDealer === true || (pin.services && Object.values(pin.services).includes('Volvo Certified EV Dealer'))) {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
          }
        }
        else if ($electricDealer === true || (pin.services && Object.values(pin.services).includes('Volvo Certified EV Dealer'))) {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
            scaledSize: new google.maps.Size(17, 23), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0)
          }
        }

        else {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
            scaledSize: new google.maps.Size(17, 23), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0)
          }
        }

      }
      $markers[i].setIcon(pinIcon);
      $markers[i].pinIndex = null;

    }

    $map.fitBounds(bounds);

    $map.setZoom(8);


  }

  $map.setCenter($me.getPosition());
  $map.setZoom(8);

  $.fn.filterNearbyPins();
};

$.fn.milesInMeters = function ($mi) {
  return $mi * 1609.3;
};

$.fn.kmToMiles = function ($km) {
  return $km * 0.621371;
};

$.fn.radiusChange = function () {

  $value = $('#range').val() * 1;

  $radiusLabel = $('label[for="range"] span');

  $radiusLabel.html($value);

  $radius.setRadius($.fn.milesInMeters($value));

  $.fn.filterRadius();

  if ($value < 100) {

    $map.fitBounds($radius.getBounds());

  } else {
    $map.setZoom(8);
  }
};

$.fn.setCookie = function (name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

$.fn.getCookie = function (name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

$.fn.deleteCookie = function (name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

$.fn.sortedPins = function () {

  $pinLength = $pins.length;

  for (var i = 0; i < $pinLength; i++) {

    $pins[i];
    $pins[i].distance = $.fn.getDistanceInMiles([$pins[i].MAIN_LATITUDE, $pins[i].MAIN_LONGITUDE]);

  }

  $sortedPins = $pins;

  $sortedPins.sort(function (a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  $sortedPins.filter(function (i, n) {
    $.fn.showPin(i);
  });

  return $sortedPins;
};

$.fn.showPin = function (pin) {
  var filter = $.fn.currentFilter();

  var condition;

  if ($consolidateFilters) {
    switch (filter) {
      case 'all':
        condition = pin.DEALER_TYPE_DESC.toLowerCase().indexOf('full line') > -1
            || pin.DEALER_TYPE_DESC.toLowerCase().indexOf('parts & service') > -1
            || pin.DEALER_TYPE_DESC.toLowerCase().indexOf('parts only') > -1
            || pin.DEALER_TYPE_DESC.toLowerCase().indexOf('satellite') > -1
            || pin.isCertifiedCenter
            || pin.isCertifiedUptimeCenter;
        break;

      case 'rental-leasing':
        condition = pin.DEALER_TYPE_DESC.toLowerCase().indexOf('leasing') > -1;
        break;

      default:
        condition = false;
        break;
    }
  } else {
    switch (filter) {
      case 'full-line':
        condition = pin.DEALER_TYPE_DESC.toLowerCase().indexOf('full line') > -1;
        break;

      case 'rental-leasing':
        condition = pin.DEALER_TYPE_DESC.toLowerCase().indexOf('leasing') > -1;
        break;

      case 'parts-service':
        condition = pin.DEALER_TYPE_DESC.toLowerCase().indexOf('parts & service') > -1;
        break;

      case 'parts-only':
        condition = pin.DEALER_TYPE_DESC.toLowerCase().indexOf('parts only') > -1;
        break;

      case 'satellite':
        condition = pin.DEALER_TYPE_DESC.toLowerCase().indexOf('satellite') > -1;
        break;

      case 'premium-certified':
        condition = pin.isCertifiedCenter;
        break;

      case 'certified-uptime':
        condition = pin.isCertifiedUptimeCenter;
        break;

      default:
        condition = false;
        break;
    }
  }
  return condition;
};

$.fn.tmpPins = function (tmpPinList) {
  const pinCount = tmpPinList.length;
  let pinsToShow = 0;
  var pinIndex = 1;
  var nearbyHtml = $('.nearby-pins').empty();
  function createPinsLoop(startPoint) {
    pinsToShow += 5;
    const PinListToShowOnSideBar = tmpPinList.slice(startPoint, pinsToShow);
    PinListToShowOnSideBar.forEach(async function (pin) {
    if (!$.fn.showPin(pin)) {
      return true;
    }

    var templateClone = $($('#nearbyPinDetails').clone(true).html());

    templateClone.find('.teaser-top').attr('data-id', pin.IDENTIFIER_VALUE);
    templateClone.find('.more').attr('data-id', pin.IDENTIFIER_VALUE);


    var openHours = $.fn.getOpenHours(pin);
    var isOpenHtml = "";
    if (openHours.open === '' && openHours.close === '') {
      isOpenHtml = "No schedule information available";
    } else if (openHours.open.toLowerCase() === 'open 24 hours') {
      isOpenHtml = `${openHours.open}`;
    } else if (openHours.open.toLowerCase() === 'closed') {
      isOpenHtml = `${openHours.open}`;
    } else {
      isOpenHtml = `${openHours.open.toLowerCase()} - ${openHours.close.toLowerCase()}`;
    }


    templateClone.find('.heading p').text($.fn.camelCase(pin.COMPANY_DBA_NAME));
    templateClone.find('.hours').text(isOpenHtml);
    templateClone.find('.distance').text('~ ' + Math.round(pin.distance) + ' mi');
    templateClone.find('.city').text(pin.MAIN_CITY_NM + ', ' + pin.MAIN_STATE_PROV_CD + ' ' + pin.MAIN_POSTAL_CD);
    templateClone.find('.direction a').attr('data-id', pin.IDENTIFIER_VALUE);
    templateClone.find('.direction a').text('Direction');
    templateClone.find('.website a').text('Dealer Site');
    templateClone.find('.phone').text($.fn.formatPhoneNumber(pin.REG_PHONE_NUMBER));


    if (!pin.MAIN_ADDRESS_LINE_1_TXT) {
      templateClone.find('.address').text(pin.MAIN_ADDRESS_LINE_2_TXT);
    } else if (!pin.MAIN_ADDRESS_LINE_2_TXT) {
      templateClone.find('.address').text(pin.MAIN_ADDRESS_LINE_1_TXT);
    } else {
      templateClone.find('.address').text(pin.MAIN_ADDRESS_LINE_1_TXT + ', ' + pin.MAIN_ADDRESS_LINE_2_TXT);
    }

    if (pin.WEB_ADDRESS) {
      templateClone.find('.website a').attr("href", $.fn.formatWebAddress(pin.WEB_ADDRESS));
    } else {
      templateClone.find('.website').css({'pointer-events':'none','cursor':'default','opacity':'0.7'});
    }

    if (pin.REG_PHONE_NUMBER) {
      templateClone.find('.call').html('<a href="tel:' + pin.REG_PHONE_NUMBER + '">' + "Call" + '</a>');
      templateClone.find('.call a').attr("href", "tel:" + $.fn.formatPhoneNumber(pin.REG_PHONE_NUMBER));
      // templateClone.find('.detail-call').html('<a href="tel:' + pin.REG_PHONE_NUMBER + '">' + '<img src="/blocks/dealer-locator/images/Phone-2.png" />' + "Call" + '</a>');
    } else {
      templateClone.find('.call').text('Call');
      templateClone.find('.call').css({'pointer-events':'none','cursor':'default','opacity':'0.7'});
    }

    var marker;
    for (i = 0; i < $markers.length; i++) {

      if ($markers[i].id == pin.IDENTIFIER_VALUE) {

        marker = $markers[i];

        if (!$myDealer) {
          $myDealer = { IDENTIFIER_VALUE: $.fn.getCookie('my-dealer') };
        }

        if ($myDealer.IDENTIFIER_VALUE == pin.IDENTIFIER_VALUE) {
          var pinIcon = $.fn.drawPin('', 43, 63, '328E04');

          templateClone.find('#marker').css('width', 'auto');
          templateClone.find('#marker').css('height', 'auto');
        }
        else {

          if (pin.isCertifiedUptimeCenter) {
            var pinIcon = "/blocks/dealer-locator/images/volvo-pin-uptime.svg";
            var pinIcon2 = {
              url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
            if ($electricDealer === true || (pin.services && Object.values(pin.services).includes('Volvo Certified EV Dealer'))) {
              var pinIcon = "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg";
              var pinIcon2 = {
                url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
                scaledSize: new google.maps.Size(17, 23), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0)
              }
            }
          }
          else if ($electricDealer === true || (pin.services && Object.values(pin.services).includes('Volvo Certified EV Dealer'))) {
            var pinIcon = "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg";
            var pinIcon2 = {
              url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
            }

          }
          else {
            var pinIcon = "/blocks/dealer-locator/images/volvo-pin-dealer.svg";
            var pinIcon2 = {
              url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
            }
          }
        }


        marker.setIcon(pinIcon2);

        marker['pinIndex'] = pinIndex;



        templateClone.find('#marker').attr('src', pinIcon);

        pinIndex++;
      }
    }

    $.fn.myDealer();

    $("<div/>", {
      'html': templateClone,
      'click': function () {
      },
      'mouseenter': function () {

        $(this).click(function () {
          $(this).attr('clicked', 'yes');
        });

        var details = $.fn.getPinById(marker.ID);
        if (details.isCertifiedUptimeCenter) {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
            scaledSize: new google.maps.Size(58, 80), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(19, 57)
          }
          if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
              scaledSize: new google.maps.Size(58, 80), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(19, 57)
            }
          }
        }
        else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
            scaledSize: new google.maps.Size(58, 80), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(19, 57)
          }
        }
        else {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
            scaledSize: new google.maps.Size(58, 80), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(19, 57)
          }
        }

        marker.setIcon(pinIcon);

        $.fn.myDealer();

      },
      'mouseleave': function () {

        if ($(this).attr('clicked') != 'yes') {

          var details = $.fn.getPinById(marker.ID);

          if (details.isCertifiedUptimeCenter) {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
            if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
              var pinIcon = {
                url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
                scaledSize: new google.maps.Size(17, 23), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0)
              }
            }
          }
          else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
          }
          else {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
          }

          marker.setIcon(pinIcon);

          $.fn.myDealer();

        }

      }
    }).appendTo(nearbyHtml);

  });
  };

  createPinsLoop(0);

  // Ensure the load more button is rebound to the current scope: remove existing and recreate
  $('#loadMorePinsBtn').remove();
  $("<button/>", {
    text: "View More",
    class: "nearby-pins-load-more",
    id: "loadMorePinsBtn",

    click: function () {
      createPinsLoop(pinsToShow);
      if (pinsToShow >= pinCount) {
        $(this).remove();
      }
    }
  }).appendTo(nearbyHtml.parent());
};
// Creates pin result item
$.fn.filterNearbyPins = function () {

  $assist = 0;
  $full = 0;
  $rental = 0;
  $partsService = 0;
  $parts = 0;
  $premium = 0;
  $uptime = 0;


  // First get the full details of our locations
  var tmpPinList = [];
  var sorted = $.fn.sortedPins();


  var allPinsIds = [];
  $pins.forEach(pin => {
    allPinsIds.push(pin.IDENTIFIER_VALUE);
  });

  allPinsIds.forEach(function (pin) {
    tmpPinList.push($.grep(sorted, function (v, i) {
      return v['IDENTIFIER_VALUE'] === pin;
    })[0]);
  });

  tmpPinList.sort(function (a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
  });
  $("#filterUptime,#filterElectricDealer,#filterDealer").css("cursor", "pointer");
  $('.no-dealer-text').hide();
  $("#filterUptime,#filterElectricDealer,#filterDealer").css('background', '#484A4E');
  $("#filterElectricDealerMobile,#filterDealerMobile,#filterUptimeMobile").css('background', '#484A4E');
  $("#filterUptime,#filterElectricDealer,#filterDealer").removeData("toggled");
  $("#filterElectricDealerMobile,#filterDealerMobile,#filterUptimeMobile").removeData("toggled");
  document.getElementById('filterElectricDealer').style.pointerEvents = 'auto';
  document.getElementById('filterDealer').style.pointerEvents = 'auto';
  document.getElementById('filterUptime').style.pointerEvents = 'auto';
  document.getElementById('filterElectricDealerMobile').style.pointerEvents = 'auto';
  document.getElementById('filterDealerMobile').style.pointerEvents = 'auto';
  document.getElementById('filterUptimeMobile').style.pointerEvents = 'auto';

  $("#filterUptime, #filterUptimeMobile ").unbind().bind("click", function (e) {
    e.preventDefault();
    var tmpPinList2 = [];
    var toggled = $(this).data('toggled');
    $(this).data('toggled', !toggled);
    $('.nearby-pins').empty();
    $('.no-dealer-text').hide();
    var filteredArray = tmpPinList.filter(function (item) {
      return item.isCertifiedUptimeCenter == true || (item.isCertifiedUptimeCenter == true && (item.services && Object.values(item.services).includes('Volvo Certified EV Dealer')));
    });
    if (filteredArray.length == 0) {
      $('.nearby-pins').empty();
      $('.no-dealer-text').show();
    }
    var newList = [];
    var pins = [];
    pins = $pins;
    if (pins) {
      jQuery.grep(pins, function (el) {
        if (jQuery.inArray(el, filteredArray) == -1) newList.push(el);
      });
    }
    if (!toggled) {
      $(this).css('background', '#808080');
      tmpPinList2 = filteredArray;
      $.fn.tmpPins(tmpPinList2);

      newList.forEach(function (pin) {
        for (i = 0; i < $markers.length; i++) {

          if ($markers[i].id == pin.IDENTIFIER_VALUE) {

            marker = $markers[i];
            marker.setMap(null);
          }
        }
      });
      document.getElementById('filterElectricDealer').style.pointerEvents = 'none';
      document.getElementById('filterDealer').style.pointerEvents = 'none';
      document.getElementById('filterElectricDealerMobile').style.pointerEvents = 'none';
      document.getElementById('filterDealerMobile').style.pointerEvents = 'none';
      document.getElementById('dealer-tag').setAttribute("title", $hoverText);
      document.getElementById('electric-tag').setAttribute("title", $hoverText);
    }
    else {
      $(this).css('background', '#484A4E');
      $('.no-dealer-text').hide();
      $.fn.tmpPins(tmpPinList);
      newList.forEach(function (pin) {
        if (!$.fn.showPin(pin)) {
          return true;
        }
        for (i = 0; i < $markers.length; i++) {

          if ($markers[i].id == pin.IDENTIFIER_VALUE) {

            marker = $markers[i];
            marker.setMap($map);
          }
        }
      });
      document.getElementById('filterElectricDealer').style.pointerEvents = 'auto';
      document.getElementById('filterDealer').style.pointerEvents = 'auto';
      document.getElementById('filterElectricDealerMobile').style.pointerEvents = 'auto';
      document.getElementById('filterDealerMobile').style.pointerEvents = 'auto';
      document.getElementById('dealer-tag').removeAttribute("title", $hoverText);
      document.getElementById('electric-tag').removeAttribute("title", $hoverText);
    }
    return false;
  });

  $("#filterElectricDealer, #filterElectricDealerMobile ").unbind().bind("click", function (e) {
    e.preventDefault();
    var tmpPinList3 = [];
    var toggled = $(this).data('toggled');
    $(this).data('toggled', !toggled);
    $('.nearby-pins').empty();
    $('.no-dealer-text').hide();
    var filteredDealerArray = tmpPinList.filter(function (item) {
      return (item.services && Object.values(item.services).includes('Volvo Certified EV Dealer'));

    });
    if (filteredDealerArray.length == 0) {
      $('.nearby-pins').empty();
      $('.no-dealer-text').show();
    }
    var newList = [];
    var pins = [];
    pins = $pins;
    if (pins) {
      jQuery.grep(pins, function (el) {
        if (jQuery.inArray(el, filteredDealerArray) == -1) newList.push(el);
      });
    }
    if (!toggled) {
      $(this).css('background', '#808080');
      tmpPinList3 = filteredDealerArray;
      $.fn.tmpPins(tmpPinList3);
      newList.forEach(function (pin) {
        for (i = 0; i < $markers.length; i++) {

          if ($markers[i].id == pin.IDENTIFIER_VALUE) {

            marker = $markers[i];
            marker.setMap(null);
          }
        }
      });
      document.getElementById('filterDealer').style.pointerEvents = 'none';
      document.getElementById('filterUptime').style.pointerEvents = 'none';
      document.getElementById('filterDealerMobile').style.pointerEvents = 'none';
      document.getElementById('filterUptimeMobile').style.pointerEvents = 'none';
      document.getElementById('dealer-tag').setAttribute("title", $hoverText);
      document.getElementById('uptime-tag').setAttribute("title", $hoverText);
    }
    else {
      $(this).css('background', '#484A4E');
      $('.no-dealer-text').hide();
      $.fn.tmpPins(tmpPinList);
      newList.forEach(function (pin) {

        if (!$.fn.showPin(pin)) {
          return true;
        }
        for (i = 0; i < $markers.length; i++) {

          if ($markers[i].id == pin.IDENTIFIER_VALUE) {

            marker = $markers[i];
            marker.setMap($map);
          }
        }
      });
      document.getElementById('filterDealer').style.pointerEvents = 'auto';
      document.getElementById('filterUptime').style.pointerEvents = 'auto';
      document.getElementById('filterDealerMobile').style.pointerEvents = 'auto';
      document.getElementById('filterUptimeMobile').style.pointerEvents = 'auto';
      document.getElementById('dealer-tag').removeAttribute("title", $hoverText);
      document.getElementById('uptime-tag').removeAttribute("title", $hoverText);
    }
    return false;
  });

  $("#filterDealer, #filterDealerMobile ").unbind().bind("click", function (e) {
    e.preventDefault();
    var tmpPinList4 = [];
    var toggled = $(this).data('toggled');
    $(this).data('toggled', !toggled);
    $('.nearby-pins').empty();
    $('.no-dealer-text').hide();
    var filteredDealerArray = tmpPinList.filter(function (item) {
      return ((item.services == undefined) || (item.isCertifiedUptimeCenter == undefined && (item.services && Object.values(item.services).includes('Volvo Certified EV Dealer'))) || (item.isCertifiedUptimeCenter == undefined && (item.services && !Object.values(item.services).includes('Volvo Certified EV Dealer'))));
      // }

    });
    if (filteredDealerArray.length == 0) {
      $('.nearby-pins').empty();
      $('.no-dealer-text').show();
    }
    var newList = [];
    var pins = [];
    pins = $pins;
    if (pins) {
      jQuery.grep(pins, function (el) {
        if (jQuery.inArray(el, filteredDealerArray) == -1) newList.push(el);
      });
    }
    if (!toggled) {
      $(this).css('background', '#808080');
      tmpPinList4 = filteredDealerArray;
      $.fn.tmpPins(tmpPinList4);

      newList.forEach(function (pin) {
        for (i = 0; i < $markers.length; i++) {

          if ($markers[i].id == pin.IDENTIFIER_VALUE) {

            marker = $markers[i];
            marker.setMap(null);
          }
        }
      });
      document.getElementById('filterElectricDealer').style.pointerEvents = 'none';
      document.getElementById('filterUptime').style.pointerEvents = 'none';
      document.getElementById('filterElectricDealerMobile').style.pointerEvents = 'none';
      document.getElementById('filterUptimeMobile').style.pointerEvents = 'none';
      document.getElementById('electric-tag').setAttribute("title", $hoverText);
      document.getElementById('uptime-tag').setAttribute("title", $hoverText);
    }
    else {
      $(this).css('background', '#484A4E');
      $('.no-dealer-text').hide();
      $.fn.tmpPins(tmpPinList);
      newList.forEach(function (pin) {

        if (!$.fn.showPin(pin)) {
          return true;
        }
        for (i = 0; i < $markers.length; i++) {

          if ($markers[i].id == pin.IDENTIFIER_VALUE) {

            marker = $markers[i];
            marker.setMap($map);
          }
        }
      });
      document.getElementById('filterElectricDealer').style.pointerEvents = 'auto';
      document.getElementById('filterUptime').style.pointerEvents = 'auto';
      document.getElementById('filterElectricDealerMobile').style.pointerEvents = 'auto';
      document.getElementById('filterUptimeMobile').style.pointerEvents = 'auto';
      document.getElementById('electric-tag').removeAttribute("title", $hoverText);
      document.getElementById('uptime-tag').removeAttribute("title", $hoverText);
    }
    return false;
  });


  //  else {
  $.fn.tmpPins(tmpPinList);
  // }
  if ($(window).width() <= 768) {
    $('.panel-footer').html('<img src="' + $.fn.drawPin('', 38, 38, '3F62A5') + '" /> Certified Uptime Dealer');
  } else {
    $('.panel-footer').html('Showing ' + $nearbyPins.length + ' locations');
  }

  $('.loading-overlay').css('display', 'none');
};

$.fn.selectNearbyPins = function () {

  var nearbyHtml = $('.nearby-pins-select').empty();

  // First get the full details of our locations
  var tmpPinList = [];
  var sorted = $.fn.sortedPins();

  $nearbyPins.forEach(function (pin) {
    tmpPinList.push($.grep(sorted, function (v, i) {
      return v['IDENTIFIER_VALUE'] === pin;
    })[0]);
  });

  tmpPinList.sort(function (a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  var pinIndex = 1;
  // then iterate over them
  tmpPinList.forEach(function (pin) {

    if (!$.fn.showPin(pin)) {
      return true;
    }

    var templateClone = $($('#nearbyPinDetails').clone(true).html());

    templateClone.find('.panel-container').parent().attr('data-id', pin.IDENTIFIER_VALUE);


    var openHours = $.fn.getOpenHours(pin);
    var isOpenHtml = "";
    if (openHours.open === '' && openHours.close === '') {
      isOpenHtml = "No schedule information available";
    } else {
      isOpenHtml = `${openHours.open.toLowerCase()} - ${openHours.close.toLowerCase()}`;
    }


    templateClone.find('.heading p').text($.fn.camelCase(pin.COMPANY_DBA_NAME));
    templateClone.find('.hours').text(isOpenHtml);
    templateClone.find('.distance').text('~ ' + Math.round(pin.distance) + ' mi');
    templateClone.find('.address').text(pin.MAIN_ADDRESS_LINE_1_TXT);
    templateClone.find('.city').text(pin.MAIN_CITY_NM + ', ' + pin.MAIN_STATE_PROV_CD + ' ' + pin.MAIN_POSTAL_CD);
    templateClone.find('.phone').text($.fn.formatPhoneNumber(pin.REG_PHONE_NUMBER));
      templateClone.find('.website a').text('Dealer Site');
      templateClone.find('.website a').attr("href", $.fn.formatWebAddress(pin.WEB_ADDRESS));
      templateClone.find('.detail-website a').attr("href", $.fn.formatWebAddress(pin.WEB_ADDRESS));
      templateClone.find('.detail-call').html('<a href="tel:' + pin.REG_PHONE_NUMBER + '">' + '<img src="/blocks/dealer-locator/images/Phone-2.png" />' + "Call" + '</a>');

    var marker;
    for (i = 0; i < $markers.length; i++) {

      if ($markers[i].id == pin.IDENTIFIER_VALUE) {

        marker = $markers[i];

        if (!$myDealer) {
          $myDealer = { IDENTIFIER_VALUE: $.fn.getCookie('my-dealer') };
        }

        if ($myDealer.IDENTIFIER_VALUE == pin.IDENTIFIER_VALUE) {
          var pinIcon = $.fn.drawPin('', 43, 63, '328E04');
        }
        else {
          var details = $.fn.getPinById(pin.ID);
          if (details.isCertifiedUptimeCenter) {
            var pinIcon = "/blocks/dealer-locator/images/volvo-pin-uptime.svg";
            if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
              pinIcon = "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg";
            }
          }
          else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
            var pinIcon = "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg";
          }
          else {
            var pinIcon = "/blocks/dealer-locator/images/volvo-pin-dealer.svg";
          }
        }

        marker.setIcon(pinIcon);

        marker['pinIndex'] = pinIndex;



        templateClone.find('#marker').attr('src', pinIcon);
        templateClone.find('#marker').css('width', '31px');
        templateClone.find('#marker').css('height', '43px');

        pinIndex++;
      }
    }

    $.fn.myDealer();

    $("<div/>", {
      'html': templateClone,
      'click': function () {
      },
      'mouseenter': function () {

        $(this).click(function () {
          $(this).attr('clicked', 'yes');
        });

        var details = $.fn.getPinById(marker.ID);
        if (details.isCertifiedUptimeCenter) {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
            scaledSize: new google.maps.Size(17, 23), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0)
          }
          if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
          }
        }
        else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
            scaledSize: new google.maps.Size(17, 23), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0)
          }
        }
        else {
          var pinIcon = {
            url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
            scaledSize: new google.maps.Size(17, 23), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0)
          }
        }

        marker.setIcon(pinIcon);

        $.fn.myDealer();

      },
      'mouseleave': function () {

        if ($(this).attr('clicked') != 'yes') {

          var details = $.fn.getPinById(marker.ID);
          if (details.isCertifiedUptimeCenter) {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
            if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
              var pinIcon = {
                url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
                scaledSize: new google.maps.Size(17, 23), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0)
              }
            }
          }
          else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
          }
          else {
            var pinIcon = {
              url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
              scaledSize: new google.maps.Size(17, 23), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0)
            }
          }

          marker.setIcon(pinIcon);

          $.fn.myDealer();

        }

      }
    }).appendTo(nearbyHtml);

  });

  if ($(window).width() <= 768) {
    $('.panel-footer').html('<img src="' + $.fn.drawPin('', 38, 38, '3F62A5') + '" /> Certified Uptime Dealer');
  } else {
    $('.panel-footer').html('Showing ' + $nearbyPins.length + ' locations');
  }


};

$.fn.getDistanceInMiles = function ($b) {

  if (!$location) {
    return 0;
  }

  // Radius of the earth in km divided by 0.621371 mi/km
  $R = 6371 * 0.621371;
  $dLat = $.fn.deg2rad($b[0] - $location[0]);  // deg2rad below
  $dLon = $.fn.deg2rad($b[1] - $location[1]);
  $a =
      Math.sin($dLat / 2) * Math.sin($dLat / 2) +
      Math.cos($.fn.deg2rad($location[0])) * Math.cos($.fn.deg2rad($b[0])) *
      Math.sin($dLon / 2) * Math.sin($dLon / 2);
  $c = 2 * Math.atan2(Math.sqrt($a), Math.sqrt(1 - $a));
  $d = $R * $c; // Distance in miles
  return $d;
};

$.fn.deg2rad = function ($deg) {
  return $deg * (Math.PI / 180);
};

// Fires when a client types a location manually
$.fn.setAddress2 = function () {

  address2 = $('#location2').val();

  if (!address2) {
    return null;
  }

  $geocoder = new google.maps.Geocoder;
  $geocoder = new google.maps.Geocoder;
  $geocoder.geocode({ 'address': address2 }, function (results, status) {
    if (!results || results.length == 0) {
      console.log("results not found");
    }
    else {
      $map.viewtype = (results[0].types[0]);
      var ne = results[0].geometry.viewport.getNorthEast();
      var sw = results[0].geometry.viewport.getSouthWest();
      $map.fitBounds(results[0].geometry.viewport);

      position = results[0].geometry.location;

      var pos = {
        lat: position.lat(),
        lng: position.lng()
      };

      $location = [
        position.lat(),
        position.lng()
      ];


      if (!$me) {
        $pin = {
          url: $meIcon,
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(100, 100),

          scaledSize: new google.maps.Size(30, 30),

          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),

          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(30, 30)
        };

        $me = new google.maps.Marker({
          position: { lat: $location[0], lng: $location[1] },
          title: 'ME',
          map: $map,
          zIndex: 0,
          icon: $pin
        });

        $me.setZIndex(0);

      }


      $me.setPosition({ lat: parseFloat(pos.lat), lng: parseFloat(pos.lng) });


      if (!$radius) {
        $radius = new google.maps.Circle({
          strokeColor: '#2c6ba4',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#2c6ba4',
          fillOpacity: 0.15,
          map: $map,
          center: pos,
          radius: $.fn.milesInMeters($('#range').val())
        });

        $('.loading-overlay').css('display', 'block');

        // Load pins into client cache
        $.fn.loadPins();

        // Sort pins by distance (miles)
        $.fn.sortedPins();

        // Set default sidebar pane
        $.fn.switchSidebarPane('sidebar-pins');



      } else {
        $radius.setCenter({ lat: parseFloat(pos.lat), lng: parseFloat(pos.lng) });
        $.fn.filterRadius();
      }

      // Set default sidebar pane
      $.fn.switchSidebarPane('sidebar-pins');

      $('.waiting-overlay').css('display', 'none');

    }
  });
  // $.fn.filterNearbyPins();
  // $.fn.filterRadius();
};

$.fn.setAddress = function () {

  if ($(window).width() < 992) {
    address = address2;
  }
  address = $('#location').val();
  if (!address) {
    return null;
  }

  $geocoder = new google.maps.Geocoder;
  $geocoder = new google.maps.Geocoder;
  $geocoder.geocode({ 'address': address }, function (results, status) {
    if (!results || results.length == 0) {
      console.log("results not found");
    }
    else {
      $map.viewtype = (results[0].types[0]);
      var ne = results[0].geometry.viewport.getNorthEast();
      var sw = results[0].geometry.viewport.getSouthWest();
      $map.fitBounds(results[0].geometry.viewport);

      position = results[0].geometry.location;

      var pos = {
        lat: position.lat(),
        lng: position.lng()
      };

      $location = [
        position.lat(),
        position.lng()
      ];


      if (!$me) {
        $pin = {
          url: $meIcon,
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(100, 100),

          scaledSize: new google.maps.Size(30, 30),

          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),

          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(30, 30)
        };

        $me = new google.maps.Marker({
          position: { lat: $location[0], lng: $location[1] },
          title: 'ME',
          map: $map,
          zIndex: 0,
          icon: $pin
        });

        $me.setZIndex(0);

      }


      $me.setPosition({ lat: parseFloat(pos.lat), lng: parseFloat(pos.lng) });


      if (!$radius) {
        $radius = new google.maps.Circle({
          strokeColor: '#2c6ba4',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#2c6ba4',
          fillOpacity: 0.15,
          map: $map,
          center: pos,
          radius: $.fn.milesInMeters($('#range').val())
        });

        $('.loading-overlay').css('display', 'block');

        // Load pins into client cache
        $.fn.loadPins();

        // Sort pins by distance (miles)
        $.fn.sortedPins();

        // Set default sidebar pane
        $.fn.switchSidebarPane('sidebar-pins');



      } else {
        $radius.setCenter({ lat: parseFloat(pos.lat), lng: parseFloat(pos.lng) });
        $.fn.filterRadius();
      }

      // Set default sidebar pane
      $.fn.switchSidebarPane('sidebar-pins');

      $('.waiting-overlay').css('display', 'none');

    }
  });
  // $.fn.filterNearbyPins();
  // $.fn.filterRadius();
};

// Handles geolocation
$.fn.setLocation = function () {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $location = [
        position.coords.latitude,
        position.coords.longitude
      ];

      $map.setCenter(pos);
      $map.setZoom(8);


      if (!$radius) {

        if ($map) {
          $radius = new google.maps.Circle({
            strokeColor: '#2c6ba4',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#2c6ba4',
            fillOpacity: 0.15,
            map: $map,
            center: pos,
            radius: $.fn.milesInMeters($('#range').val())
          });
        }

        // Load pins into client cache
        $.fn.loadPins();

        // Sort pins be distance (miles)
        $.fn.sortedPins();

        // Set default sidebar pane
        $.fn.switchSidebarPane('sidebar-pins');



      } else {

        $me.setPosition({ lat: parseFloat(pos.lat), lng: parseFloat(pos.lng) });

        $radius.setCenter({ lat: parseFloat(pos.lat), lng: parseFloat(pos.lng) });

        $.fn.filterRadius();

      }

      var address;

      var latlng = new google.maps.LatLng(pos.lat, pos.lng);
      $geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

          if (results[6]) {
            address = results[0]?.formatted_address || '';
          }
          else if (results[0]) {
            address = results[5]?.formatted_address || '';
          }
          else {
            console.log('no results found');
          }

          if (address) {

            $('.sidebar #location').val(address);
            $currentAddress = address;
            $('#location2').val(address);
            $currentAddress = address;
          }

        } else {
          console.log('geocode failed due to: ' + status);
        }
      });

    }, function () {

      //this.setMap(null);
      console.log('error with navigator');
      $.fn.handleLocationError(true);

    });


  } else {
    // Browser doesn't support Geolocation
    //this.setMap(null);

    console.log('could not determine location');

    $.fn.handleLocationError(false);

  }
};

$.fn.currentFilter = function () {

  $current = $('#filter-options input:checked').first();

  if ($current.get(0) !== undefined) {

    return $('#filter-options input:checked').first().attr('id');

  }

  return "";
};

$.fn.currentFilterHumanReadable = function () {

  $current = $('#filter-options input:checked').first();

  if ($current.get(0) !== undefined) {

    return $('#filter-options input:checked').first().attr('value');

  }

  return "";
};

$.fn.setMyDealer = function (dealer) {

  if ($myDealer != null && $myDealer.oldZIndex) {

    //$myDealer.marker.setZIndex($myDealer.oldZIndex);

  }

  $eventData = {
    dealer: '',
    dealerName: '',
    dealerHours: {},
    dealerNumber: ''
  };

  if (dealer) {

    $myDealer = dealer;

    var marker;
    for (i = 0; i < $markers.length; i++) {

      if ($markers[i].id == dealer.IDENTIFIER_VALUE) {

        marker = $markers[i];

      }
    }


    var pinIcon = $.fn.drawPin('', 43, 63, '328E04');

    marker.setIcon(pinIcon);

    $myDealer.marker = marker;

    var hours = {};

    if ($myDealer.hours.Parts) {
      hours = $myDealer.hours.Parts;
    }

    if ($.isEmptyObject(hours) && $myDealer.hours.Service) {
      hours = $myDealer.hours.Service;
    }

    if ($.isEmptyObject(hours) && $myDealer.hours.Leasing) {
      hours = $myDealer.hours.Leasing;
    }

    $eventData.dealer = $myDealer.IDENTIFIER_VALUE;
    $eventData.dealerName = $myDealer.COMPANY_DBA_NAME;
    $eventData.dealerHours = hours;
    $eventData.dealerNumber = $myDealer.REG_PHONE_NUMBER;

    $.fn.setCookie('my-dealer', $myDealer.IDENTIFIER_VALUE, 365 * 10);
    $.fn.setCookie('my-dealer-name', $myDealer.COMPANY_DBA_NAME, 365 * 10);
    $.fn.setCookie('my-dealer-hours', JSON.stringify(hours), 365 * 10);
    $.fn.setCookie('my-dealer-number', $myDealer.REG_PHONE_NUMBER, 365 * 10);
    $.fn.setCookie('my-dealer-coords', $myDealer.MAIN_LATITUDE + ',' + $myDealer.MAIN_LONGITUDE, 365 * 10);

    $.fn.setCookie('my-dealer-city', $myDealer.MAIN_ADDRESS_LINE_1_TXT, 365 * 10);
    $.fn.setCookie('my-dealer-city', $myDealer.MAIN_ADDRESS_LINE_2_TXT, 365 * 10);
    $.fn.setCookie('my-dealer-city', $myDealer.MAIN_CITY_NM, 365 * 10);
    $.fn.setCookie('my-dealer-state', $myDealer.MAIN_STATE_PROV_CD, 365 * 10);
    $.fn.setCookie('my-dealer-zip', $myDealer.MAIN_POSTAL_CD, 365 * 10);

    $html.attr('data-dealer', $myDealer.IDENTIFIER_VALUE);

    $.fn.filterRadius();

  } else {

    $.fn.deleteCookie('my-dealer');
    $.fn.deleteCookie('my-dealer-name');
    $.fn.deleteCookie('my-dealer-hours');
    $.fn.deleteCookie('my-dealer-number');
    $.fn.deleteCookie('my-dealer-coords');

    $myDealer = null;

    $html.attr('data-dealer', '');

  }

  $dealerEvent = new CustomEvent('my-dealer', { detail: $eventData });
  window.dispatchEvent($dealerEvent);

  //$.fn.myDealer();

};

$.fn.myDealer = function () {

  var dealer = $.fn.getCookie('my-dealer');

  var marker;
  for (i = 0; i < $markers.length; i++) {

    if ($markers[i].id == dealer) {

      var pinIcon = $.fn.drawPin('', 43, 63, '328E04');

      $markers[i].setIcon(pinIcon);

      marker = $markers[i];

    }
  }

  return marker;

};

$.fn.drawPin = function (text, width, height, color) {

  if (!text) {
    text = '';
  }

  // my dealer color for mack
  if (color == '328E04' && $.fn.isMack()) {
    //color = '85754d'; // 328E04
  }

  // uptime center color for mack
  if (color == '3F62A5' && $.fn.isMack()) {
    color = '85754d';
  }

  return 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22' + width + '%22%20height%3D%22' + height + '%22%20viewBox%3D%220%200%2038%2038%22%3E%3Cpath%20fill%3D%22%23' + color + '%22%20stroke%3D%22%23ccc%22%20stroke-width%3D%22.5%22%20d%3D%22M34.305%2016.234c0%208.83-15.148%2019.158-15.148%2019.158S3.507%2025.065%203.507%2016.1c0-8.505%206.894-14.304%2015.4-14.304%208.504%200%2015.398%205.933%2015.398%2014.438z%22%2F%3E%3Ctext%20transform%3D%22translate%2819%2018.5%29%22%20fill%3D%22%23fff%22%20style%3D%22font-family%3A%20sans-serif%3Bfont-weight%3Abold%3Btext-align%3Acenter%3B%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E' + text + '%3C%2Ftext%3E%3C%2Fsvg%3E';
};

$.fn.handleLocationError = function (browserHasGeolocation, infoWindow, pos) {

  if (!browserHasGeolocation) {
    alert('Error: Your browser doesn\'t support geolocation.');
  } else {
    $('.loading-overlay').css('display', 'none');
    $('.waiting-overlay').css('display', 'block');
  }

};

$.fn.camelCase = function (str) {
  if (!str) return;
  return str.toLowerCase().replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

$.fn.formatPhoneNumber = function (str) {
  if (!str) return;
  return str.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

$.fn.formatWebAddress = function (str) {
  var prefixes = 'http';
  if (!str) return;
  if (str.substr(0, prefixes.length).toLowerCase() === prefixes) {
    return str.toLowerCase();
  }
  return 'https://' + str.toLowerCase();
};

$.fn.clearDirections = function () {

  $.fn.directionsMessage();

  $directionResults = null;
  $directionsDisplay.setMap(null);

  $directionsObject = null;
  $wayPoints = [];
};

$.fn.getCurrentRouteTimeInHours = function () {

  $currentRoute = null;
  $currentTime = null;

  if ($directionResults) {

    if ($directionResults.routes && $directionResults.routes.length == 1) {

      $currentRoute = $directionResults.routes[0];

    } else if ($directionResults.routes && $directionResults.routes.length > 1) {

      $referencePoint = $('.adp-listsel').first();
      $currentRoute = $directionResults.routes[$referencePoint.attr('data-route-index')];
    }
  }

  if ($currentRoute) {

    $currentTime = $currentRoute.legs[0].duration.value / 60 / 60;
  }

  return $currentTime;
};

$.fn.wayPointArray = function () {

  var waypoints = [];
  var waypointLength = $wayPoints.length;

  for (var wayPoint in $wayPoints) {

    if ($wayPoints.hasOwnProperty(wayPoint)) {

      waypoints.push($wayPoints[wayPoint].point);

    }

  }

  return waypoints;
};

$.fn.directionsMessage = function (message) {

  if (!message) {
    $directionsMessage.html('');
  } else {
    $directionsMessage.html(message);
  }
};

$.fn.getUrlParameter = function (sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

$.fn.snackbar = function (message) {

  // Get the snackbar DIV
  var x = document.getElementById("locator-snackbar");

  x.innerHTML = message;

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

};

$.fn.isMack = function () {

  if ($.fn.brand() == 'mack') {

    return true;

  }

  return false;

};

$.fn.isVolvo = function () {

  if ($.fn.brand() == 'volvo') {

    return true;

  }

  return false;

};

$.fn.brand = function () {

  if ($html.is('[data-brand]')) {

    return $html.attr('data-brand');

  }

  return '';

};

$.fn.copyToClipboard = function (text) {

  if (typeof text != "string") {
    text = $(text).attr('data-clipboard');
  }

  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.bottom = '0';
  textArea.style.left = '0';

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = '0';

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  var result = false;

  try {
    var successful = document.execCommand('copy');

    $.fn.snackbar('Copied to clipboard.');

    result = successful ? true : false;

  } catch (err) {
    result = false;
  }

  document.body.removeChild(textArea);

  return result;

};

// Event listeners
$('.go-back').on('click', function () {
  $.fn.switchSidebarPane('sidebar-pins');

  //  $("#filterUptime,#filterElectricDealer,#filterDealer").bind('click');
  $wayPoints = [];
  $('.nearby-select').empty();
  $('.sidebar-content').removeClass("direction-content");
  $('.sidebar-legend').css("display", "flex");
  $('.sidebar').css("overflow", "hidden");
  $('.add-directions').text("Recalculate Directions");
});
$('.go-back-direction').on('click', function () {
  $.fn.switchSidebarPane('sidebar-pins');
//$("#filterUptime,#filterElectricDealer,#filterDealer").bind('click');
  $wayPoints = [];
  $('.nearby-select').empty();
  $('.sidebar-content').removeClass("direction-content");
  $('.sidebar-legend').css("display", "flex");
  $('.sidebar').css("overflow", "hidden");
  $('.add-directions').text("Recalculate Directions");
});

$("#location").on('keyup', function (e) {
  if (e.keyCode == 13) {
    $.fn.setAddress();
  }
});
$("#location2").on('keyup', function (e) {
  if (e.keyCode == 13) {
    $.fn.setAddress2();
  }
});

$('#cancel').on('click', function () {

  try {

    var details = $.fn.getPinById($viewingPin.ID);
    if (details.isCertifiedUptimeCenter) {
      var pinIcon = {
        url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
        scaledSize: new google.maps.Size(17, 23), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
      }
      if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
        var pinIcon = {
          url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
          scaledSize: new google.maps.Size(17, 23), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0)
        }
      }
    }
    else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
      var pinIcon = {
        url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
        scaledSize: new google.maps.Size(17, 23), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
      }
    }
    else {
      var pinIcon = {
        url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
        scaledSize: new google.maps.Size(17, 23), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
      }
    }

    $viewingPin.setIcon(pinIcon);

    $.fn.myDealer();

  } catch (e) {
    // ignore
  }
  $('.nearby-pins').children().attr('clicked', '');
});

$('#cancel2').on('click', function () {

  try {

    var details = $.fn.getPinById($viewingPin.ID);
    if (details.isCertifiedUptimeCenter) {
      var pinIcon = {
        url: "/blocks/dealer-locator/images/volvo-pin-uptime.svg",
        scaledSize: new google.maps.Size(17, 23), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
      }
      if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
        var pinIcon = {
          url: "/blocks/dealer-locator/images/volvo-pin-uptime-electric.svg",
          scaledSize: new google.maps.Size(17, 23), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0)
        }
      }
    }
    else if ($electricDealer === true || (details.services && Object.values(details.services).includes('Volvo Certified EV Dealer'))) {
      var pinIcon = {
        url: "/blocks/dealer-locator/images/volvo-pin-dealer-electric.svg",
        scaledSize: new google.maps.Size(17, 23), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
      }
    }
    else {
      var pinIcon = {
        url: "/blocks/dealer-locator/images/volvo-pin-dealer.svg",
        scaledSize: new google.maps.Size(17, 23), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
      }
    }

    $viewingPin.setIcon(pinIcon);

    $.fn.myDealer();

  } catch (e) {
    // ignore
  }
  $('.nearby-pins').children().attr('clicked', '');
});

$(window).on('resize', function () {
  if ($(window).width() < 992) {
    if ($(".direction-content")) {
      $('.sidebar').css("overflow", "scroll");
      $('.add-directions').text("Recalculate");
    } else {
      $('.sidebar').css("overflow", "hidden");
      $('.add-directions').text("Recalculate Directions");
    }
  } else {
    $('.sidebar').css("overflow", "hidden");
    $('.add-directions').text("Recalculate Directions");
  }
  if ($('#location').val()) {
    $('#location2').val($('#location').val());
  }
  if ($('#location2').val()) {
    $('#location').val($('#location2').val());
  }

});

$(document).on('click', '.sidebar-content #filter-options input[type="checkbox"]', function (e) {

  $clicked = $(this);

  if ($('.sidebar-content #filter-options input[type="checkbox"]:checked').length < 1) {
    $clicked.prop('checked', true);
    return;
  }

  $('.sidebar-content #filter-options input[type="checkbox"]').each(function (i) {

    $filter = $(this);

    if ($clicked.get(0) !== $filter.get(0)) {

      $filter.prop('checked', false);

    }

  });

  $.fn.filterRadius();
});

$(document).on('click', '.accordion', function (eventObject) {

  $(this).next('.accordion-panel').slideToggle("slow");
  $(this).find('.toggle-arrow').toggleClass('close');

  document.getElementById("share-link").select();


});

$(document).on('click', '#set-dealer', function (eventObject) {
  console.log("inside set dealer");
  var pinId = $(this).attr('data-pin');

  var pin = $.fn.getPinById(pinId);

  $.fn.setMyDealer(pin);

  //$(this).find('span').text('Remove As Dealer');
  // $(this).find('span').text('Preferred Dealer');
  //  $(this).find('i').removeClass('fa-star-o').addClass('fa-star');
  $(this).find('#set-dealer').html('<img src="/blocks/dealer-locator/images/Vector-3.svg" />');

});

$(document).on('click', '#print', function (eventObject) {

  var divToPrint = $(this).parents('.directions-panel').find('#directions-container');

  var newWin = window.open('', 'Print Window');

  newWin.document.open();

  newWin.document.write('<html><body onload="window.print()">' + divToPrint.html() + '</body></html>');

  newWin.document.close();

  setTimeout(function () { newWin.close(); }, 10);

});

$.fn.initGoogleMaps();//entry point to dealer locator
