import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic,faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>WAVES</h1>
      <button
        onMouseEnter={() => setLibraryStatus(true)}
        onClick={() => setLibraryStatus(!libraryStatus)}
      >
        {libraryStatus ? "close" : "Library"}
        <FontAwesomeIcon icon={libraryStatus ? faTimesCircle : faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
