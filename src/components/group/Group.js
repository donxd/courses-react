import React, { Component } from 'react';
import './Group.css';
import Student from '../student/Student';

class Group extends Component {
    constructor (props) {
        super(props);
        this.state=this.getStates(props);

    }
    getStates (props) {
        let dataComponent={...props.data};
        if (!dataComponent.students) dataComponent.students=[];
        dataComponent.total = dataComponent.students.length;
        return dataComponent;
    }
    cancel () {
        this.props.onChangeCounter(this.state.total);
        this.setState({cancel: true, teacher: '-', total: 0});
    }
    render () {
        return (
            <div className={this.state.cancel?'canceled group':'group'}>
                <div className="container">
                    <div> Group <button onClick={()=> this.cancel()}>click</button> # total : <span className="red">{this.state.total}</span> &nbsp; </div>
                    <div> Language : {this.state.language} </div>
                    <div> Level : {this.state.level} </div>
                    <div> Classroom : {this.state.classroom} </div>
                    <div> Teacher : {this.state.teacher} </div>
                    <div> Schedule : {this.state.schedule} </div>
                </div>
                <div className="container">
                    {this.state.students.map((student, index) => {
                        return (
                            <div key={index}><div># {index} : </div><Student data={student}></Student><div>&nbsp;</div></div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Group;