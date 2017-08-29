import React, { Component } from 'react'
import ListBooks from './ListBooks'

class Results extends Component {


    // {this.state.books && 
    //                 <ListBooks
    //                     books={this.state.books}
    //                 />
    //             }
    //             {!this.state.books && 
    //                 <p>Loading</p>
    //             }

    render(){

        return(
            <div className="search-books-results">
                <ListBooks
                    books={this.props.books}
                />
            </div>
        )
    }
    
}

export default Results