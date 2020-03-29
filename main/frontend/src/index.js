
import Tp from "./components/Tp";
import Counter from "./components/Counter";
import { render } from "react-dom";
import React, { Components }from "react";

function name(x) {
	console.log(x)
	if (x === "main") {
		console.log('main returned counter tag');
		return <Counter />;
	}
	console.log("main returned tp tag");
	return <Tp />;
}

render(name(document.currentScript.getAttribute("name")), document.getElementById("counter"));
