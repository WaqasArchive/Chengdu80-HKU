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
    const {notes} = this.props;
    let notesList;
    if (notes) {
      if (notes.objects) {
        notesList = notes.objects.map((item, id) => <p key={id}>{item.body}</p>);
      }
    }
    return (
      <div>
        <h1>About</h1>
        <p>Personal IPO Platform</p>
        {notesList}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  notes: state.notes.notes || {},
});

const mapDispatchToProps = {
  fetchNotes: getNotes,
  showError: setError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
