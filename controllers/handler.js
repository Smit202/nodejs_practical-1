const { listTimeZones, findTimeZone } = require('timezone-support');
const convertTimezone = require('./convertTimezone');

exports.renderPage = (req, res) => {
    // const inputTimezone = findTimeZone('Europe/Berlin');
    // const resultTimezone = findTimeZone('Pacific/Noumea');
    const timezones = listTimeZones();
    timezones.sort();
    console.log(timezones.length);
    console.log(timezones.includes('Europe/Berlin'));
    console.log(req.convertedTime);
    if(req.convertedTime)   res.render('index', { result: req.convertedTime, timezones: timezones });
    else {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let meridiem = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours ? hours : 12;     // set hours to 12 if it is 0
        
        let defaultResult = {
            inputTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            inputHours: hours,
            inputMinutes: minutes,
            inputMeridiem: meridiem,
            resultTimezone: null,
            resultHours: null,
            resultMinutes: null,
            resultMeridiem: null,
        };
        
        res.render('index', { result: defaultResult, timezones: timezones, });
    }
}

exports.convert = (req, res, next) => {
    console.log(req.body);
    const inputTimezone = findTimeZone(req.body.from);
    const resultTimezone = findTimeZone(req.body.to);

    let hours = +req.body.hours;
    let minutes = +req.body.minutes;
    let meridiem = req.body.meridiem;

    req.convertedTime = convertTimezone(inputTimezone, resultTimezone, hours, minutes, meridiem);
    console.log(req.convertedTime);
    next();
}