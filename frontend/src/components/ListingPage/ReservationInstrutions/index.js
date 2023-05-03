import './index.css';

const Instructions = ({startDate, endDate, selectedDate, listing}) => {
    let formattedStart;
    let formattedEnd;

    const calculateStay = (date1, date2) => {
        const millisecondsBetween = date2-date1;
        const daysBetween = millisecondsBetween/86400000;
        return Math.floor(daysBetween)
    };

    if (selectedDate) {
        formattedStart = new Intl.DateTimeFormat('en-US', {day:"numeric", month:"short", year:"numeric"}).format(selectedDate[0]);
        formattedEnd = new Intl.DateTimeFormat('en-US', { day: "numeric", month: "short", year: "numeric" }).format(selectedDate[1]);
    } else {
        formattedStart = undefined;
        formattedEnd = undefined;
    }

    return (
        <div>
            {!startDate && (
                <>
                <h2>Select Check-In Date</h2>
                <p>Select booking dates to reserve this Treehouse</p>
                </>
            )}
            {(startDate && !endDate) &&(
                <>
                <h2>Select Check-Out Date</h2>
                <p>Select booking dates to reserve this Treehouse</p>
                </>
            )}
            {(selectedDate && !(formattedStart === formattedEnd)) && (
                <>
                <h2>{calculateStay(selectedDate[0], selectedDate[1])} nights in {listing.name}</h2>
                <p>{formattedStart} - {formattedEnd}</p>
                </>
            )}
        </div>
    )
};

export default Instructions;