import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends React.Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelfTitle: PropTypes.string.isRequired
	};
	getBookList = () => {
		const bookList = this.props.books.map((book) => {
			return <Book key={book.id} book={book} shelf={book.shelf} updateShelf={this.props.updateShelf} />;
		});

		return bookList;
	};
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">{this.getBookList()}</ol>
				</div>
			</div>
		);
	}
}

export default BookShelf;
