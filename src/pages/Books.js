import React, { Component } from "react";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Books extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };
  render() {
    const { books, loading, onShelfChange } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {loading && <h1>Loading..</h1>}
          {!loading && (
            <div>
              <BookShelf
                title={"Currently Reading"}
                books={books.filter(
                  (book) => book.shelf === "currentlyReading"
                )}
                onShelfChange={onShelfChange}
              />
              <BookShelf
                title={"Want to Read"}
                books={books.filter((book) => book.shelf === "wantToRead")}
                onShelfChange={onShelfChange}
              />
              <BookShelf
                title={"Read"}
                books={books.filter((book) => book.shelf === "read")}
                onShelfChange={onShelfChange}
              />
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Books;
