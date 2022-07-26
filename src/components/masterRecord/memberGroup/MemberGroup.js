import React, { useEffect, useState } from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import masterRecord from '../../../models/masterRecord';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../../constants/actionTypes'
import { useHistory } from 'react-router-dom';
function MemberGroup(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [isShowLoader, setisShowLoader] = useState(0)
    const [memberGroupRecords, setMemberGroupsRecords] = useState([]);
    useEffect(() => {
        setisShowLoader(10);
        getMemberGroup();
        dispatch({ type: CHANGE_PAGE, page: "All Members Groups" });
    }, [])

    const getMemberGroup = () => {
        setisShowLoader(30);
        masterRecord.MemberGroupModel.getMemberGroups('all').then(res => {
            setisShowLoader(90);
            if (res.statusCode == 200) {
                setMemberGroupsRecords(res.body.message);
            } else {
                setMemberGroupsRecords([]);
            }
            setisShowLoader(100);
        })
    }

    return (
        <>
            <div className="content">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/addMemberGroup">
                            <Button variant="info" active>
                                <i className="nc-icon nc-simple-add mr-2"></i>
                                Member Group
                            </Button>
                        </Link>

                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <Table className="table">

                                        <thead className="bg-primary">
                                            <tr>
                                                <th>Maker/Checker</th>
                                                <th>Village</th>
                                                <th>Group Code</th>
                                                <th>Name</th>
                                                <th>Remark</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {memberGroupRecords.map((group, id) => (<tr>
                                                <td>{group?.user?.id} - {group?.user?.name}</td>
                                                <td>{group?.village?.village_name}</td>
                                                <td>{group.group_code}</td>
                                                <td>{group.group_name}</td>
                                                <td>{group.remark}</td>
                                                <td>
                                                    <Button variant="success" size={"sm"} onClick={() => { history.push("/addMemberGroup", group.group_code) }} >Edit</Button>
                                                </td>

                                                {/* <td>{moment(group.created_at).format("DD-MM-YYYY HH:SS")}</td> */}
                                            </tr>))}
                                        </tbody>
                                    </Table>
                                    {isShowLoader < 100 ? <div style={{ top: '50%', position: "relative" }}><ProgressBar style={{ "position": "relative", "width": "30%", "left": "40%" }} striped variant="success" now={isShowLoader} label={`${isShowLoader}%`} /></div> : ""}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default MemberGroup;