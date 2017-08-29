import React from 'react'
import { Route, Link } from 'react-router-dom'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'
import Results from './Results'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
              books={this.state.searchedBooks}
            />
            }
          </div>
          
        )}/>
      </div>
    )
}
}

export default BooksApp
