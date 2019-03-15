import React, { Component } from 'react';

class PostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.formSubmit(this.state);
  }

  handleTitleChange(text) {
    this.setState({ title: text })
  }

  handleContentChange(text){
    this.setState({ content: text })
  }

  render() {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                onChange={(event) => this.handleTitleChange(event.target.value)}
                className="form-control"
                id="title"
                required/>
            </div>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                className="form-control"
                onChange={(event) => this.handleContentChange(event.target.value)}
                id="content"
                rows="3"
                required>
              </textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Add new post
            </button>
          </form>
        </div>
      </div>
    );
  }

}

export default PostForm;
