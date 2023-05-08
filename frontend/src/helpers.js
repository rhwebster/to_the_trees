export const isBetweenDates = (targetDate, date1, date2) => {
    targetDate = new Date(targetDate);
    const start = new Date(date1);
    const end = new Date(date2);

    if (targetDate >= start && targetDate <= end) return true;
    return false;
};

export const formatRating = (rating) => {
    const str = rating.toString();
    let ratingArr = str.split('.');

    if (ratingArr.length === 1) {
        return ratingArr[0] + '.0'
    } else if (ratingArr[1][0] === '0') {
        return ratingArr[0] + '.0'
    } else {
        let decimals = ratingArr[1].slice(0,2);
        return `${ratingArr[0]}.${decimals}` 
    }
};

export const calculateStay = (date1, date2) => {
    const millisecondsBetween = date2 - date1;
    const daysBetween = millisecondsBetween / 86400000;
    return Math.floor(daysBetween)
};