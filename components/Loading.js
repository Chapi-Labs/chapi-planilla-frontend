import PropTypes from "prop-types";

const Loading = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="row justify-content-center">
      <div className="col-2 mb-2">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  loading: false
};

Loading.propTypes = {
  loading: PropTypes.bool
};

export default Loading;
