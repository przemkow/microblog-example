import React from 'react';

function PostCard(props) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{ props.title }</h5>
        <h6 className="card-subtitle mb-2 text-muted">{ props.author }</h6>
        <p className="card-text">
          { props.content }
        </p>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-6 text-center">
            <button className="btn btn-block btn-danger" onClick={props.thumbsDownClick}>
              <i className="far fa-thumbs-down"></i>
              { props.thumbsDown }
            </button>
          </div>
          <div className="col-6 text-center">
            <button className="btn btn-block btn-success" onClick={props.thumbsUpClick}>
            <i className="far fa-thumbs-up"></i>
              { props.thumbsUp }
            </button>
          </div>
        </div>
      </div>
    </div>
);

}

export default PostCard;
