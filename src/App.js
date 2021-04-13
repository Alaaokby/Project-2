import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getAll, update } from "./api/BooksAPI";
import "./App.css";
import { Books, NotFound, Search } from "./pages";

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true,
  };

  async componentDidMount() {
    const books = await getAll();
    this.setState({ books, loading: false });
  }
  onShelfChange = (book, shelf) => {
    update(book, shelf).catch((err) => console.log(err.message));
    const { books } = this.state;
    book.shelf = shelf;
    this.setState({
      books: [...books.filter((b) => b.id !== book.id), book],
    });
  };
  render() {
    const { books, loading } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Books
              books={books}
              loading={loading}
              onShelfChange={this.onShelfChange}
            />
          )}
        />

        <Route path="/search" render={(props) => <Search books={books} onShelfChange={this.onShelfChange} />} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}

export default BooksApp;
