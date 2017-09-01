import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

class BookShelves extends Component {

    handleUpdate = (book, option) => {
        this.props.onUpdateBook(book, option)
    }  

    render(){
        const { books } = this.props

        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelf
                      shelf="Currently Reading"
                      books={books.filter((book) => book.shelf === "currentlyReading")}
                      onUpdateBook={this.handleUpdate}
                  />
                  <Shelf
                      shelf="Want to Read"
                      books={books.filter((book) => book.shelf === "wantToRead")}
                      onUpdateBook={this.handleUpdate}
                  />
                  <Shelf
                      shelf="Read"
                      books={books.filter((book) => book.shelf === "read")}
                      onUpdateBook={this.handleUpdate}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
          </div>
        )
    }
    
}

export default BookShelves