const { setTimeZone, convertTimeToDate, getZonedTime } = require('timezone-support');

module.exports =  (inputTimezone, resultTimezone, hours, minutes, meridiem) => {
    let inputHours = hours;
    let inputMinutes = minutes;
    let inputMeridiem = meridiem;
    if(meridiem === 'PM' && hours !== 12) hours += 12;
    if(meridiem === 'AM' && hours === 12) hours = 0; 

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    const time = setTimeZone(date, inputTimezone, { useUTC: false });
    const inputDate = convertTimeToDate(time);
    const resultTime = getZonedTime(inputDate, resultTimezone);

    let resultHours, resultMinutes, resultMeridiem;

    if(resultTime.hours > 12) {
        resultHours = resultTime.hours - 12;
        resultMeridiem = 'PM';
    }
    else if(resultTime.hours === 0) {
        resultHours = 12;
        resultMeridiem = 'AM';
    }
    else if(resultTime.hours === 12) {
        resultHours = 12;
        resultMeridiem = 'PM';
    }
    else {
        resultHours = resultTime.hours;
        resultMeridiem = 'AM';
    }
    resultMinutes = resultTime.minutes;

    return {
        inputTimezone: inputTimezone.name,
        inputHours,
        inputMinutes,
        inputMeridiem,
        resultTimezone: resultTimezone.name,
        resultHours,
        resultMinutes,
        resultMeridiem,
    };
}