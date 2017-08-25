import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
        shelfOption: ''
    }

    updateBook = (book, option) =>{
        BooksAPI.update(book, option)
    }

    render(){
        const { books } = this.props
        
        return(
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book 
                            book={book}
                            onUpdateBook={this.updateBook}
                            shelfOption={book.shelf}
                         />
                    </li>
                ))}
            </ol>
        )
    }   
}

export default ListBooks