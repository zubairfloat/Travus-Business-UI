import React from 'react';
import Helmet from 'react-helmet';
import CustomButton from '../CustomBtn';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const today = new Date();
class DateSelect extends React.Component {
  static defaultProps = {
    numberOfMonths: 2
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }
  handleDayClick(day, modifiers) {
    if (modifiers.disabled) {
      return;
    }
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const numberOfDays = from && to ? Math.round((to - from) / (1000 * 60 * 60 * 24)) + 1 : 0;
    const fromDate = from && from.toLocaleDateString();
    const toDate = to && to.toLocaleDateString();
    return (
      <div className="RangeExample">
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <CustomButton style={{ width: "68px", height: "37px" }} name={'Reset'} onClick={this.handleResetClick} />
          )}
        </p>
        <DayPicker
          disabledDays={{ before: today }}
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <div className="planDateBtn" >
          <CustomButton name={'Submit'} onClick={() => { fromDate && toDate && this.props.handleDate(fromDate, toDate, numberOfDays) }} />
        </div>
        <Helmet>
          <style>
            {`
              .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #f0f8ff !important;
                color: #4a90e2;
              }
              .Selectable .DayPicker-Day {
                border-radius: 0 !important;
              }
              .Selectable .DayPicker-Day--start {
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
              }
              .Selectable .DayPicker-Day--end {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
              }
            `}
          </style>
        </Helmet>
      </div>
    );
  }
}

export default DateSelect;
