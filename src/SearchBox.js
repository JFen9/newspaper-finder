import React, { Component } from 'react'

class SearchBox extends Component {
  constructor(){
        super();

        this.state = {
          inputValue: '',
          autoSuggestResults: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

  handleInputChange(event) {
    document.getElementsByClassName('autosuggest')[0].style.display='block'
    this.setState({
      inputValue: event.target.value
    })

    fetch(`http://chroniclingamerica.loc.gov/suggest/titles/?q=${this.state.inputValue}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({autoSuggestResults: data[1].slice(0, 4)})
    })
  }

  render() {
    let autosuggestResults = this.state.autoSuggestResults.map(item => <li onClick={ () => this.setState({inputValue: item }) } key={item}>{item}</li>)
    return (
    <div className="inputBox">
     <form onSubmit={ (e) => {e.preventDefault(); this.props.onSubmit(this.state.inputValue); } }>
     <input type="text" value={this.state.inputValue} onChange={this.handleInputChange} />
     <div className="autosuggest" style={{border: 'thin solid #000000', display: 'none'}}>
        <ul>
          { autosuggestResults }
        </ul>
     </div>
     </form>
    </div>
    )
  }
}

export default SearchBox
