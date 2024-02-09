import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

function MyAlert(props) {
    const [welcome, setWelcome] = useState("")

    useEffect(() => {
        setWelcome("Welcome to EpiBooks!")

        setTimeout(() => {
            setWelcome("")
        }, 3000)
    }, [])

  return (
    <>
    {welcome.length > 0 ? (
        <Alert variant={props.variant}>
        {props.text ? props.text : welcome}
      </Alert>
    ) : "" 
}
        
    </>
  );
}

export default MyAlert;