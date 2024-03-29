import React, { Component } from 'react';
import Group from '../group/Group'
import './List.css'
import { connect } from 'react-redux';

class List extends Component {
    constructor (props) {
        super(props);
        this.childChangeCounter=this.childChangeCounter.bind(this);
        this.state=this.getStates(props);
    }
    getStates(props) {
        const states = {...props.data};
        states.total = states.groups.reduce((acc,group) => acc+(group && group.students ? group.students.length : 0),0);
        return states;
    }
    childChangeCounter (reduce) {
        this.setState({total: this.state.total-reduce});
        this.props.onChangeCounter(reduce);
    }
    shouldComponentUpdate (nextProps, nextState) {
        nextState.total = nextProps.total;
        return true;
    }
    render () {
        return (
            <div className='list'>
                <div>List : {this.state.course} # total : <span className='red'> {this.state.total} </span> </div>
                {this.state.groups.map((group, index) => {
                    group.idList = this.props.data.index;
                    return (
                        <Group key={index} data={group} onChangeCounter={this.childChangeCounter}/>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const data = state.lists[props.data.index];
    if (data) {
        return {
            total: getListTotalStudents(data, props),
            groups: data.groups,
        };
    }

    return {};
};

function getListTotalStudents (data, props) {
    if (data.totalStudents !== undefined) return data.totalStudents;

    return data.groups.reduce((acc,group) => acc+(group && group.students ? group.students.length : 0),0);
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);