// Extend Date to return some human readable dates and times.
define(function() {

    // Check to see if the two dates match.
    Date.datesMatch = function(date, anotherDate) {
        return date.getFullYear() === anotherDate.getFullYear() &&
               date.getMonth() === anotherDate.getMonth() &&
               date.getDate() === anotherDate.getDate();
    };

    // Display the date from the time (in milliseconds).
    Date._date = function(time) {
        var date = new Date(time),
            month;
        month = date.getMonth() + 1;
        return date.getFullYear() + '-' + month + '-' + date.getDate();
    };

    Date.date = function(time) {
        var delta,
            msPerDay = 86400000,
            now = Date.now(),
            then = new Date(time),
            today,
            yesterday;
        delta = now - time;
        today = new Date(now);
        // Subtracting a day's worth of mseconds puts the date into yesterday.
        yesterday = new Date(now - msPerDay);

        if (Date.datesMatch(today, then)) {
            return 'Today';
        }
        else if (Date.datesMatch(yesterday, then)) {
            return 'Yesterday';
        }
        else if (delta < (msPerDay * 7)) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                'Friday', 'Saturday'];
            var day = new Date(time);
            return days[day.getDay()];
        }
        else {
            return Date._date(time);
        }
    };

    // Get the readable time from the milliseconds.
    Date.time = function(ms) {
        var d = new Date(ms),
            hour,
            meridiem,
            minutes;
        hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
        // Midnight should be 12 not 0.
        hour = hour === 0 ? 12 : hour;
        meridiem = d.getHours() > 12 ? 'pm' : 'am';
        minutes = d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes();
        return hour + ':' + minutes + meridiem;
    };

    return Date;
});
