import React, { Component } from 'react';
import axios from 'axios';

const CardList = function (props) {
    return (
        <div>
            {props.cards.map(x => <Card key={x.id} {...x} />)}
        </div>
    );
};

const Card = function (props) {
    return (
        <div style={{ margin: 10, display: 'flex' }}>
            <img src={props.avatar_url} width='100' height='100' alt="profile pic" />
            <div style={{ display: 'inline-block', marginLeft: 10 }} >
                <div style={{ fontWeight: 'bold' }}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

class Form extends Component {

    constructor(props) {
        super(props);
        this._githubProfileApiURL = "https://api.github.com/users/";
        this.state = {
            userName: ""
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler = function (event) {
        event.preventDefault();
        axios.get(this._githubProfileApiURL + this.state.userName)
            .then(result => {
                this.props.onSubmit(result.data);
                this.setState({ userName: "" });
            });
    }

    onChangeHandler = function (event) {
        event.preventDefault();
        this.setState({ userName: event.target.value });
        // this.setState(function (prevState) {
        //     return {
        //         userName: event.target.value
        //     };
        // })
    }

    render() {
        return (
            <form className='input-group' onSubmit={this.onSubmitHandler}>
                <input className='form-control' 
                       onChange={this.onChangeHandler} 
                       type="text" value={this.state.userName} 
                       placeholder='Github username'
                       required />
                <input className='btn' type="submit" />
            </form>
        );
    }
}

class GitCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        }

        this.addNewCard = this.addNewCard.bind(this);
    }

    addNewCard = function (card) {
        this.setState(function (prevState) {
            return {
                cards: prevState.cards.concat(card)
            }
        });
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}
export default GitCards;