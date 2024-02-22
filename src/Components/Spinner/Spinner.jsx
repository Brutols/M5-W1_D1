import Spinner from 'react-bootstrap/Spinner';
import styles from "./spinner.module.css"

function SpinnerLoader(props) {
  return (
    <div className={props.normal ? "" : styles.spinnerLoader_home}>
    <Spinner animation="border" size="lg" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}

export default SpinnerLoader;