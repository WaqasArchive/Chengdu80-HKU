import React from "react";
import Root from "./containers/app";
import store, {history} from "./store";
import {ConnectedRouter} from "connected-react-router";
import {Provider} from "react-redux";

import "./App.css";

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div>
						<Root />
					</div>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;
