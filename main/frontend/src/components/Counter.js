import React, { Component } from "react";
import { render } from "react-dom";
import FlipNumbers from 'react-flip-numbers';
class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data : {Cases : 0},
			data2 : [
					
			],
			layout: {
				autosize: true,
				hovermode: "closest",
				mapbox: {
					bearing: 0,
					center: {
						lat:45,
						lon:-73,
					},
					pitch: 0,
					zoom: 5,
				},
			},
			loaded: false,
			placeholder: "loading",
			geoUrl : "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
		};
	};
	
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			5000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tick() {
		fetch("https://api.covid19api.com/total/country/us/status/confirmed")
		.then(response => response.json())
		.then(data => {
			let last = data.pop()
			this.setState(() => {
				return {
					data : last,
					loaded : true
				};
			});
		})
		.then(() => fetch("https://api.covid19api.com/country/us/status/confirmed/live"))
		.then(response => response.json())
		.then(data => {
			var last5 = data.splice(-5, 5)
			this.setState(() => {
				return {
					data2 : last5
				};
			});
		})
		.then(() => this.setState({data3: []}))
		.then(() => {for ( const [index, value] of this.state.data2.entries()) {
					this.setState({
						data3: [
							this.state.data3,
							{
								makerOffset: -15,
								name: value["Province"],
								coordinates: [value["Lon"], value["Lat"]],
							},
						]
					});
		};
		});
	}
	render() {
		if (this.state.data2.length === 0) {
			var items = "Loading"
		} else {
			var items = []
			var map = "https://maps.googleapis.com/maps/api/staticmap?center=USA"
			for (const [index, value] of this.state.data2.entries()) {
				items.push(<li key={index} style={{list_style_type : "none"}}>Location: {value["Province"]}, {"Date"}: {value["Date"]}, Lon: {value["Lon"]}, Lat: {value["Lat"]}</li>)
				var map = map.concat("&markers=color:blue%7C", value["Lat"], ",", value["Lon"])
			}
			var map = map.concat("&size=400x300&zoom=2&key=AIzaSyC6PANowquhDeD-hEpY2nwen677WYmrowM")
			console.log(map)
			}
		console.log("rendering main counter");
		return (
			<div className="container-fluid">
			<h1><center>{"Number"} of Cases in the United States currently:</center></h1>
			<FlipNumbers height={50} width={50} color="white" background="red" play perspective={1000} numbers={this.state.data["Cases"].toString()} />
			<div className="row">
				<div className="col-md-6">
					<h1>Most Recent 5 cases:</h1>
					<ul>
						{items}
					</ul>
				</div>
				<div className="col">
				</div>
				<div className="col-md-6">
					<div id="map">
						<img src={map} style={{max_width: "100%", height: "auto", margin: "auto", display: "block"}}/>
					</div>
				</div>
			</div>
			</div>
		);
	}
}
export default Counter;

		
