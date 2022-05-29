import React from 'react'
import { Spinner } from 'react-bootstrap';

function Loader(props) {
    if(props.show){
        return (
            <Spinner animation="border" role="status" className={props?.relative?"loader-relative":"loader"}>
            </Spinner>
        )
    }else{
        return null
    }
}

export default Loader
