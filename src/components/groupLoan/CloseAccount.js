import React, { useEffect, useState } from "react";
import groupLoan from "../../models/groupLoan";
import { Table,Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MESSAGE } from "../../constants/actionTypes";

function CloseAccount(props){
    const [sattlementDetails, setSattlementDetails] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(props);
        getDetails();
    },[]);
    const getDetails=async()=>{
        try {
            let response = await groupLoan.GroupLoanModel.getSattlementAmount(props.loan_account_no);
            console.log(response);
            setSattlementDetails(response.body.message);
        } catch (error) {
            console.log(error)
        }      
    }
    const closeAccount=async()=>{
        try {
            let payload = {...sattlementDetails};
            delete payload.records;
            payload.loan_account_no = props.loan_account_no
            let response = await groupLoan.GroupLoanModel.closeAccount(payload);
            if (response.statusCode == 200) {
                dispatch({ type: MESSAGE, message: response.body.message });
                history.push('/allApplications');

            }
        } catch (error) {
            console.log(error)
        }      
    }

    return (
        <>
        <div className="text-center">
            <Button variant="primary" type="button" onClick={closeAccount}>Close</Button>
        </div>
        <Table size="sm" className="bg-white rounded" striped bordered hover responsive>
            <thead>
                <tr>
                    <th className="text-center">Sattlement Amount<span style={{fontSize:'10px', display:'block'}}>(Total principal + Earned Interest)</span></th>
                    <th className="text-center">Earned Interest <span style={{fontSize:'10px', display:'block'}}>(Paid EMI Interest + next 3 EMI interest)</span></th>
                    <th className="text-center">No. of Paid EMIs</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center">
                        {sattlementDetails.settled_amount}
                    </td>
                    <td className="text-center">
                        {sattlementDetails.earned_interest}
                    </td>
                    <td className="text-center">
                        {sattlementDetails.paid_emi_count}
                    </td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}

export default React.memo(CloseAccount);