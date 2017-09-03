import React from 'react'
import { Route, Link } from 'react-router-dom'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'
import Results from './Results'
import BookShelves from './BookShelves'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    hasBooks: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (selectedBook, option) =>{
    this.state.books.filter((book) => {
      if(book.id === selectedBook.id) {
          book.shelf = option
      } else {
        this.setState(state => ({
            books: state.books.concat([selectedBook])
        }))
      }
      BooksAPI.update(selectedBook, option)
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


    return(
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves
              books={books}
              onUpdateBook={this.updateBook}
           />
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
                onUpdateBook={this.updateBook}
              />
            }
          </div>
          
        )}/>
      </div>
    )
}
}

export default BooksApp
