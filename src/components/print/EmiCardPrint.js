import React from 'react';
import { Table, Card } from 'react-bootstrap';
import './EmiCardPrint.css'
import {
    CIN,
    licenceNo,
    companyName
} from "../../constants/constants"
import MemberPrint from './MemberPrint';
import CompanyDetailsPrint from './CompanyDetailsPrint';
import MemberKYCPrint from './MemberKYCPrint';

class EmiCardPrint extends React.PureComponent {
    render() {
        //console.log(this.props.emiData());
        return (
            <div className='print' style={{ margin: "20px" }}>
                <CompanyDetailsPrint />
                {this.props?.isMemberRequired &&<>
                <MemberPrint loanDetails={this.props.loanDetails}/>
                <MemberKYCPrint loanDetails={this.props.loanDetails}/></>
                }
                <p><br/>
                    <span className='sub-title'>{this.props.heading}</span></p>
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
            </div>
        );

    }
}

export default EmiCardPrint;