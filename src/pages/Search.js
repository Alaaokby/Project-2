import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search, update } from "../api/BooksAPI";
import Book from "../components/Book";

class Search extends Component {
   state = {
    newBooks: [],
  };
  handleSearchBook = (event) => {
    search(event.target.value).then((response) => {
      let { books } = this.props;
      if (typeof response === "object" && "error" in response) {
        this.setState({
          newBooks: [],
        });
      }
     const booksMerged =
          response &&
          response.length > 0 &&
          response.map((book) => {
            const bookOnShelf = books.find((b) => b.id === book.id);
            book.shelf = bookOnShelf ? bookOnShelf.shelf : "none";
            return book;
          });

      this.setState({ newBooks: booksMerged });
    });
  };
  

  render() {
         const { onShelfChange } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.newBooks &&
              this.state.newBooks.length &&
              this.state.newBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onShelfChange={onShelfChange}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
