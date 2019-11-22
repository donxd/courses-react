import { CHANGE_TOTAL_STUDENTS_LISTS, CHANGE_TOTAL_STUDENTS_GROUP, INITIALIZE_LISTS } from '../actions/actions';

const initialState = {
    totalStudents: 0,
    lists: [],
};

function processChangeLists (state, payload) {
    // console.log('processChangeLists @@@');
    // console.log('processChangeLists # state : ', JSON.stringify(state));
    // console.log('processChangeLists # payload : ', JSON.stringify(payload));
    return {
        totalStudents: state.totalStudents+payload.change,
        lists: state.lists,
    };
}

function processChangeGroup (state, payload) {
    // console.log('processChangeGroup @@@');
    // console.log('processChangeGroup # state : ', JSON.stringify(state));
    // console.log('processChangeGroup # payload : ', JSON.stringify(payload));
    console.log('reducer - data list original ### ', state.lists[payload.idList])

    const changeLists = state.lists.map((val, index) => {
        if ((index+0) !== (payload.idList+0)) return val;
        val.totalStudents = (val.totalStudents ? val.totalStudents : getListTotalStudents(val))+payload.change;
        // val.totalStudents+= val.totalStudents ? payload.change : getListTotalStudents(list);
        return val;
    });

    console.log('reducer - data list change ### ', changeLists[payload.idList]);
    // console.log('processChangeGroup # changeLists : ', JSON.stringify(payload));
    // console.log('processChangeGroup # payload : ', JSON.stringify(payload));


    return {
        // totalStudents: state.totalStudents+payload.change,
        totalStudents: state.totalStudents,
        lists: changeLists,
        // changeList: {
        //     id: payload.idList,
        //     change: payload.change,
        // },
    };
}

function processInitializeLists (state, payload) {
    // console.log('reduce # processInitializeLists : ', JSON.stringify(payload));
    const total = payload.lists.reduce((acc, list) => acc+getListTotalStudents(list),0);
    // console.log('reduce # processInitializeLists # total : ', total);

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