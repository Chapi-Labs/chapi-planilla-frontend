import React from 'react';

import PropTypes from 'prop-types';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
    <div className="alert alert-danger mb-0" role="alert"> key={i}>
        <p data-test="graphql-error">
          <strong>Error!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }
  if (error.type === 'success') {
    return (
      <div className="btn btn-success btn-block m-b-10">
        <span>
          <strong>Success! </strong>
          {error.message}
        </span>
      </div>
    );
  }
  return (
    <div className="btn btn-outline-danger btn-block m-b-10">
      <span data-test="graphql-error">
        <strong>Error! </strong>
        {error.message.replace("GraphQL error: ", "")}
      </span>
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;