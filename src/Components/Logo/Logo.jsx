import classes from "./logo.module.css"
import logo from "./assets/logo.png"

const Logo = (props) => {
    return (
        <img className={classes[props.className]} src={logo} alt="logo" />
    )
}

export default Logo;