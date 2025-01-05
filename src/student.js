import React, { Component } from 'react';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: props.name,
      studentRoll: props.roll,
    };
  }

  render() {
    return (
      <div>
        <h2>Student Information</h2>
        <p>Name: {this.state.studentName}</p>
        <p>Roll Number: {this.state.studentRoll}</p>
      </div>
    );
  }
}

export default Student;
