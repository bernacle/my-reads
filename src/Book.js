import React, { Component } from 'react'

class Book extends Component {

    handleUpdate = (event) => {
        this.props.onUpdateBook(this.props.book, event.target.value)
    }

    render(){
        const { book, shelfOption  } = this.props

        return(
            <div className="book">
                <div className="book-top">
                    {book.imageLinks &&
                     <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    }
                    <div className="book-shelf-changer">
                    <select value={shelfOption} onChange={this.handleUpdate}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                
            </div>
        )
    }
    
}

export default Book