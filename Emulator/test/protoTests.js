/* 
 * Unit tests for functions in prototypeBasics.js
 */

//I feel like this doesn't need to be tested, especially for all cases, but i'm doing it.
test('monthToInt', function() {
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
    equal(monthToInt('Decebeard'), undefined, "Decembeard is not a month, why does it think it's a month?");
});//this is definitely not necessary, not doing this much for other such basic methods







