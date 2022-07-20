import React, { useEffect, useState, useMemo } from 'react';
import { Table, Badge, Container, Row, Col, Button, Pagination,Toast } from 'react-bootstrap';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table'
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_PAGE, MESSAGE } from '../../constants/actionTypes'
function AllApplications(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const {message} = useSelector(state=>state.common);
    const [isShowLoader, setisShowLoader] = useState(false)
    const [loanlist, setLoanlist] = useState([]);
    const auth = useSelector(state => state.auth);
    //const [showToast, setShowToast] = useState({ isShow: true, type: "bg-success", message: "Data Saved successfully" })
    useEffect(() => {
        console.log(message);
        if(message){
            setTimeout(()=>{
                dispatch({ type: MESSAGE, message: undefined });
            },3000);
        }
        getLoanList();
        dispatch({ type: CHANGE_PAGE, page: "All Loan Applications" });
    }, [])
    const data = useMemo(
        () =>

            loanlist.map((record, index) => {
                return {
                    col1: record.loan_account_no ? record.loan_account_no : "N/A",
                    col2: moment(record.application_date).format('DD-MM-yyy hh:ss A'),
                    col3: record.member?.member_name,
                    col4: record?.EMI_payout?.toUpperCase(),
                    col5: record.loan_amount,
                    col6: record.interest_rate,
                    col7: record.actionStatus,
                    col8: record,
                    col9: `${record.user.id} - ${record.user.name}`
                }
            }
            )
        ,
        [loanlist]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Maker/Checker',
                accessor: 'col9', // accessor is the "key" in the data
                allowFilter: true
            },
            {
                Header: 'Account no.',
                accessor: 'col1', // accessor is the "key" in the data
                allowFilter: true
            },
            {
                Header: 'Application date',
                accessor: 'col2', // accessor is the "key" in the data
                allowFilter: true
            },
            {
                Header: 'Member name',
                accessor: 'col3',
                allowFilter: true
            },
            {
                Header: 'EMI Payout',
                accessor: 'col4',
                allowFilter: true
            },
            {
                Header: 'Loan amount',
                accessor: 'col5',
                allowFilter: true
            },
            {
                Header: 'Interest rate',
                accessor: 'col6',
                allowFilter: true
            },
            {
                Header: 'Status',
                accessor: 'col7',
                allowFilter: false
            },
            {
                Header: 'Action',
                accessor: 'col8',
                allowFilter: false
            }

        ],
        []
    )
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length

        return (
            <input
                className="form-control"
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
                placeholder={`Search ${count} records...`}
            />
        )
    }
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const paginate = (totalPage) => {
        let pageNumberArray = [];
        for (let i = 1; i <= totalPage; i++) {
            pageNumberArray.push(i);
        }
        return (
            <Pagination>
                <Pagination.First onClick={() => gotoPage(0)} />
                <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                {pageNumberArray.map(num => <Pagination.Item key={num} active={num === (pageIndex + 1)} onClick={() => gotoPage(num - 1)}>{num}</Pagination.Item>)}
                <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                <Pagination.Last onClick={() => gotoPage(totalPage - 1)} />
            </Pagination>
        );

    }

    const getLoanList = async () => {
        try {
            setisShowLoader(true);
            let response = await groupLoan.GroupLoanModel.getAllLoanApplications();
            setisShowLoader(false);
            if (response.statusCode == 200) {
                let formatedData = response.body.message.map((loan, id) => {
                    if(loan.status==1){
                        loan["actionStatus"] = "Closed";
                    }else if (loan.is_approved == 1 && loan.is_disbursed == 1) {
                        loan["actionStatus"] = "Disbursed";
                    } else if (loan.is_approved == 1 && loan.is_disbursed == 0) {
                        loan["actionStatus"] = "Approved";
                    } else if (loan.is_disbursed == -1) {
                        loan["actionStatus"] = "Disburse Rejected";
                    } else if (loan.is_approved == -1) {
                        loan["actionStatus"] = "Approval Rejected";
                    } else {
                        loan["actionStatus"] = "Pending";
                    }

                    return loan;
                });
                setLoanlist(formatedData);
            }

        } catch (error) {
            setisShowLoader(false);
            console.log(error);
        }
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        page,
        pageCount,
        state: { pageIndex, pageSize },
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,
    } = useTable({ columns, data, defaultColumn, initialState: { pageIndex: 0 } }, useFilters, useSortBy, usePagination)
    return (
        <>
            {message && <Toast key={1} autohide delay={3000}  className={"loader bg-success"} >
                    <Toast.Header>
                        <strong className="me-auto">Success Message</strong>
                    </Toast.Header>
                    <Toast.Body className="Dark">
                        {message}
                    </Toast.Body>
            </Toast>}

            <div className="content">
                <Loader show={isShowLoader} />
                {/* <Container fluid> */}
                <Row>
                    <Col>
                        <div className="text-right">
                            {paginate(pageCount)}
                        </div>

                        <Table  {...getTableProps()} className="shadow-lg p-3 mb-5 bg-white rounded small" striped bordered hover responsive>
                            <thead className="bg-primary">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                            >
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                </span>
                                                <div>{column.allowFilter ? column.render('Filter') : null}</div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody{...getTableBodyProps()}>

                                {page.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                console.log(cell);
                                                if (cell.column.id != "col8" && cell.column.id != "col7") {
                                                    return (
                                                        <td {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                } else if (cell.column.id == "col8") {
                                                    return (
                                                        <td>
                                                            <Button size={"sm"} variant="info" onClick={() => { history.push("/loanApprovalDetails?actionType=view", cell.value.id) }} type="button" className='m-1'>
                                                                View
                                                            </Button>{(auth.role=="checker"||auth.role=="admin") &&
                                                                cell.value.is_disbursed==1 && cell.value.status==0 &&
                                                            
                                                            <Button size={"sm"} variant="danger" onClick={() => { history.push("/loanApprovalDetails?actionType=close", cell.value.id) }} type="button" >
                                                                Close A/C
                                                            </Button>}

                                                        </td>
                                                    )
                                                } else if (cell.column.id == "col7") {
                                                    return (
                                                        <td>
                                                            <Badge className={cell.value == "Approved" || cell.value == "Disbursed" ? "bg-success" : "bg-danger"}>
                                                                {cell.value}
                                                            </Badge>
                                                        </td>)

                                                }
                                            })}
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                        <div className="text-right">
                            {paginate(pageCount)}
                        </div>

                    </Col>
                </Row>

            </div>
        </>
    );
}

export default AllApplications;