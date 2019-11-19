import React, { Component } from 'react';

class Student extends Component {
    constructor (props) {
        super(props);
        this.state = {name: props.data};
    }
    render () {
        return (
            <div>
                Student : {this.state.name}
            </div>
        );
    }
}

export default Student;