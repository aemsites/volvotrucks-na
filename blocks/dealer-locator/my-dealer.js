/* eslint-disable  */

function MyDealer() {
  var $html = $('html');
  var $location = [];
  var $isOpen = false;
  var allowDisplay = false;
  var $brand = '';

  this.init = function () {
    if ($html.is('[data-brand]')) {
      $brand = $html.attr('data-brand');
      $brand = '-' + $brand;
    }

    if ($brand !== '') {
      setListener();

      $('.openfindadealer').click(function (e) {
        if (allowDisplay === true) {
          e.preventDefault();
          $('.ancillaryNavPopup.findadealer').toggle();
        }
      });
    }
  };

  this.isOpen = function () {
    return $isOpen;
  };

  function readDealerCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  function getDealerHoursInfo(hours, time) {
    var zone = moment.tz.guess();

    var closeSoon = false;

    if (hours) {
      if (!time) {
        time = new Date();
      }

      var todayAtDealer = hours[time.getDay()];

      if (todayAtDealer) {
        var startTime = todayAtDealer.Start;
        if (startTime.toLowerCase() === 'midnight') {
          startTime = '12:00 AM';
        }

        var endTime = todayAtDealer.End;
        if (endTime.toLowerCase() === 'midnight') {
          endTime = '11:59 PM';
        }

        if (startTime.toLowerCase().indexOf('24') > -1) {
          startTime = '12:00 AM';
          //dealer is open 24 hours
          return { open: true, endTime: null, closeSoon: null, alwaysOpen: true };
        }

        if (endTime.toLowerCase().indexOf('24') > -1) {
          endTime = '12:00 AM';
          //dealer is open 24 hours
          return { open: true, endTime: null, closeSoon: null, alwaysOpen: true };
        }

        if (startTime.toLowerCase() === 'noon') {
          startTime = '12:00 PM';
        }

        if (endTime.toLowerCase() === 'noon') {
          endTime = '12:00 PM';
        }

        var start = new Date();
        start.setFullYear(time.getFullYear());
        start.setMonth(time.getMonth());
        start.setDate(time.getDate());
        start.setHours(moment(startTime, ['h:mm A']).format('HH'));
        start.setMinutes(moment(startTime, ['h:mm A']).format('mm'));
        start.setSeconds(0);

        var end = new Date();
        end.setFullYear(time.getFullYear());
        end.setMonth(time.getMonth());
        end.setDate(time.getDate());
        end.setHours(moment(endTime, ['h:mm A']).format('HH'));
        end.setMinutes(moment(endTime, ['h:mm A']).format('mm'));
        end.setSeconds(0);

        if (moment.tz(zone).isBetween(start, end)) {
          var hours2 = Math.abs(time - end) / 36e5;

          if (hours2 < 1) {
            closeSoon = true;
          }

          //dealer is open
          return { open: true, endTime: end, closeSoon: closeSoon, alwaysOpen: false };
        } else {
          //dealer is closed
          return { open: false, endTime: end, closeSoon: closeSoon, alwaysOpen: false };
        }
      }
    }

    return 2;
  }

  function getMyDealer() {
    var preferredSet = readDealerCookie('my-dealer');
    if (preferredSet) {
      // If user has selected a preferred dealer get that
      $brand = '';
    } else {
      if ($html.is('[data-brand]')) {
        $brand = $html.attr('data-brand');
        $brand = '-' + $brand;
      }
    }

    var dealer = {
      dealer: '',
      dealerName: '',
      dealerCity: '',
      dealerState: '',
      dealerZip: '',
      dealerAddr1: '',
      dealerAddr2: '',
      dealerHours: {},
      dealerNumber: '',
      coords: '',
    };

    var myDealer = readDealerCookie('my-dealer' + $brand);
    if (myDealer) {
      dealer.dealer = myDealer;
    }

    var myDealerName = readDealerCookie('my-dealer-name' + $brand);
    if (myDealerName) {
      dealer.dealerName = myDealerName;
    }

    var myDealerCity = readDealerCookie('my-dealer-city' + $brand);
    if (myDealerCity) {
      dealer.dealerCity = myDealerCity;
    }
    var myDealerState = readDealerCookie('my-dealer-state' + $brand);
    if (myDealerState) {
      dealer.dealerState = myDealerState;
    }
    var myDealerZip = readDealerCookie('my-dealer-zip' + $brand);
    if (myDealerZip) {
      dealer.dealerZip = myDealerZip;
    }
    var myDealerAddr1 = readDealerCookie('my-dealer-addr1' + $brand);
    if (myDealerAddr1) {
      dealer.dealerAddr1 = myDealerAddr1;
    }
    var myDealerAddr2 = readDealerCookie('my-dealer-addr2' + $brand);
    if (myDealerAddr2) {
      dealer.dealerAddr2 = myDealerAddr2;
    }

    var myDealerHours = readDealerCookie('my-dealer-hours' + $brand);
    if (myDealerHours) {
      dealer.dealerHours = JSON.parse(myDealerHours);
    }

    var myDealerCoords = readDealerCookie('my-dealer-coords' + $brand);
    if (myDealerCoords) {
      dealer.coords = myDealerCoords;
    }

    var myDealerFormattedNumber = '';
    var myDealerNumber = readDealerCookie('my-dealer-number' + $brand);
    if (myDealerNumber) {
      dealer.dealerNumber = myDealerNumber;
      myDealerFormattedNumber = formatPhoneNumber(myDealerNumber);
    }

    if (!myDealerNumber && !myDealerHours) {
      return false;
    }

    // Restore brand
    if ($html.is('[data-brand]')) {
      $brand = $html.attr('data-brand');
      $brand = '-' + $brand;
    }

    return dealer;
  }

  function error(err) {
    console.log("Error getting user's location: " + err.message);
  }

  function setLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position) {
        $location.push(position.coords.latitude);
        $location.push(position.coords.longitude);

        setDealer();
      } else {
        // Error getting position or user denied access.
        console.log('Error getting position or user denied access');
      }
    }, error);
  }

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return !match ? null : match[1] + '-' + match[2] + '-' + match[3];
  }

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + 24 * days * 60 * 60 * 1e3);
      var expires = '; expires=' + date.toGMTString();
    } else expires = '';
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  // Only to be called after location is set
  function setDealer() {
    if (!$location) {
      console.log('Could not find dealer because location is not set. ');
      return false;
    }

    var ajaxUrl = '';
    if ($brand === '-mack') {
      ajaxUrl = 'https://mvservices.na.volvogroup.com/DealerJSON_new.ashx?nearest=1&lat=' + $location[0] + '&lng=' + $location[1];
    } else if ($brand === '-volvo') {
      ajaxUrl = 'https://mvservices.na.volvogroup.com/volvo_dealerJSON.ashx?nearest=1&lat=' + $location[0] + '&lng=' + $location[1];
    }

    $.ajax({
      url: ajaxUrl,
      type: 'GET',
      success: function (data) {
        var dealer = data[0][0];
        if (dealer) {
          createCookie('my-dealer' + $brand, dealer.IDENTIFIER_VALUE, 365 * 10);
          createCookie('my-dealer-name' + $brand, dealer.COMPANY_DBA_NAME, 365 * 10);
          createCookie('my-dealer-city' + $brand, dealer.MAIN_CITY_NM, 365 * 10);
          createCookie('my-dealer-state' + $brand, dealer.MAIN_STATE_PROV_CD, 365 * 10);
          createCookie('my-dealer-zip' + $brand, dealer.MAIN_POSTAL_CD, 365 * 10);
          createCookie('my-dealer-addr1' + $brand, dealer.MAIN_ADDRESS_LINE_1_TXT, 365 * 10);
          createCookie('my-dealer-addr2' + $brand, dealer.MAIN_ADDRESS_LINE_2_TXT, 365 * 10);

          var hours = null;
          if (dealer.hours.Parts) {
            hours = dealer.hours.Parts;
          }

          if (!hours && dealer.hours.Service) {
            hours = dealer.hours.Service;
          }

          if (!hours && dealer.hours.Leasing) {
            hours = dealer.hours.Leasing;
          }

          createCookie('my-dealer-hours' + $brand, JSON.stringify(hours), 365 * 10);
          createCookie('my-dealer-number' + $brand, dealer.REG_PHONE_NUMBER, 365 * 10);
          createCookie('my-dealer-coords' + $brand, dealer.MAIN_LATITUDE + ',' + dealer.MAIN_LONGITUDE, 365 * 10);

          dealer = getMyDealer();

          if (dealer !== null) {
            allowDisplay = true;
            showDealerBox(dealer);
          }
        }
      },
      error: function (error) {
        console.log('MVServices call failed with code: ' + error.message);
      },
    });
  }

  function setListener() {
    var dealer = null;

    // If dealer cookie exists, use it
    window.addEventListener(
      'my-dealer',
      function (e) {
        // Take existing dealer info and put it in dealer variable
        dealer = getMyDealer();
        if (dealer !== null) {
          allowDisplay = true;
          // Populate Find a Dealer box
          showDealerBox(dealer);
        }
      },
      false,
    );

    // Dealer cookie does not exist
    if (dealer === null) {
      setLocation();
    }
  }

  function normalizeCase(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  function showDealerBox(dealer) {
    if (dealer !== null) {
      // Find out if dealer city is two words
      // Capitalize each word if city contains spaces
      var splitCity = new Array();

      if (dealer.dealerCity.includes(' ')) {
        var cityParts = dealer.dealerCity.split(' ');

        cityParts.forEach(function (part) {
          var currentPart = normalizeCase(part);
          splitCity.push(currentPart);
        });
      }

      var today = new Date();
      var openDetails = getDealerHoursInfo(dealer.dealerHours, today);
      var popup = $('.ancillaryNavPopup.findadealer');

      popup.html('');
      popup.prepend('<div class="innerTriangle"></div>');

      // Applies dealer name to pop-out.
      popup.append('<div id="dealerLocation">' + dealer.dealerName + '</div>');
      // Applies address to pop-out.
      popup.append(
        '<div id="dealerAddress"><p>' +
          dealer.dealerAddr1 +
          '\n' +
          dealer.dealerAddr2 +
          '\n' +
          dealer.dealerCity +
          ', ' +
          dealer.dealerState +
          ' ' +
          dealer.dealerZip +
          '</p></div>',
      );
      $('#dealerAddress').prepend(
        '<svg xmlns="http://www.w3.org/2000/svg" width="11.885" height="16.016" viewBox="0 0 11.885 16.016"><path id="Path_5" data-name="Path 5" d="M1184.541,755.942a5.942,5.942,0,0,0-11.885,0c0,3.282,5.942,10.074,5.942,10.074S1184.541,759.224,1184.541,755.942Zm-8.713.275a2.771,2.771,0,1,1,2.771,2.77A2.77,2.77,0,0,1,1175.828,756.217Z" transform="translate(-1172.656 -750)"/></svg>',
      );
      // Applies remaining information to pop-out.
      popup.append('<div id="dealerPhone"><p>' + formatPhoneNumber(dealer.dealerNumber) + '</p></div>');
      $('#dealerPhone').prepend(
        '<svg xmlns="http://www.w3.org/2000/svg" width="14.646" height="14.646" viewBox="0 0 14.646 14.646"><path id="Path_6" data-name="Path 6" d="M528.724,656.976a16.711,16.711,0,0,0,1.3,1.046,6.962,6.962,0,0,0,1.272.724.838.838,0,0,0,.29.032,1.177,1.177,0,0,0,.354-.161c.24-.166.66-.731.9-.9a1.793,1.793,0,0,1,.365-.172,1.306,1.306,0,0,1,.354-.064,8.942,8.942,0,0,1,3,1.248.747.747,0,0,1,.161.161,3.95,3.95,0,0,1,.612,1.288,1.4,1.4,0,0,1-.113.563,3.289,3.289,0,0,1-.708.837,4.855,4.855,0,0,1-.982.692,3.318,3.318,0,0,1-.918.209,10.144,10.144,0,0,1-2.238-.338,18.66,18.66,0,0,1-2.656-1.046c-.589-.3-1.69-1.032-2.238-1.4-.148-.1-.419-.343-.555-.459s-.5-.5-.5-.5-.382-.362-.495-.5-.359-.407-.459-.555c-.368-.547-1.1-1.648-1.4-2.238a18.665,18.665,0,0,1-1.046-2.656,10.145,10.145,0,0,1-.338-2.238,3.32,3.32,0,0,1,.209-.918,4.858,4.858,0,0,1,.692-.982,3.289,3.289,0,0,1,.837-.708,1.4,1.4,0,0,1,.563-.113,3.953,3.953,0,0,1,1.288.612.745.745,0,0,1,.161.161,8.937,8.937,0,0,1,1.248,3,1.308,1.308,0,0,1-.064.354,1.786,1.786,0,0,1-.172.365c-.168.239-.732.659-.9.9a1.176,1.176,0,0,0-.161.354.835.835,0,0,0,.032.29,6.953,6.953,0,0,0,.724,1.272,16.661,16.661,0,0,0,1.047,1.3c.06.067.254.254.254.254Z" transform="translate(-522.694 -647.838)"/></svg>',
      );

      if (openDetails.open === true) {
        if (openDetails.alwaysOpen === true) {
          popup.append('<div id="dealerHours"><p>Open 24 hours</p></div>');
          $('#dealerHours').prepend(
            '<svg id="Group_5" data-name="Group 5" xmlns="http://www.w3.org/2000/svg" width="16.265" height="16.265" viewBox="0 0 16.265 16.265"><path id="Path_7" data-name="Path 7" d="M-21.532,233.386l-2.2-1.033v-3.688a.725.725,0,0,0-.724-.724.725.725,0,0,0-.724.724v4.143a.727.727,0,0,0,.463.676l2.561,1.206a.719.719,0,0,0,.311.071.722.722,0,0,0,.241-.042.717.717,0,0,0,.411-.369A.723.723,0,0,0-21.532,233.386Z" transform="translate(32.587 -224.675)"/><path id="Path_8" data-name="Path 8" d="M-99.916,191.261a8.079,8.079,0,0,0-5.751-2.382,8.079,8.079,0,0,0-5.751,2.382,8.079,8.079,0,0,0-2.382,5.751,8.079,8.079,0,0,0,2.382,5.75,8.079,8.079,0,0,0,5.751,2.382,8.079,8.079,0,0,0,5.751-2.382,8.079,8.079,0,0,0,2.382-5.75A8.079,8.079,0,0,0-99.916,191.261Zm-5.751,11.6a5.81,5.81,0,0,1-4.136-1.713,5.81,5.81,0,0,1-1.713-4.136,5.811,5.811,0,0,1,1.713-4.136,5.811,5.811,0,0,1,4.136-1.713,5.811,5.811,0,0,1,4.136,1.713,5.811,5.811,0,0,1,1.713,4.136,5.81,5.81,0,0,1-1.713,4.136A5.81,5.81,0,0,1-105.666,202.86Z" transform="translate(113.799 -188.879)"/></svg>',
          );
        } else {
          popup.append('<div id="dealerHours"><p>Open until ' + moment(openDetails.endTime).format('LT') + '</p></div>');
          $('#dealerHours').prepend(
            '<svg id="Group_5" data-name="Group 5" xmlns="http://www.w3.org/2000/svg" width="16.265" height="16.265" viewBox="0 0 16.265 16.265"><path id="Path_7" data-name="Path 7" d="M-21.532,233.386l-2.2-1.033v-3.688a.725.725,0,0,0-.724-.724.725.725,0,0,0-.724.724v4.143a.727.727,0,0,0,.463.676l2.561,1.206a.719.719,0,0,0,.311.071.722.722,0,0,0,.241-.042.717.717,0,0,0,.411-.369A.723.723,0,0,0-21.532,233.386Z" transform="translate(32.587 -224.675)"/><path id="Path_8" data-name="Path 8" d="M-99.916,191.261a8.079,8.079,0,0,0-5.751-2.382,8.079,8.079,0,0,0-5.751,2.382,8.079,8.079,0,0,0-2.382,5.751,8.079,8.079,0,0,0,2.382,5.75,8.079,8.079,0,0,0,5.751,2.382,8.079,8.079,0,0,0,5.751-2.382,8.079,8.079,0,0,0,2.382-5.75A8.079,8.079,0,0,0-99.916,191.261Zm-5.751,11.6a5.81,5.81,0,0,1-4.136-1.713,5.81,5.81,0,0,1-1.713-4.136,5.811,5.811,0,0,1,1.713-4.136,5.811,5.811,0,0,1,4.136-1.713,5.811,5.811,0,0,1,4.136,1.713,5.811,5.811,0,0,1,1.713,4.136,5.81,5.81,0,0,1-1.713,4.136A5.81,5.81,0,0,1-105.666,202.86Z" transform="translate(113.799 -188.879)"/></svg>',
          );
        }
      } else {
        popup.append('<div id="dealerHours"><p>Closed</p></div>');
        $('#dealerHours').prepend(
          '<svg id="Group_5" data-name="Group 5" xmlns="http://www.w3.org/2000/svg" width="16.265" height="16.265" viewBox="0 0 16.265 16.265"><path id="Path_7" data-name="Path 7" d="M-21.532,233.386l-2.2-1.033v-3.688a.725.725,0,0,0-.724-.724.725.725,0,0,0-.724.724v4.143a.727.727,0,0,0,.463.676l2.561,1.206a.719.719,0,0,0,.311.071.722.722,0,0,0,.241-.042.717.717,0,0,0,.411-.369A.723.723,0,0,0-21.532,233.386Z" transform="translate(32.587 -224.675)"/><path id="Path_8" data-name="Path 8" d="M-99.916,191.261a8.079,8.079,0,0,0-5.751-2.382,8.079,8.079,0,0,0-5.751,2.382,8.079,8.079,0,0,0-2.382,5.751,8.079,8.079,0,0,0,2.382,5.75,8.079,8.079,0,0,0,5.751,2.382,8.079,8.079,0,0,0,5.751-2.382,8.079,8.079,0,0,0,2.382-5.75A8.079,8.079,0,0,0-99.916,191.261Zm-5.751,11.6a5.81,5.81,0,0,1-4.136-1.713,5.81,5.81,0,0,1-1.713-4.136,5.811,5.811,0,0,1,1.713-4.136,5.811,5.811,0,0,1,4.136-1.713,5.811,5.811,0,0,1,4.136,1.713,5.811,5.811,0,0,1,1.713,4.136,5.81,5.81,0,0,1-1.713,4.136A5.81,5.81,0,0,1-105.666,202.86Z" transform="translate(113.799 -188.879)"/></svg>',
        );
      }

      popup.append('<div id="findAnotherDealer"></div>');

      var findADealerLink = $('.openfindadealer').attr('href');
      $('#findAnotherDealer').append('<a href="' + findADealerLink + '"' + '>Find Another Dealer</a>');

      if ($brand === '-mack') {
        if (splitCity.length > 0) {
          $('.openfindadealer')
            .find('.findadealer')
            .html(splitCity.join(' ') + ', ' + dealer.dealerState);
        } else {
          $('.openfindadealer')
            .find('.findadealer')
            .html(normalizeCase(dealer.dealerCity) + ', ' + dealer.dealerState);
        }

        // Adjust width of ancillary navigation items if city name is too long
        var mCityState = dealer.dealerCity + dealer.dealerState;
        if (mCityState.length > 10) {
          $('.ancillary-nav').addClass('extraWide');
          $('.openfindadealer').parent().addClass('extraWide');
        }
      } else if ($brand === '-volvo') {
        // Capitalize each word if city contains spaces
        if (splitCity.length > 0) {
          $('.openfindadealer').text(splitCity.join(' ') + ', ' + dealer.dealerState);
        } else {
          $('.openfindadealer').text(normalizeCase(dealer.dealerCity) + ', ' + dealer.dealerState);
        }
      }
    }
  }
}

const myDealer = new MyDealer();
myDealer.init();
