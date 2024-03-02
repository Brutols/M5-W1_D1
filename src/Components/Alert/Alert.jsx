import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

function MyAlert(props) {
    const [welcome, setWelcome] = useState("")

    useEffect(() => {
        setWelcome("Welcome to EpiBooks!")

        props.noTimeOut ? setWelcome(props.text) : setTimeout(() => {
            setWelcome("")
        }, 3000)
    }, [props.noTimeOut, props.text])

  return (
    <>
    {welcome.length > 0 ? (
        <Alert data-testid="alert_component" className="text-center" variant={props.variant}>
        {props.text ? props.text : welcome}
      </Alert>
    ) : "" 
}
        
    </>
  );
}

export default MyAlert;