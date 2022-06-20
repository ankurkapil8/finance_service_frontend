import React from 'react';
import { Table, Card} from 'react-bootstrap';
import {
    CIN,
    licenceNo,
    companyName
  } from "../../constants/constants"

class EmiCardPrint extends React.PureComponent {
    render() {
        //console.log(this.props.emiData());
    return (
        <div style={{margin:"20px"}}>
        <div>
            <p style={{textAlign:"left",float: "left",fontSize:"14px"}}>CIN : {CIN}</p>
            <p style={{textAlign:"right",float: "right",fontSize:"14px"}}>License No. : {licenceNo}</p>
        </div>
        <h3 className="text-center mb-5 mt-3">{companyName}</h3>
        <Card border="primary" header
        key={0}
        text={'dark'}
        className="m-2">
        <Card.Header className=" text-center"><b>{this.props.heading}</b>

        </Card.Header>
        <Card.Body>
        {/* <Loader show={isShowEMILoader} relative={true}/> */}
        <Table size={"sm"} className="bg-white rounded" striped bordered hover >
            <thead>
              <tr>{this.props.column.map((val,id)=>(
                  <th width="30%" key={id}>{val}</th>
              ))}
              </tr>
          </thead>
                <tbody>
                {this.props.emiData()}
                {/* {this.props.emiData.map((value,id)=>(<tr>
                    <td>{value.date}</td>
                    <td>{value.EMI}</td>
                    <td>{value.principal}</td>
                    <td>{value.int_amount}</td>
                    <td>{value.outstanding }</td>
                    <td></td>
                </tr>))} */}
                </tbody>
        </Table>
        {this.props?.isDeclaration?<div style={{marginTop:"50px"}}>
            <p>“I ____________________ , declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.” Please note that there should be no change in this text.</p>
        </div>:null}
        {this.props?.isSign?
        <div style={{bottom:0,textAlign:'right',marginTop:"100px"}}>
        <span>
            <div><label><strong>Borrower Signature:_____________________</strong></label></div>
            <div><label><strong>Co-Borrower Signature:_____________________</strong></label></div>
        </span>
        </div>:null}
        </Card.Body>
    </Card>
    </div>
);

    }
}

export default EmiCardPrint;