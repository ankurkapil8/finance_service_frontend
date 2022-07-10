import React from 'react';
import { Table, Card } from 'react-bootstrap';
import './EmiCardPrint.css'
import {
    CIN,
    licenceNo,
    companyName
} from "../../constants/constants"

class EmiCardPrint extends React.PureComponent {
    render() {
        //console.log(this.props.emiData());
        return (
            <div className='print' style={{ margin: "20px" }}>
                <table className='company-table'>
                    <tbody>
                        <tr class="logo-space">
                            <td style={{ width: '90px', height: '90px' }}><img class="img" src="" style={{ maxWidth: '180px', maxHeight: '120px' }} /></td>
                            <td className='text-center'><span className='company-name'>{companyName.toUpperCase()}</span><br />
                                <span className='gov-line'>भारत सरकार द्वारा पंजीकृत उपक्रम</span><br />
                                <span className='company-span'>SAHARANPUR</span><br />
                                <span className='company-span'> CIN: {CIN} LICENCE No.:{licenceNo}</span>
                            </td>
                            <td style={{ width: '180px', height: '90px' }}>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
                {/* <div>
            <p style={{textAlign:"left",float: "left",fontSize:"14px"}}>CIN : {CIN}</p>
            <p style={{textAlign:"right",float: "right",fontSize:"14px"}}>License No. : {licenceNo}</p>
        </div>
        <h3 className="text-center mb-5 mt-3">{companyName}</h3> */}
                <Card border="primary" header
                    key={0}
                    text={'dark'}
                    className="m-2">
                    <Card.Header className=" text-center"><b>{this.props.heading}</b>

                    </Card.Header>
                    <Card.Body>
                        {/* <Loader show={isShowEMILoader} relative={true}/> */}
                        <Table className='print'>
                            <thead>
                                <tr>{this.props.column.map((val, id) => (
                                    <th width="30%" key={id} >{val}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.emiData()}
                            </tbody>
                        </Table>
                        {this.props?.isDeclaration ? <div style={{ marginTop: "50px" }}>
                            <p>“I ____________________ , declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.” Please note that there should be no change in this text.</p>
                        </div> : null}
                        {this.props?.isSign ?
                            <div style={{ bottom: 0, textAlign: 'right', marginTop: "100px" }}>
                                <span>
                                    <div><label><strong>Borrower Signature:_____________________</strong></label></div>
                                    <div><label><strong>Co-Borrower Signature:_____________________</strong></label></div>
                                </span>
                            </div> : null}
                    </Card.Body>
                </Card>
            </div>
        );

    }
}

export default EmiCardPrint;