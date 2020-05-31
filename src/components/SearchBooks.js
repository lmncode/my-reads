import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class SearchBooks extends React.Component {
	static propTypes = {
		updateShelf: PropTypes.func.isRequired
	};

	state = {
		books: []
	};
	searchBooks = (e) => {
		e.target.value &&
			BooksAPI.search(e.target.value)
				.then((books) => {
					let newBooks = [];
					if (books && !books.error) {
						books.map(async (book) => {
							const b = await BooksAPI.get(book.id);
							await newBooks.push(b);
							this.setState({
								books: [ ...newBooks ]
							});
						});
					} else if (books.error) {
						this.setState({
							books: []
						});
					}
				})
				.catch((error) => console.log(error));
	};
	getBookList = () => {
		const { books } = this.state;
		const bookList = books.length ? (
			books.map((book) => (
				<Book key={book.id} book={book} shelf={book.shelf} updateShelf={this.props.updateShelf} />
			))
		) : (
			<li />
		);

		return bookList;
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">{this.getBookList()}</ol>
				</div>
			</div>
		);
	}
}

export default SearchBooks;
