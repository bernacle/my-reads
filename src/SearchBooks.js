import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBook extends Component {

    state = {
        query: ''
    }

    handleSearch = (query) => {
        this.props.handleSearch(query)
        this.setState({query})
    }

    render(){
        return(
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.handleSearch(event.target.value)}/>
                </div>
            </div>
                
        )
    }
    
}

export default SearchBook