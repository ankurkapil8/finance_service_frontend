import React, { useEffect, useState, useMemo } from 'react';
import { Table,Badge, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import groupLoan from '../../models/groupLoan';
import Loader from '../layout/Loader';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {useTable,useSortBy,usePagination,useFilters } from 'react-table'

function AllApplications(props) {
    let history = useHistory();
    const [isShowLoader, setisShowLoader] = useState(false)
    const [loanlist,setLoanlist]=useState([]);
    useEffect(() => {
        getLoanList();
    },[])
    const data = useMemo(
        () => 
      
        loanlist.map((record,index)=>
                { 
             return {
                col1:record.loan_account_no?record.loan_account_no:"N/A",
                col2:moment(record.application_date).format('DD-MM-yyy hh:ss A'),
                col3:record.member_name,
                col4:record.scheme_id,
                col5:record.loan_amount,
                col6:record.interest_rate,
                col7:record.actionStatus,
                col8:record
                }
            }
        )
        ,
        [loanlist]
      )   

    const columns = useMemo(
        () => [
            {
                Header: 'Account no.',
                accessor: 'col1', // accessor is the "key" in the data
                allowFilter:true
            },
            {
            Header: 'Application date',
            accessor: 'col2', // accessor is the "key" in the data
            allowFilter:true
          },
          {
            Header: 'Member name',
            accessor: 'col3',
            allowFilter:true
          },
          {
            Header: 'Scheme ID',
            accessor: 'col4',
            allowFilter:true
            },
          {
            Header: 'Loan amount',
            accessor: 'col5',
            allowFilter:true
          },
          {
            Header: 'Interest rate',
            accessor: 'col6',
            allowFilter:true
          },
          {
            Header: 'Status',
            accessor: 'col7',
            allowFilter:false
          },
          {
            Header: 'Action',
            accessor: 'col8',
            allowFilter:false
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
    const paginate = (totalPage)=>{
      let pageNumberArray = [];
      for(let i=1;i<=totalPage;i++){
        pageNumberArray.push(i);
      }
      return(      
      <Pagination>
        <Pagination.First  onClick={() => gotoPage(0)}/>
        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
        {pageNumberArray.map(num=><Pagination.Item key={num} active={num === (pageIndex+1)} onClick={() => gotoPage(num-1)}>{num}</Pagination.Item>)}
        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage}/>
        <Pagination.Last onClick={() => gotoPage(totalPage-1)}/>
        </Pagination>
      );
    
    }

    const getLoanList = async() =>{
        try {
            setisShowLoader(true);
            let response = await groupLoan.GroupLoanModel.getAllLoanApplications();
            setisShowLoader(false);
            if (response.statusCode == 200) {
                let formatedData = response.body.message.map((loan, id)=>{
                    if(loan.is_approved ==1 && loan.is_disbursed==1){
                        loan["actionStatus"]= "Disbursed";
                    }else if(loan.is_approved ==1 && loan.is_disbursed==0){
                        loan["actionStatus"]= "Approved";
                    }else if(loan.is_disbursed==-1){
                        loan["actionStatus"]= "Disburse Rejected";
                    }else if(loan.is_approved==-1){
                        loan["actionStatus"]= "Approval Rejected";
                    }else{
                        loan["actionStatus"]= "Pending";
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
      } = useTable({ columns, data, defaultColumn, initialState: { pageIndex: 0 }},useFilters,useSortBy,usePagination)
    return (
        <>
        <Loader show={isShowLoader}/>
        <Container fluid>
        <h2 className="text-info text-center">All Loan Applications</h2>
            <Row>
            <Col>
            {/* <Table className=" shadow-lg p-3 mb-5 bg-white rounded" striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Application Date</th>
                    <th>Member name</th>
                    <th>Scheme ID</th>
                    <th>Loan Amount</th>
                    <th>Interest rate</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {loanlist.map((loan,id)=>(<tr>
                    <td>{moment(loan.application_date).format("DD-MM-YYYY hh:ss A") }</td>
                    <td>{loan.member_name}</td>
                    <td>{loan.scheme_id}</td>
                    <td>{loan.loan_amount }</td>
                    <td>{loan.interest_rate }</td>
                    <td><Badge className={loan.actionStatus=="Approved" || loan.actionStatus=="Disbursed"?"bg-success":"bg-danger"}>{loan.actionStatus }</Badge></td>
                    <td> <Button size={"sm"} variant="info" onClick={()=>{history.push("/loanApprovalDetails",loan.id)}} type="button" className="ml-2">
                        View
                    </Button></td>
                </tr>))}
            </tbody>
        </Table> */}
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
                            <div>{column.allowFilter? column.render('Filter') : null}</div>
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
                                if(cell.column.id !="col8" && cell.column.id !="col7"){                                
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                        )
                                    }else if(cell.column.id =="col8"){
                                        return (
                                                <td>
                                                <Button size={"sm"} variant="info" onClick={()=>{history.push("/loanApprovalDetails",cell.value.id)}} type="button" className="ml-2">
                                                    View
                                                </Button>
                                                </td>
                                                )
                                    }else if(cell.column.id =="col7"){
                                        return (
                                        <td>
                                            <Badge className={cell.value=="Approved" || cell.value=="Disbursed"?"bg-success":"bg-danger"}>
                                                {cell.value }
                                            </Badge>
                                        </td>                                            )
    
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
        </Container>            
        </>
    );
    }

export default AllApplications;