import React, { Component } from "react";
import { render } from "react-dom";

class Tp extends Component {
	constructor(props) {
		super(props);
		this.state = {}

	}
	componentDidMount() {
		fetch("/api/tp/")
		.then(response => response.json())
		.then(data => {
			this.setState({data})
		});
	}
	render(props) {
		console.log("rendering tp");
		return (
			<div>Hello</div>
		);
	}
}
export default Tp;
