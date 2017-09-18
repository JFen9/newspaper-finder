import React, { Component } from 'react'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import ReactPaginate from 'react-paginate'
import './App.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      articles: [],
      curr_page: [],
      pageCount: 0
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  onSubmit(query) {
    document.getElementsByClassName('autosuggest')[0].style.display='none'
    fetch(`http://chroniclingamerica.loc.gov/search/pages/results/?andtext=${query}&format=json`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        articles: data.items,
        curr_page: this.state.articles.slice(0, this.props.perPage),
        pageCount: Math.ceil(data.items.length / this.props.perPage) 
      })
    })
    console.log(this.state.articles)
  }

  handlePageClick(data) {
    this.setState({
      curr_page: this.state.articles.slice(data.selected * this.props.perPage, (data.selected + 1) * this.props.perPage)
    })
  } 

  render() {
    return (<div className="App">
        <SearchBox onSubmit={ this.onSubmit } />

        <SearchResults data={this.state.curr_page} />
  
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />

      </div>
    )
  }
}

export default App
