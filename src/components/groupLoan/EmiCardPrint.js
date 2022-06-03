import React from 'react';
import { Table, Card} from 'react-bootstrap';

class EmiCardPrint extends React.PureComponent {
    render() {
        console.log(this.props.emiData());
    return (
        <div>
        <h3 className="text-center mb-5 mt-3">Micro Finance Company</h3>
        <Card border="primary" header
        key={0}
        text={'dark'}
        className="m-2"
    >
        <Card.Header className=" text-center"><b>{this.props.heading}</b>

        </Card.Header>
        <Card.Body>
        {/* <Loader show={isShowEMILoader} relative={true}/> */}
        <Table size={"sm"} className="bg-white rounded" striped bordered hover >
            <thead>
              <tr>{this.props.column.map(val=>(
                  <th key={val}>{val}</th>
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
        </Card.Body>
    </Card>
    </div>
);

    }
}

export default EmiCardPrint;