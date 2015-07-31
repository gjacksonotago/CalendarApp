/* 
 * This class defines a reminder "class" to store a reminder for each day as necessary.
 * 
 * @author Ben Ryan
 */
/**
 * 
 * @type @new;_L10
 * 
 * @param {int} day (day, month, year)
 * @param {int} month 
 * @param {int} year
 */
function Reminder(day, month, year) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.reminders = [];

    this.newReminder = function (reminder) {
        this.reminders.push(reminder);
    }
    //The stupidest syntax ever. Called by "Reminder.print()"
     this.print = function () {
        var s = this.day + "-" + this.month + "-" + this.year;
        return s;
    };
}



