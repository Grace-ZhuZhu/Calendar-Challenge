import React from 'react';
import PropTypes from 'prop-types';
import './Calendar.css';
import './CalendarService'
import { Container } from './components/Container';
import { HourList } from './components/HourList'

function Calendar({ events }) {
	return (
		<Container>
			<HourList events={events}/>
		</Container>
	);
}

Calendar.propTypes = {
	events: PropTypes.array,
}

Calendar.defaultProps = {
	events: []
}

export default Calendar;
