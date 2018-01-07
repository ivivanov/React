import React, { Component } from 'react';

class PlayNine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <h1 className='big-font'>Play Nine Stars</h1>
                <hr />
                <div className='jumbotron'>
                    <div className='row'>
                        <Stars />
                        <EqualsBtn />
                        <AnswerTb />
                    </div>
                </div>
                <div className='row'>
                    <Numbers />
                </div>
            </div>
        );
    }
}

const Stars = function (props) {

    const randStarsCount = 1 + Math.floor(Math.random() * 9);
    let stars = [];
    for (let i = 0; i < randStarsCount; i++) {
        stars.push(<i key={i} className='fa fa-star'></i>);
    }

    return (
        <div className='col-6'>
            {stars}
        </div>
    );
}

const EqualsBtn = function (props) {
    return (
        <div className='col-2'>
            <button className='btn'>=</button>
        </div>
    );
}

const AnswerTb = function (props) {
    return (
        <div className='col-4'>
            <input className='form-control' type='text' placeholder="Answer" />
        </div>
    );
}

const Numbers = function (props) {
    return (
        <div className='col-12'>
            <div className='text-center'>
                {Numbers.list.map((v, i) => <span key={v}>{v}</span>)}
            </div>
        </div>
    )
}

Numbers.list = Array(9).fill().map((v, i) => i + 1);

export default PlayNine;