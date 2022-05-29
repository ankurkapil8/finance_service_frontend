import React, { useEffect, useState,useMemo } from 'react'
import agent from '../../../agent'
import { useHistory } from 'react-router-dom';
import { Table, Nav, Pagination, Button, Modal } from 'react-bootstrap';
import {useTable,useSortBy,usePagination} from 'react-table'

function FinanceRequests(props) {
    const [ITRrequests, setITRrequests] = useState([])
    const [isopenpopup, setisopenpopup] = useState(false);
    const [selectedorder, setselectedorder] = useState([]);

    const handleClose = () => setisopenpopup(false);

    useEffect(() => {
        if(props.selectedTab=="finance"){
            getITRrequests()
        }
    }, [props.selectedTab])

    const getITRrequests = () => {
        props.showLoader(true);
        agent.Finance.getAdminItr().then((res => {
            props.showLoader(false);
            console.log(res.body.record);
            setITRrequests(res.body.record);
        }), (err) => {
            // if (err.response.body.message == "jwt must be provided") {
            //     console.log("login required");
            //     history.push("/login");
            // }
            props.showLoader(false);

        });
    }
    const columns = useMemo(
        () => [
          {
            Header: '#',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'FirstName',
            accessor: 'col2',
          },
          {
            Header: 'LastName',
            accessor: 'col3',
          },
          {
            Header: 'Phone',
            accessor: 'col4',
          },
          {
            Header: 'Email',
            accessor: 'col5',
          },
          // {
          //   Header: 'Address',
          //   accessor: 'col6',
          // },
          // {
          //   Header: 'Aadhar',
          //   accessor: 'col7',
          // },
          // {
          //   Header: 'Business',
          //   accessor: 'col8',
          // },
          // {
          //   Header: 'Zip',
          //   accessor: 'col9',
          // },
          // {
          //   Header: 'Service',
          //   accessor: 'col10',
          // },
          {
            Header:'Action',
            accessor: 'col6'
          }
        ],
        []
    )    
    const data = useMemo(
        () => 
        ITRrequests.map((record,index)=>
                { return {col1:index+1,
                col2:record.firstName,
                col3:record.lastName,
                col4:record.phone,
                col5:record.email,
                col6:record
                // col6:record.address,
                // col7:record.aadhar,
                // col8:record.business,
                // col9:record.zip,
                // col10:record.service
                }
            }
        )
        ,
        [ITRrequests]
      )  
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        page,
        state: { pageIndex, pageSize },
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,        
      } = useTable({ columns, data ,initialState: { pageIndex: 0 }},useSortBy,usePagination)
    const viewOrderPopUp = (record) => {
        setselectedorder(record);
        setisopenpopup(true);
    }

    if (props.selectedTab == "finance") {
    return (
        <>
        <Table {...getTableProps()} responsive>
        <thead>
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

                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {page.map(row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                                if(cell.column.id =="col6"){
                                  return(
                                  <td>
                                    <Button type="button" onClick={() => viewOrderPopUp(cell.value)}>View</Button>
                                    </td>
                                  )
                              } else{
                                return (
                                  <td {...cell.getCellProps()}>
                                      {cell.render('Cell')}
                                  </td>
                                  )
          
                              }                               

                })}
                </tr>
            )
            })}
        </tbody>
    </Table>
                <div>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous Page
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next Page
                </button>
                <div>
                    Page{' '}
                    <em>
                    {pageIndex + 1} of {pageOptions.length}
                    </em>
                </div>
                </div> 
                <Modal show={isopenpopup} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover responsive>
                            <tbody>
                                <tr>
                                    <td><b>First Name: </b></td>
                                    <td>{selectedorder.firstName}</td>
                                </tr>
                                <tr>
                                    <td><b>Last Name: </b></td>
                                    <td>{selectedorder.lastName}</td>
                                </tr>
                                <tr>
                                    <td><b>Phone: </b></td>
                                    <td>{selectedorder.phone}</td>
                                </tr>
                                <tr>
                                    <td><b>Email: </b></td>
                                    <td>{selectedorder.email}</td>
                                </tr>
                                <tr>
                                    <td><b>Address: </b></td>
                                    <td>{selectedorder.address}</td>
                                </tr>
                                <tr>
                                    <td><b>Aadhar: </b></td>
                                    <td>{selectedorder.aadhar}</td>
                                </tr>
                                <tr>
                                    <td><b>Business: </b></td>
                                    <td>{selectedorder.business}</td>
                                </tr>
                                <tr>
                                    <td><b>Zip: </b></td>
                                    <td>{selectedorder.zip}</td>
                                </tr>
                                <tr>
                                    <td><b>Service: </b></td>
                                    <td>{selectedorder.service}</td>
                                </tr>
                                <tr>
                                    <td><b>Razorpay order id: </b></td>
                                    <td>{selectedorder.razorpay_order_id}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>

                </>    
                                                       

)
    }else{
        return "";
    }
}

export default FinanceRequests
