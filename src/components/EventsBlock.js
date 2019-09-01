import React from 'react';
import _ from 'lodash';
import '../CalendarService'

export function EventsBlock({eventsBlock}) {
	if (_.isEmpty(eventsBlock)) {
		return null;
	}

	const events = eventsBlock.events.map(event =>
		<div
			key={_.uniqueId()}
			className="event"
			style={{
				height: event.height,
				width: event.width,
				top: event.topOffset,
			}}
		>
			{event.displayText}
		</div>
	)

	return (
		<div
			className="eventBlock"
			style={{
				top: eventsBlock.topOffset,
			}}>
			{events}
		</div>
	)
}
