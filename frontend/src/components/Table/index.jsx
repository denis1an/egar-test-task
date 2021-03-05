import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import API from "../../shared/http"
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import {Input} from "@material-ui/core";

import style from "./style.scss"

class StockTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            name: "",
            price: "",
            date: "",
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onToggleEditMode = this.onToggleEditMode.bind(this);
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    handleUpdate(id) {

        API.put(
            "stocks/" + id,
            {
                id: id,
                name: this.state.name,
                price: this.state.price,
                date: this.state.date
            }
        ).then(response => {
            this.setState({
                message : response.data
            });
        });

        window.location.reload();
    }

    componentDidMount() {
        API.get("/stocks")
            .then(response => {
                let rows = response.data.map(function (current){
                    let row = Object.assign({}, current);
                    row.isEditMode = false;
                    return row;
                })
                this.setState({rows: rows});
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    onToggleEditMode(id) {
        let updateRows = this.state.rows.map( row =>{
            if(row.id === id){
                row.isEditMode = !row.isEditMode;
                this.setState({
                    name: row.name,
                    price: row.price,
                    date: row.date
                })
                return row;
            }
            return row;
        })
        this.setState({
           rows: updateRows
        });
    }

    render() {
        return(
            <div className="container">
                <Table className="table" size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"/>
                            <TableCell align="left">Ценная бумага</TableCell>
                            <TableCell align="left">Стоимость</TableCell>
                            <TableCell align="left">Дата</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell className="selectTableCell">
                                    {row.isEditMode ?(
                                        <>
                                            <IconButton
                                                aria-label="done"
                                                onClick={() => this.handleUpdate(row.id)}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="revert"
                                                onClick={() => this.onToggleEditMode(row.id)}
                                            >
                                                <RevertIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => this.onToggleEditMode(row.id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                                <TableCell align="left" className="tableCell">
                                    {row.isEditMode ? (
                                            <Input
                                                    type="text"
                                                    value={this.state.name}
                                                    name={"name"}
                                                    onChange={this.onChangeName}
                                                    className="input"
                                            />
                                    ): (
                                     row.name
                                    )}
                                </TableCell>

                                <TableCell align="left" className="tableCell">
                                    {row.isEditMode ? (
                                        <Input
                                            type="text"
                                            value={this.state.price}
                                            name={"price"}
                                            onChange={this.onChangePrice}
                                            className="input"
                                        />
                                    ): (
                                        row.price
                                    )}
                                </TableCell>

                                <TableCell align="left" className="tableCell">
                                    {row.isEditMode ? (
                                        <Input
                                            type="date"
                                            value={this.state.date}
                                            name={"date"}
                                            onChange={this.onChangeDate}
                                            className="input"
                                        />
                                    ): (
                                        row.date
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default StockTable;