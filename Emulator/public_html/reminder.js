/* 
 * This class defines a reminder "class" to store a reminder for each day as necessary.
 * 
 * @author Ben Ryan
 */

/**
 * 
 * @type @new;_L10
 * 
 * @param {Date} date  The full date for this reminder (day, month, year)
 * @param {String} reminder  The text string that is the reminder
 */
function Reminder(date, reminder) {
    this.date = date;
    this.day = date.getDay();
    this.reminders = [reminder];
    
    function newReminder(reminder) {
        reminders.push(reminder);
    }
}



