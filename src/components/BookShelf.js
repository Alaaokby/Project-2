import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const BookShelf = ({ title, books, onShelfChange }) => {
  //   console.log(title);
  //   console.log(books);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book) => (
              <Book key={book.id} book={book} onShelfChange={onShelfChange} />
            ))}
        </ol>
      </div>
    </div>
  );
  BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  };
};

export default BookShelf;
