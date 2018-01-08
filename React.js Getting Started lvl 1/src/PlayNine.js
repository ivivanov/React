import React, { Component } from 'react';

class PlayNine extends Component {
    static getRandNumber = () => 1 + Math.floor(Math.random() * 9);

    constructor(props) {
        super(props);

        this.state = {
            selectedNumbers: [],
            randStarsCount: PlayNine.getRandNumber(),
            isCorrectAnswer: null,
            usedNumbers: [],
            reroll: 5,
            doneStatus: null
        }

        this.selectNumberHandler = this.selectNumberHandler.bind(this);
        this.unselectNumberHandler = this.unselectNumberHandler.bind(this);
        this.checkAnswerHandler = this.checkAnswerHandler.bind(this);
        this.acceptAnswer = this.acceptAnswer.bind(this);
        this.doReroll = this.doReroll.bind(this);
        this.updateDoneStatus = this.updateDoneStatus.bind(this);
        this.posibleSolutions = this.posibleSolutions.bind(this);
    }

    selectNumberHandler = function (clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.usedNumbers.indexOf(clickedNumber) < 0) {
            this.setState(function (prevState) {
                return {
                    selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
                }
            })
        }
    }

    unselectNumberHandler = function (clickedNumber) {
        this.setState(function (prevState) {
            return {
                selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
            }
        })
    }

    checkAnswerHandler = function () {
        let selectedSum = this.state.selectedNumbers.reduce((acc, n) => acc + n, 0);
        this.setState(function (prevState) {
            return {
                isCorrectAnswer: selectedSum === this.state.randStarsCount
            }
        })
    }

    acceptAnswer = function () {
        this.setState(function (prevState) {
            return {
                selectedNumbers: [],
                randStarsCount: PlayNine.getRandNumber(),
                isCorrectAnswer: null,
                usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers)
            }
        }, this.updateDoneStatus)
    }

    doReroll = function () {
        this.setState(function (prevState) {
            return {
                selectedNumbers: [],
                randStarsCount: PlayNine.getRandNumber(),
                isCorrectAnswer: null,
                reroll: prevState.reroll - 1
            }
        }, this.updateDoneStatus)
    }

    updateDoneStatus = function (msg) {
        this.setState(function (prevState) {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Congratulations!' };
            }

            if (prevState.reroll === 0 && !this.posibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' };
            }

            if (msg) {
                return { doneStatus: msg };
            }
        })
    }

    posibleSolutions = function (state) {
        const { usedNumbers, randStarsCount } = state;
        const posibleNumbers = Numbers.getOneToNine().filter(x => usedNumbers.indexOf(x) < 0);
        return PlayNine.possibleCombinationSum(posibleNumbers, randStarsCount);
    }

    static possibleCombinationSum = function (arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return PlayNine.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <h1 className='big-font'>Play Nine Stars</h1>
                    </div>
                    <div className='col-6'>
                        <Timer updateDoneStatus={this.updateDoneStatus} />
                    </div>
                </div>
                <hr />
                <div className='jumbotron'>

                    <div className='row'>
                        <Stars randStarsCount={this.state.randStarsCount} />
                        <EqualsBtn
                            selectedNumbers={this.state.selectedNumbers}
                            checkAnswer={this.checkAnswerHandler}
                            isCorrectAnswer={this.state.isCorrectAnswer}
                            acceptAnswer={this.acceptAnswer}
                            reroll={this.state.reroll}
                            doReroll={this.doReroll}
                        />
                        <Answer selectedNumbers={this.state.selectedNumbers} unselectNumber={this.unselectNumberHandler} />
                    </div>
                </div>
                <div className='row text-center'>
                    {this.state.doneStatus ?
                        <StatusDisplay doneStatus={this.state.doneStatus} />
                        :
                        <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumberHandler} usedNumbers={this.state.usedNumbers} />
                    }
                </div>
            </div>
        );
    }
}

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: 60
        }

        setInterval(() =>
            this.setState(function (prevState) {
                if (prevState.seconds === 0) {
                    props.updateDoneStatus('No time! Game Over!')
                }

                return {
                    seconds: prevState.seconds === 0 ? 0 : prevState.seconds - 1
                };
            }
            ), 1000);
    }

    render() {
        return (
            <div className='big-font pull-right'>
                {this.state.seconds} seconds left
            </div>
        );
    }
}

const StatusDisplay = function (props) {
    return (
        <div className='col-12'>
            <h1>{props.doneStatus}</h1>
        </div>
    )
}

const Stars = function (props) {
    let stars = [];

    for (let i = 0; i < props.randStarsCount; i++) {
        stars.push(<i key={i} className='fa fa-star'></i>);
    }

    return (
        <div className='col-6' >
            {stars}
        </div>
    );
}

const EqualsBtn = function (props) {

    let button;

    switch (props.isCorrectAnswer) {
        case true:
            button =
                <button onClick={props.acceptAnswer} className='btn btn-success'>
                    <i className='fa fa-check'></i>
                </button>
            break;
        case false:
            button =
                <button className='btn btn-danger'>
                    <i className='fa fa-times'></i>
                </button>
            break
        default:
            button =
                <button
                    onClick={props.checkAnswer}
                    disabled={props.selectedNumbers <= 0}
                    className='btn'>=</button>
            break;
    }

    return (
        <div className='col-2 text-center'>
            {button}
            <hr />
            <button
                onClick={props.doReroll}
                className='btn btn-warning btn-sm'
                disabled={props.reroll === 0}>
                <i className='fa fa-refresh'></i> {props.reroll}
            </button>
        </div>
    );
}

const Answer = function (props) {
    return (
        <div className='col-4'>
            {props.selectedNumbers.map(x => <span key={x} onClick={() => props.unselectNumber(x)}>{x}</span>)}
        </div>
    );
}

class Numbers extends Component {
    static getOneToNine = function () {
        return Array(9).fill().map((v, i) => i + 1);
    }

    constructor(props) {
        super(props);

        this.state = {
            list: Numbers.getOneToNine()
        }
    }

    getNumberState = function (number) {
        if (this.props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }

        if (this.props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    }

    render() {
        return (

            <div className='col-12'>
                <div className='text-center'>
                    {this.state.list.map((v, i) =>
                        <span className={this.getNumberState(v)}
                            key={v}
                            onClick={() => this.props.selectNumber(v)}>
                            {v}
                        </span>
                    )}
                </div>
            </div>
        )
    };
}

export default PlayNine;