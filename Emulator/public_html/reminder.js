/** 
 * reminder.js
 * This class defines a reminder "class" to store a reminder for each day as necessary.
 * 
 * @author Ben Ryan
 */

/**
 * 
 * @type @new; {Reminder}
 * 
 * @param {int} day
 * @param {int} month 
 * @param {int} year
 */

function Reminder(day, month, year) {
    "use strict";
    
    this.year = year;
    this.month = month;
    this.day = day;
    this.reminders = [];
    this.times = [];
    this.defaultTime = "08:00";
    this.text = "";
    this.name = "";

    /**
     * Returns a representation of the reminder class as a string
     *  
     * @returns {String}
     */
    this.print = function () {
        var s = this.day + "-" + this.month + "-" + this.year;
        return s;
    };

    /**
     * Mutator to data field 'text'
     * 
     * @param {String} string
     */
    this.addText = function (string) {
        this.text = string;
    };

    /**
     * Mutator for name data field
     * @param {String} string
     */
    this.addName = function (string) {
        this.name = string;
    };

    /**
     * Accessor to Name data field
     * @returns {String}
     */
    this.returnName = function () {
        return this.name;
    };

    /**
     * Add a new reminder to reminders data field with default time to times data field
     * @param {String} reminder
     */
    this.newReminder = function (reminder) {
        if (this.reminders.length < 9) {
            this.reminders.push(reminder);
            this.times.push(this.defaultTime);
        } else if (this.reminders.length === 9) {
            this.reminders.push('Reminder limit for this date reached.');
        } /*else {
            console.error("No more reminders may be added for" + this.print());
        } */
    };

    /**
     * Add a new time and new reminder to times and reminders respectively
     * @param {String} reminder
     * @param {String} time
     */
    this.newReminderWithTime = function (reminder, time) {
        if (this.reminders.length < 9) {
            this.reminders.push(reminder);
            this.times.push(time);
        } else if (this.reminders.length === 9) {
            this.reminders.push('Reminder limit for this date reached.');
        } /*else {
            console.error("No more reminders may be added for " + this.print());
        }*/
    };
    
    /**
     * Delete a reminder at the given index. Or complain if index is out of range.
     * @param {int} index
     */
    this.deleteReminder = function (index) {
        if(this.reminders.length < index) {
            this.reminders.splice(index, 1);
            this.times.splice(index, 1);
        } //else{
          //  console.error("Reminder to be deleted does not exist! Index out of range.");
        //}
    };
}



