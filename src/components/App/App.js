import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from '../../utils/BooksAPI';
import SearchBooks from '../SearchBooks';
import BookShelf from '../BookShelf';
import Loader from '../Loader/Loader';

class BooksApp extends React.Component {
	state = {
		books: [],
		Loading: false
	};

	getAllBooks = () => {
		this.setState({ Loading: true });
		BooksAPI.getAll().then((books) => {
			this.setState({ Loading: false });
			this.setState({
				books: books
			});
		});
	};

	componentDidMount() {
		this.getAllBooks();
	}

	updateShelf = (book, shelf) => {
		this.setState({ Loading: true });
		BooksAPI.update(book, shelf).then(() => {
			book.shelf = shelf;
			this.setState((previousState) => {
				let books = previousState.books.filter((b) => b.id !== book.id);
				books.push(book);
				return { books };
			});

			this.setState({ Loading: false });
		});
	};

	render() {
		const shelfTypes = [
			{ type: 'currentlyReading', title: 'Currently Reading' },
			{ type: 'wantToRead', title: 'Want To Read' },
			{ type: 'read', title: 'Read' }
		];
		const { books } = this.state;
		return (
			<div className="app">
				<Route path="/search" render={() => <SearchBooks updateShelf={this.updateShelf} />} />

				<Route
					exact
					path="/"
					render={() => (
						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							{this.state.Loading ? <Loader /> : null}
							<div className="list-books-content">
								{shelfTypes.map((shelf, index) => {
									const shelfBooks = books.filter((book) => book.shelf === shelf.type);
									return (
										<BookShelf
											key={index}
											books={shelfBooks}
											shelfTitle={shelf.title}
											updateShelf={this.updateShelf}
										/>
									);
								})}
							</div>
							<Link to="/search" className="open-search">
								<button>Add a book</button>
							</Link>
						</div>
					)}
				/>
			</div>
		);
	}
}

export default BooksApp;
