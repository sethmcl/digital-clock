(function (win, doc) {

  var classToNumberMap = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
  };
 
  win.DigitalClock = DigitalClock;

  /**
   * DigitalClock
   * @class
   * @constructor
   * @param {String} elementSelector CSS selector string which specifies
   *  the clock container element
   */
  function DigitalClock(elementSelector) {
    this.el = doc.querySelector(elementSelector);

    if (!this.el) {
      throw Error('Unable to select element: ' + elementSelector);
    }

    this.digits = this.el.querySelectorAll('.digit');
    this.colons = this.el.querySelectorAll('.colon');
    this.colons = Array.prototype.slice.call(this.colons, 0);

    this.update();
  }

  /**
   * "Redraw" the clock by showing/hiding DOM elements
   */
  DigitalClock.prototype.update = function () {
    var now     = new Date(),
        hours   = pad(now.getHours(), 2),
        minutes = pad(now.getMinutes(), 2),
        seconds = pad(now.getSeconds(), 2);

    this.setDigit(0, hours[0]);
    this.setDigit(1, hours[1]);
    this.setDigit(2, minutes[0]);
    this.setDigit(3, minutes[1]);
    this.setDigit(4, seconds[0]);
    this.setDigit(5, seconds[1]);

    if (seconds % 2 === 0) {
      this.showColons(true);
    } else {
      this.showColons(false);
    }

    setTimeout(this.update.bind(this), 1000);
  };

  /**
   * Turn colons on and off
   * @param {Boolean} turnOn indicates if colons should be visible
   */
  DigitalClock.prototype.showColons = function (turnOn) {
    var className = 'colon ';

    if (turnOn) {
      className += 'active';
    }

    this.colons.forEach(function (el) {
      el.className = className;
    });
  };

  /**
   * Set digit value (0, 1, 2, etc.)
   * @param {Number} digit an index in to the this.digits object
   * @param {Number} value the value to display
   */
  DigitalClock.prototype.setDigit = function (digit, value) {
    var el = this.digits[digit];
    el.className = 'digit ' + classToNumberMap[value];
  };

  /**
   * Pad a number with leading 0's
   * @param {Number} number the number to pad
   * @param {Number} length the desired length of string
   * @return {String} padded string
   */
  function pad(number, length) {
    number = number.toString();

    while (number.length < length) {
      number = '0' + number;
    }

    return number;
  }
})(window, document);
