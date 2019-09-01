import React from 'react';

export function Container({ children }) {
	return (
		<div className="container">
			<div className="calendar">
				<div className="calendarHeader">
					<h1>Today</h1>
					<p className="description">Upcoming Events</p>
				</div>

				{children}
			</div>
		</div>
	);
}

