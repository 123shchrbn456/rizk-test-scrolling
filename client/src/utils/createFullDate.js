// Функция отображения дня недели
function showDay(day) {
    var days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    return days[day];
}

// функция отображения месяца
function showMonth(month) {
    var months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];
    return months[month];
}

// функция создания полной даты
function createFullDate(date, month, dayOfWeek) {
    var string = date + " " + showMonth(month) + ", " + showDay(dayOfWeek);
    return string;
}

export default createFullDate;
