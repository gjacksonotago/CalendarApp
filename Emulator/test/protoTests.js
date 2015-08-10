/* 
 * Unit tests for functions in prototypeBasics.js and emulatorBasics.js
 */

//-----> PrototypeBasics
//
test('monthToString', function () {
    equal(prototype.monthToString(0), 'January', 'January is the 0th month');
    equal(prototype.monthToString(8), 'September', '8 should give September');
    equal(prototype.monthToString(-6), 'Invalid month number', 'The number is -ve, invalid.');
    equal(prototype.monthToString(78), 'Invalid month number', 'The number is over 11, invalid.');
});

test('daysInMonth', function () {
    equal(prototype.daysInMonth(0, 2015), 31, 'There is always 31 days in January');
    equal(prototype.daysInMonth(11, 2017), 31, 'There is always 31 days in December');
    equal(prototype.daysInMonth(3, 2030), 30, 'There is always 30 days in April');
    equal(prototype.daysInMonth(10, 2015), 30, 'There is always 31 days in November');
    equal(prototype.daysInMonth(1, 2015), 28, 'Should be 28 days');
    equal(prototype.daysInMonth(1, 2016), 29, 'Should be 29 days');
    equal(prototype.daysInMonth(1, 2040), 29, 'Should be 29 days');
    equal(prototype.daysInMonth(1, 2119), 28, 'Should be 28 days');//but you have to test the leap years a lot...
    equal(prototype.daysInMonth(1, 1984), 29, 'Should be 29 days');
    equal(prototype.daysInMonth(1, 2000), 29, 'Should be 29 days');
    equal(prototype.daysInMonth(1, 2400), 29, 'Should be 29 days');
    equal(prototype.daysInMonth(1, 2100), 28, 'Should be 28 days');
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


