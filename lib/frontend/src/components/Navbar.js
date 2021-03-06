// import assets
import menuIcon1 from "../assets/menuIcon1.jpg";
import menuIcon2 from "../assets/menuIcon2.jpg";
import menuIcon3 from "../assets/menuIcon3.jpg";
import menuIcon4 from "../assets/menuIcon4.jpg";
import menuIcon5 from "../assets/menuIcon5.jpg";
import menuIcon6 from "../assets/menuIcon6.jpg";
import logo from "../assets/logo.png";

// configure logos
function Logo(props) {
  if (props.onClick) {
    return (
      <div
        className={props.className ? props.className : "logos"}
        onClick={props.onClick}
      >
        <img
          className="logos"
          src={props.icone}
          width="50px"
          height="50px"
          alt={props.alternative}
        />
      </div>
    );
  }
  // what we will see on the navigation bar of the user page
  return (
    <div
      className={props.className ? props.className : "logos"}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <img
        className="logos"
        src={props.icone}
        width="50px"
        height="50px"
        alt={props.alternative}
      />
    </div>
  );
}

// display logos
export default function Navbar({ setAdmin }) {
  return (
    <div className="navbar">
      <Logo className="metaLogo" icone={logo} alternative="logo" />
      {/* this logo is clickable to go to the admin page */}
      <Logo icone={menuIcon1} alternative="dashboard icon" onClick={setAdmin} />
      <Logo icone={menuIcon2} alternative="calendar icon" />
      <Logo icone={menuIcon3} alternative="chat icon" />
      <Logo icone={menuIcon4} alternative="stats icon" />
      <Logo icone={menuIcon5} alternative="settings icon" />
      <Logo icone={menuIcon6} alternative="log out icon" />
    </div>
  );
}
