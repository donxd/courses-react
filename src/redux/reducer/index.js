import { CHANGE_TOTAL_STUDENTS_LISTS, CHANGE_TOTAL_STUDENTS_GROUP, INITIALIZE_LISTS } from '../actions/actions';

const initialState = {
    totalStudents: 0,
    lists: [],
};

function processChangeLists (state, payload) {
    return {
        totalStudents: state.totalStudents+payload.change,
        lists: state.lists,
    };
}

function processChangeGroup (state, payload) {
    const changeLists = state.lists.map((val, index) => {
        if ((index+0) !== (payload.idList+0)) return val;
        val.totalStudents = (val.totalStudents ? val.totalStudents : getListTotalStudents(val))+payload.change;
        return val;
    });

    return {
        totalStudents: state.totalStudents,
        lists: changeLists,
    };
}

function processInitializeLists (state, payload) {
    const total = payload.lists.reduce((acc, list) => acc+getListTotalStudents(list),0);

    return {
        totalStudents: total,
        lists: payload.lists,
    };
}

function getListTotalStudents (list) {
    if (list.groups.length) return list.groups.reduce((accG, group) => accG+(group.students ? group.students.length : 0),0);
    return 0;
}

export default function (state=initialState, action) {
    switch (action.type) {
        case CHANGE_TOTAL_STUDENTS_LISTS: return processChangeLists(state, action.payload);
        case CHANGE_TOTAL_STUDENTS_GROUP: return processChangeGroup(state, action.payload);
        case INITIALIZE_LISTS: return processInitializeLists(state, action.payload);
        default: return state;
    }
}