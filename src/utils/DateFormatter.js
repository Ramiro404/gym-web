import moment from 'moment';
class DateFormatter{
    static FormatDateForInput(date) {
        if(!(date instanceof Date)){
            date = new Date(date);
        }
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`;
    }
    static SubstractDatesAndGetDays(dateString1, dateString2){
        let date1 = moment(dateString1);
        let date2 = moment(dateString2);
        let result = date2.from(date1);
        return result;
    }

    static diffDatesFromNow(momentDate){
        const nowMoment = moment(new Date(), "DD/MM/YYY");
        return momentDate.diff(nowMoment, 'days');
    }


    static FixTimeZone(dateString) {
        const date = new Date(dateString);
        date.setMinutes( date.getTimezoneOffset());
        return date.toString();
    }
}

export {DateFormatter};