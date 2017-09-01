import React, { Component } from 'react'
import ListBooks from './ListBooks'

class Shelf extends Component {

    handleUpdate = (book, option) => {
        this.props.onUpdateBook(book, option)
    }  

    render(){
        const { shelf, books } = this.props

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ListBooks
                        books={books}
                        onUpdateBook={this.handleUpdate}
                    />
                </div>
            </div>
        )
    }
    
}

export default Shelf