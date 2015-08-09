/* 
 * Unit tests for functions in prototypeBasics.js and emulatorBasics.js
 */

//-----> PrototypeBasics
//
//I feel like this doesn't need to be tested, especially for all cases, but i'm doing it.
test('monthToInt', function () {
    equal(monthToInt('January'), 0, 'January is the 0th month');
    equal(monthToInt('February'), 1, 'February is the 1st (starting from 0) month');
    equal(monthToInt('March'), 2, 'March is the 2nd (starting from 0) month');
    equal(monthToInt('April'), 3, 'April is the 3rd (starting from 0) month');
    equal(monthToInt('May'), 4, 'May is the 4th (starting from 0) month');
    equal(monthToInt('June'), 5, 'June is the 5th (starting from 0) month');
    equal(monthToInt('July'), 6, 'July is the 6th (starting from 0) month');
    equal(monthToInt('August'), 7, 'August is the 7th (starting from 0) month');
    equal(monthToInt('September'), 8, 'September is the 8th (starting from 0) month');
    equal(monthToInt('October'), 9, 'October is the 9th (starting from 0) month');
    equal(monthToInt('November'), 10, 'November is the 10th (starting from 0) month');
    equal(monthToInt('December'), 11, 'December is the 11th (starting from 0) month');
    equal(monthToInt('Decembeard'), undefined, "Decembeard is not a month, why does it think it's a month?");
});//Yes not necessary, not doing this much for other such basic methods

test('monthToString', function () {
    equal(monthToString(0), 'January', 'January is the 0th month');
    equal(monthToString(8), 'September', '8 should give September');
    equal(monthToString(-6), 'Invalid month number', 'The number is -ve, invalid.');
    equal(monthToString(78), 'Invalid month number', 'The number is over 11, invalid.');
});

test('daysInMonth', function () {
    equal(daysInMonth(0, 2015), 31, 'There is always 31 days in January');
    equal(daysInMonth(11, 2017), 31, 'There is always 31 days in December');
    equal(daysInMonth(3, 2030), 30, 'There is always 30 days in April');
    equal(daysInMonth(10, 2015), 30, 'There is always 31 days in November');
    equal(daysInMonth(1, 2015), 28, 'Should be 28 days');
    equal(daysInMonth(1, 2016), 29, 'Should be 29 days');
    equal(daysInMonth(1, 2040), 29, 'Should be 29 days');
    equal(daysInMonth(1, 2119), 28, 'Should be 28 days');//but you have to test the leap years a lot...
    equal(daysInMonth(1, 1984), 29, 'Should be 29 days');
    equal(daysInMonth(1, 2000), 29, 'Should be 29 days');
    equal(daysInMonth(1, 2400), 29, 'Should be 29 days');
    equal(daysInMonth(1, 2100), 28, 'Should be 28 days');
});

//-----> EmulatorBasics
//
test('swipeDirection', function () {
    equal(swipeDirection(160, 160, 0, 200), "left", 'Should be left'); 
    equal(swipeDirection(0, 200, 40, 200), "right", 'Should be right');
    equal(swipeDirection(0, 200, 40, 300), "down", 'Should be down.'); 
    equal(swipeDirection(0, 200, 40, 0), "up", 'Should be up.'); 
    equal(swipeDirection(200, 100, 100, 151), "Invalid swipe", 'Should be invalid.');
});


