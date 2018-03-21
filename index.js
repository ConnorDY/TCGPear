import $ from "jquery";
import React from "react";
import { render } from "react-dom";
import { TabbedView } from "./tabbedView"
// import { shuffle } from "./misc";

const App = () => (
	<TabbedView />
);

render(<App />, $("#root").get(0));
