import React, { Component } from 'react';

const CardList = function (props) {
    return (
        <div>
            {props.cards.map(x => <Card {...x} />)}
        </div>
    );
};

const Card = function (props) {
    return (
        <div style={{ margin: 10, display: 'flex' }}>
            <img src={props.avatar} width='100' height='100' alt="profile pic" />
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

        this.state = {
            userName: ""
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler = function (event) {
        event.preventDefault();
        console.log(this.state.userName);
    }

    onChangeHandler = function (event) {
        event.preventDefault();
        this.setState({ userName: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <input onChange={this.onChangeHandler} type="text" required />
                <input type="submit" />
            </form>
        );
    }
}

class GitCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [
                {
                    key: 1,
                    avatar: 'http://via.placeholder.com/100',
                    name: "Tyrell Wellick",
                    company: "Evil Corp"
                },
                {
                    key: 2,
                    avatar: 'http://via.placeholder.com/100',
                    name: "Elliot Alderson",
                    company: "FSociety "
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Form />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}
export default GitCards;