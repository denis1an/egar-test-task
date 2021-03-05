import React from "react"
import {TextField, Button} from "@material-ui/core";

import API from "../../shared/http"

import style from "./style.scss"

class CreateStock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            date: "",
            message: ""
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onHandleCreate = this.onHandleCreate.bind(this);
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

    onHandleCreate(e) {
        e.preventDefault();

        API.post(
            "/stocks",
            {
                name: this.state.name,
                price: this.state.price,
                date: this.state.date
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response =>{
                this.setState({message: response.data})
        })

        window.location.reload();
    }

    render() {
        return(
            <div className="container">
                <form onSubmit={this.onHandleCreate}>
                    <div className="form-group">
                        <TextField
                            label="Ценная бумага"
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            type="number"
                            label="Стоимость"
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            type="date"
                            label="Дата"
                            onChange={this.onChangeDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Добавить
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateStock;