import React from 'react';
import { Table, Card} from 'react-bootstrap';

function EmiCard(props) {
    console.log("emi card");
    return (
        <Card border="primary" header
        key={0}
        text={'dark'}
        className="m-2"
    >
        <Card.Header className="bg-primary text-center"><b>EMI Details</b>
            <svg onClick={props.handlePrintEMI} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-printer float-right cursar" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
            </svg>
        </Card.Header>
        <Card.Body>
        {/* <Loader show={isShowEMILoader} relative={true}/> */}
        <Table size={"sm"} className="bg-white rounded small" bordered responsive>
            <thead>
              <tr className="bg-success">
                  <th>EMI date</th>
                  <th>EMI Amount</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Outstanding</th>
                  {props.showDisburseButton?<th>EMI Paid</th>:""}
                  
              </tr>
          </thead>
                <tbody>
                {props.emiData.map((value,id)=>(<tr className={props.paidEmiRecord[value.date]?"bg-warning":""}>
                    <td>{value.date}</td>
                    <td>{value.EMI}</td>
                    <td>{value.principal}</td>
                    <td>{value.int_amount}</td>
                    <td>{value.outstanding }</td>
                    {props.showDisburseButton?
                    <td>{props.paidEmiRecord[value.date]?
                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>:""}</td>:""}
                </tr>))}
                </tbody>
        </Table>
        </Card.Body>
    </Card>
);
}

export default  React.memo(EmiCard);