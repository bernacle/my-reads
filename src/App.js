import React from 'react'
import { Route, Link } from 'react-router-dom'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'
import Results from './Results'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: true,
    books: [],
    searchedBooks: [],
    hasBooks: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleSearch = (query) => {
    if (query.length > 0){
        BooksAPI.search(query, 5).then((books) => {
          if (books.error){
            return this.setState({searchedBooks: [] , hasBooks: false})
          } else {
            this.setState({searchedBooks: books, hasBooks: true})
          }
        })
    }
  }


  render() {
    const { books } = this.state

    let currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading")
    let wantToReadBooks = books.filter((book) => book.shelf === "wantToRead")
    let readBooks = books.filter((book) => book.shelf === "read")


    return(
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelf
                      shelf="Currently Reading"
                      books={currentlyReadingBooks}
                  />
                  <Shelf
                      shelf="Want to Read"
                      books={wantToReadBooks}
                  />
                  <Shelf
                      shelf="Read"
                      books={readBooks}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
          </div>
        )}/>
        <Route path="/search" render={()=> (
          <div className="books">
            <SearchBooks 
              handleSearch={this.handleSearch}
            />
            {this.state.hasBooks &&
              <Results 
                searchedBooks={this.state.searchedBooks}
                books={this.state.books}
              />
            }
          </div>
          
        )}/>
      </div>
    )
}
}

export default BooksApp
