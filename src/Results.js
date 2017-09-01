import React, { Component } from 'react'
import ListBooks from './ListBooks'

class Results extends Component {

    handleUpdate = (book, option) => {
        this.props.onUpdateBook(book, option)
    }  

    render(){

        const { books, searchedBooks } = this.props
        
        searchedBooks.map((searchBook) => {
            books.filter(book => {
                if (searchBook.id === book.id ){
                    searchBook.shelf = book.shelf
                }
            })
        })

        return(
            <div className="search-books-results">
                <ListBooks
                    books={searchedBooks}
                    onUpdateBook={this.handleUpdate}
                />
            </div>
        )
    }
    
}

export default Results