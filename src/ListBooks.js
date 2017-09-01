import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {

    
    handleUpdate = (book, option) => {
        this.props.onUpdateBook(book, option)
    }    

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
        shelfOption: ''
    }


    render(){
        const { books } = this.props
        
        return(
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book 
                            book={book}
                            onUpdateBook={this.handleUpdate}
                            shelfOption={book.shelf ? book.shelf : 'none'}
                         />
                    </li>
                ))}
            </ol>
        )
    }   
}

export default ListBooks