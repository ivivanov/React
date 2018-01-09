import React, { Component } from 'react';
import GitCards from './GitCards/GitCards';
import PlayNine from './PlayNine/PlayNine';

class App extends Component {
    render() {
        return (
            <div >
                <h1>1. GitCards app Component</h1>
                <hr />
                <div className='jumbotron'>
                    <GitCards />
                </div>
                <h1>2. PlayNine app Component</h1>
                <hr />
                <div>
                    <PlayNine />
                </div>

            </div>
        )
    }
}

export default App;

