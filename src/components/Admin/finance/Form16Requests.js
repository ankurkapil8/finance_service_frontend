import React, { useEffect, useState,useMemo } from 'react'
import agent from '../../../agent'
import { useHistory } from 'react-router-dom';
import { Table, Nav, Pagination, Button, Modal } from 'react-bootstrap';
import {useTable,useSortBy,usePagination} from 'react-table'
import {Link} from 'react-router-dom';

function Form16Requests(props) {
    const [form16requests, setform16requests] = useState([])
    useEffect(() => {
        if(props.selectedTab=="form16"){
            getForm16requests()
        }
    }, [props.selectedTab])

    const getForm16requests = () => {
        props.showLoader(true);
        agent.Finance.getAdminForm16().then((res => {
            props.showLoader(false);
            console.log(res.body.record);
            setform16requests(res.body.record);
        }), (err) => {
            props.showLoader(false);

        });
    }
    const downloadForm16=(filepath="")=>{
        console.log(filepath);
        let filePathArr = filepath.split("/");
        let fileName = filePathArr[filePathArr.length -1];
        console.log(fileName);
        agent.Finance.downloadForm16({fileName:fileName}).then(res => {
            console.log(res);

        });
    }
    const columns = useMemo(
        () => [
          {
            Header: '#',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Phone',
            accessor: 'col2',
          },
          {
            Header: 'Form16',
            accessor: 'col3',
          },
          {
            Header: 'Razorpay Order Id',
            accessor: 'col4',
          }


        ],
        []
    )    
    const data = useMemo(
        () => 
        form16requests.map((record,index)=>
                { 
                    let filePathArr = record.filePath.split("/");
                    let fileName = filePathArr[filePathArr.length -1];
                return {col1:index+1,
                col2:record.phone,
                col3:fileName,
                col4:record.razorpay_order_id,
                }
            }
        )
        ,
        [form16requests]
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

    if(props.selectedTab == "form16"){
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
                                if(cell.column.id =="col3"){
                                    return(<td>
                                        {/* <a target={"_blank"}  href = "http://localhost:3000/api/download?fileName=16057165121892019-08-30-12-14-11-448_1567147451448_XXXPK9512X_Acknowledgement.pdf">Download</a> */}
                                        <Link className="btn btn-danger" target={"_blank"} to={`/api/download?fileName=${cell.value}`}>Download</Link>
                                        {/* <Button type="button" onClick={()=>downloadForm16(cell.value)} variant="danger"> Download</Button>  */}
                                         </td>)
                                }else{
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
                    </>                                           
    
            )
        }else{
        return "";
    }
}

export default Form16Requests
