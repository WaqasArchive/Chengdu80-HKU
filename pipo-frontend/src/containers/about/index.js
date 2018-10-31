import React from "react";
import {connect} from "react-redux";
import {getNotes, setError} from "../../actions/notes";

class About extends React.Component {
  componentDidMount = () => this.fetchNotes();

  fetchNotes = () => {
  	const {fetchNotes, showError} = this.props;
  	return fetchNotes().catch(err => {
  		console.log(`Error: ${err}`);
  		return showError(err);
  	});
  };

  render = () => {
  	return (
	<div>
	<h1>About Us</h1>
	<p>Hello Medium!</p>
  		</div>
  	);
  };
}

const mapStateToProps = state => ({
	notes: state.notes || {},
});

const mapDispatchToProps = {
	fetchNotes: getNotes,
	showError: setError,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(About);
