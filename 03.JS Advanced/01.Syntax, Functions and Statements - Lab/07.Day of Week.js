function dayOfWeek(day) {
    let dayOf = 'error';
    switch (day) {
        case 'Monday': dayOf = 1; break;
        case 'Tuesday': dayOf = 2; break;
        case 'Wednesday': dayOf = 3; break;
        case 'Thursday': dayOf = 4; break;
        case 'Friday': dayOf = 5; break;
        case 'Saturday': dayOf = 6; break;
        case 'Sunday': dayOf = 7;
    }
    console.log(dayOf);
}
dayOfWeek('Monday');