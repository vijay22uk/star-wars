import React, { Component } from 'react';
import Store from '../../Store';
export class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { secondRemaining: Store.getTimeRemaining() }
  }
  componentWillUnmount() {
    Store.unSubscribe();
  }
  componentDidMount() {
    this.startTimer();
  }
  tick = (timeRemaining) => {
    if (timeRemaining <= 0) {
      this.resetTimer();
    } else {
      this.setState({ secondRemaining: timeRemaining });
    }
  }
  resetTimer = () => {
    this.props.waitOver();
    this.setState({
      secondRemaining: this.props.maxCount
    });
    this.startTimer();
  }
  startTimer = () => {
    Store.initTimer(this.tick);
  }
  render() {
    return (
      <div className='timer'>
        Search Access reset: <span>{this.state.secondRemaining}</span>
      </div>
    )
  }
}