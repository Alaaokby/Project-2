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
          response.map((b) =>
            books.findIndex((b2) => b2.id === b.id) === -1
              ? b
              : books[books.findIndex((b2) => b2.id === b.id)]
          );

      this.setState({ newBooks: booksMerged });
    });
  };
  onShelfChange = (book, shelf) => {
    update(book, shelf).catch((err) => console.log(err.message));
    const { newBooks } = this.state;
    book.shelf = shelf;
    this.setState({
      newBooks: [...newBooks.filter((b) => b.id !== book.id), book],
    });
  };

  render() {
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
                  onShelfChange={this.onShelfChange}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
