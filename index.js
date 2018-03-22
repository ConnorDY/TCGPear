import $ from "jquery";
import React from "react";
import { render } from "react-dom";
import TabbedView from "./tabbedView";

const App = () => (
	<TabbedView />
);

render(<App />, $("#root").get(0));
