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
    // Atualiza a pratelheira do livro, e se o livro não estiver no array de livros(state.books), ele é adicionado ao array
    BooksAPI.update(selectedBook, option).then(() => {
      selectedBook.shelf = option
      this.setState({
        books: this.state.books.filter(book => book.id !== selectedBook.id).concat([selectedBook])
      })
    })
  }


  handleSearch = (query) => {
    let timeout
    if (query.length > 0){
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          BooksAPI.search(query, 5).then((books) => {
            if (books.error){
              return this.setState({searchedBooks: [] , hasBooks: false})
            } else {
              this.setState({searchedBooks: books, hasBooks: true})
            }
          })
        }, 1000)
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
