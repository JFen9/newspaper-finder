import React, { Component } from 'react'

class SearchResults extends Component {
  constructor(){
        super()
    }

  render() {
  	let results = this.props.data.map(item => <li key={item.id}><a href={item.url.split('.json')[0]}>{item.title}</a></li>)

    return (
     <div>
       <ul>
       { results }
       </ul>
     </div>
    )
  }
}

export default SearchResults
