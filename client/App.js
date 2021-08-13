import React, { Component } from 'react'
import { addToWeapons } from '../store/effects/thunkCreators';
import { connect } from 'react-redux';

class App extends Component {
    constructor(){
        super();
        this.state = {
            weapon: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.addWeapons(this.state.weapon);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <input type='text' name='weapon' value={this.state.weapon} placeholder='Enter weapon name' onChange={this.handleChange} />
                    <button type='submit'>Add</button>
                </form>
                <ul>
                    {this.props.weapons.map((weapon, index) => {
                        return (<h1 key={index}>{weapon}</h1>)
                    })}
                </ul>                
            </div>

        )
    }
}
const mapState = (state) => ({
    weapons: state.weapons
});
const mapDispatch = dispatch => ({
    addWeapons: (weapon) => dispatch(addToWeapons(weapon))
})
export default connect(mapState, mapDispatch)(App)
