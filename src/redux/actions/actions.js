export const CHANGE_TOTAL_STUDENTS_LISTS = 'CHANGE_TOTAL_STUDENTS_LISTS';
export const CHANGE_TOTAL_STUDENTS_GROUP = 'CHANGE_TOTAL_STUDENTS_GROUP';
export const INITIALIZE_LISTS = 'INITIALIZE_LISTS';

export const changeTotalStudents = change => ({
    type: CHANGE_TOTAL_STUDENTS_LISTS,
    payload: {
        change,
    },
});

export const changeTotalList = (idList, change) => ({
    type: CHANGE_TOTAL_STUDENTS_GROUP,
    payload: {
        idList,
        change,
    },
});

export const initializeLists = lists => ({
    type: INITIALIZE_LISTS,
    payload: {
        lists,
    },
});