class DateFormatter{
    static FormatDateForInput(date) {
        if(!(date instanceof Date)){
            date = new Date(date);
        }
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`;
    }
    static GetWeekday(){}
}

export {DateFormatter};