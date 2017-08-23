import React from 'react'
import Shelf from './Shelf'
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
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }


  render() {
    const { books } = this.state

    let currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading")
    let wantToReadBooks = books.filter((book) => book.shelf === "wantToRead")
    let readBooks = books.filter((book) => book.shelf === "read")


    return(
      <div className="app">
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
        </div>
      </div>
    )
}
}

export default BooksApp
