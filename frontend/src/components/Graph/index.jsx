import React from 'react';
import API from "../../shared/http"
import {Line} from "react-chartjs-2";

import style from "./style.scss"

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels:[],
                datasets:[]
            }
        };
    }

    componentDidMount() {
        API.get("/stocks/graph")
            .then(response => {
                let datasets = response.data.map(function (current){
                    return {
                        label: current.name,
                        data: current.cost,
                        fill: false,
                        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
                    };
                });
                let dataLine = {
                    labels: response.data[0].date,
                    datasets
                };
                this.setState({
                    data: dataLine
                });
            });
    }


    render() {
        return (
            <div className="container_line">
                <Line data={this.state.data}/>
            </div>
        )
    }
}
export default Graph;