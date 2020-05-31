import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		shelf: PropTypes.string.isRequired,
		updateShelf: PropTypes.func.isRequired
	};

	state = {
		shelf: this.props.shelf,
		book: null
	};

	updateShelf = (e) => {
		this.props.updateShelf(this.props.book, e.target.value);
		this.setState({
			book: this.props.book,
			shelf: e.target.value
		});
	};

	componentDidMount() {
		this.setState({ shelf: this.props.book.shelf });
	}

	render() {
		const { book } = this.props;
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
							}}
						/>
						<div className="book-shelf-changer">
							<select value={this.state.shelf} onChange={this.updateShelf}>
								<option value="move" disabled>
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{book.authors && book.authors.map((name) => name + '\n')}</div>
				</div>
			</li>
		);
	}
}

export default Book;
