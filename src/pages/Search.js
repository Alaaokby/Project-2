import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search, update } from "../api/BooksAPI";
import Book from "../components/Book";

class Search extends Component {
  state = {
    books: [],
  };
  handleSearchBook = (event) => {
    search(event.target.value).then((response) => {
      if (typeof response === "object" && "error" in response) {
        this.setState({
          books: [],
        });
      }
      console.log(response);

      this.setState({ books: response });
    });
  };
  onShelfChange = (book, shelf) => {
    update(book, shelf).catch((err) => console.log(err.message));
    const { books } = this.state;
    book.shelf = shelf;
    this.setState({
      books: [...books.filter((b) => b.id !== book.id), book],
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
            {this.state.books &&
              this.state.books.length &&
              this.state.books.map((book) => (
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
