import './styles.css';
import React from 'react';

export default function App() {
	const initialState = {
		isRunning: false,
		time: 0
	};
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const idRef = React.useRef(0);
	// callback and dpendencies- note callback would be clean otherwise
	// it won't stop
	React.useEffect(() => {
		if (!state.isRunning) {
			return;
		}
		idRef.current = setInterval(() => dispatch({ type: 'tick' }), 100);
		return () => {
			clearInterval(idRef.current);
		};
	}, [state.isRunning]);

	return (
		<div className="App">
			<div>{state.time}s</div>
			<button onClick={() => dispatch({ type: 'start' })}>Start</button>
			<button onClick={() => dispatch({ type: 'stop' })}>Stop</button>
			<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
		</div>
	);
}
function reducer(state, action) {
	switch (action.type) {
		case 'start':
			return { ...state, isRunning: true };
		case 'stop':
			return { ...state, isRunning: false };
		case 'reset':
			return { isRunning: false, time: 0 };
		case 'tick':
			return { ...state, time: state.time + 1 };
		default:
			throw new Error();
	}
}
