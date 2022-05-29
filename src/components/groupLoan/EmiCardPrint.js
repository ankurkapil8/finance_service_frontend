import React from 'react';
import { Table, Card} from 'react-bootstrap';

class EmiCardPrint extends React.PureComponent {
    render() {
    return (
        <div>
        <h3 className="text-center mb-5 mt-3">AA2 MutualHelp Micro Finance</h3>
        <Card border="primary" header
        key={0}
        text={'dark'}
        className="m-2"
    >
        <Card.Header className="bg-primary text-center"><b>EMI Details</b>

        </Card.Header>
        <Card.Body>
        {/* <Loader show={isShowEMILoader} relative={true}/> */}
        <Table size={"sm"} className="bg-white rounded" striped bordered hover responsive>
            <thead>
              <tr>
                  <th>EMI date</th>
                  <th>EMI Amount</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Outstanding</th>
                  <th>Signature</th>
              </tr>
          </thead>
                <tbody>
                {this.props.emiData.map((value,id)=>(<tr>
                    <td>{value.date}</td>
                    <td>{value.EMI}</td>
                    <td>{value.principal}</td>
                    <td>{value.int_amount}</td>
                    <td>{value.outstanding }</td>
                    <td></td>
                </tr>))}
                </tbody>
        </Table>
        </Card.Body>
    </Card>
    </div>
);

    }
}

export default EmiCardPrint;