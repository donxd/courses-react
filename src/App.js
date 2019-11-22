import React, { Component } from 'react';
import './App.css';
import List from './components/list/List';
import { connect } from 'react-redux';
import { initializeLists } from './redux/actions/actions';

const initialData = {
  lists: [
    {
      course: 'English',
      groups: [
        {
          language: 'English',
          level: 'Basic-1',
          classroom: 'B101',
          teacher: 'p1',
          schedule: 'lu-vi 7-9am',
          students: [
            'josé',
            'juana',
            'jorge',
          ],
        },
        {
          language: 'English',
          level: 'Basic-2',
          classroom: 'P101',
          teacher: 'p3',
          schedule: 'lu-vi 11-17',
          students: [
            'josé',
            'juana',
            'jorge',
          ],
        },
        {
          language: 'English',
          level: 'Inter-4',
          classroom: 'Z101',
          teacher: 'p7',
          schedule: 'sa-do 7-9am',
          students: [
            'josé',
            'juana',
            'jorge',
          ],
        },
      ],
    },
    {
      course: 'French',
      groups: [
        {
          language: 'French',
          level: 'Basic-1',
          classroom: 'B101',
          teacher: 'p1',
          schedule: 'lu-vi 7-9am',
        },
        {
          language: 'French',
          level: 'Basic-2',
          classroom: 'P101',
          teacher: 'p3',
          schedule: 'lu-vi 11-17',
        },
        {
          language: 'French',
          level: 'Inter-4',
          classroom: 'Z101',
          teacher: 'p7',
          schedule: 'sa-do 7-9am',
        }
      ],
    }
  ],
  total: 9,
};

class App extends Component {
  constructor (props) {
    super(props);
    this.listChangeCounter=this.listChangeCounter.bind(this);
    this.state = this.initialState();
    this.props.initialize();
  }
  initialState () {
    return initialData;
  }
  shouldComponentUpdate (nextProps, nextState) {
    nextState.total = nextProps.total;
    return true;
  }
  addData () {
    const newLists = [...this.state.lists];
    newLists.push({
      course: 'German',
      groups: [
        {
          language: 'German',
          level: 'Basic-1',
          classroom: 'B101',
          teacher: 'p1',
          schedule: 'lu-vi 7-9am',
        },
        {
          language: 'German',
          level: 'Basic-2',
          classroom: 'P101',
          teacher: 'p3',
          schedule: 'lu-vi 11-17',
        },
        {
          language: 'German',
          level: 'Inter-4',
          classroom: 'Z101',
          teacher: 'p7',
          schedule: 'sa-do 7-9am',
        }
      ],
    });
    this.setState({lists: newLists});
  }
  listChangeCounter (reduce) {
    this.setState({total: this.state.total-reduce});
  }
  render () {
    return (
      <div>
        <button onClick={() => this.addData()}>Add</button>
        Total students : <span className='red'>{this.state.total} </span>
        {this.state.lists.map((list, index) => {
          list.index=index;
          return (
            <List key={index} data={list} onChangeCounter={this.listChangeCounter}/>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    total: state.totalStudents,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const eventExecute = () => {
    console.log('initialize app data');
    dispatch(initializeLists(initialData.lists));
  };

  return {
    initialize: eventExecute
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
