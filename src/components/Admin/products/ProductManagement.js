import React,{useState,useEffect, useMemo} from 'react'
import { Table, Nav, Pagination, Button, Modal, Image } from 'react-bootstrap';
import agent from '../../../agent'
import {Link} from 'react-router-dom';
import {useDispatch } from "react-redux";
import {useTable,useSortBy,usePagination} from 'react-table'

import {
    STORE_EDIT_PRODUCT
} from '../../../constants/actionTypes';

function ProductManagement(props) {
    
    useEffect(() => {
        if(props.selectedTab=="products"){
            getProducts()
        }
    },[props.selectedTab])

    const [state, setstate] = useState([]) 
    const [show, setShow] = useState(false);
    const [alert, setalert] = useState({heading:"",message:"",data:{}});
    const dispatch = useDispatch()
    
    const getProducts =()=>{
        props.showLoader(true);
        agent.Order.getProducts().then((res=>{
            props.showLoader(false);

            if(res.statusCode == 200){
                setstate(res.body.record);
            }else{
                setstate([]);
            }
        }));
    }
    const handleClose = (action) => {
        if(action=="yes"){
            props.showLoader(true);
            agent.Order.deleteProduct(alert.data.title).then((res=>{
                props.showLoader(false);
                if(res.statusCode == 200){
                    getProducts()
                }else{
                }
            }));
    
        }
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const deleteProduct = (data)=>{
        console.log(data);
        setalert({
            heading:`Delete Product: ${data.title}`,
            message:`Are you sure you want to delete Product: ${data.title}`,
            data:data
        })
        handleShow();    
    }
    const editProduct = (data)=>{
        dispatch({type:STORE_EDIT_PRODUCT,data})
        props.changeTab("editProduct")
    }
    const columns = useMemo(
        () => [
          {
            Header: '#',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Image',
            accessor: 'col2',
          },
          {
            Header: 'Title',
            accessor: 'col3',
          },
          {
            Header: 'Description',
            accessor: 'col4',
          },
          {
            Header: 'Price',
            accessor: 'col5',
          },
          {
            Header: 'Category',
            accessor: 'col6',
          },
          {
            Header: 'Action',
            accessor: 'col7',
          },

        ],
        []
    )    

    const data = useMemo(
        () => 
            state.map((record,index)=>
                { return {col1:index+1,
                col2:record.imageUrl,
                col3:record.title,
                col4:record.description,
                col5:record.price,
                col6:record.category,
                col7:record
                }
            }
        )
        ,
        [state]
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

    if(props.selectedTab == "products"){
        return (
            <>
                <Button type="button" onClick={()=>props.changeTab("addProduct")} variant="danger">Add Product</Button>
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
                                console.log(cell);
                                if(cell.column.id =="col2"){
                                    return(<td>{cell.value !=""?<Image src={cell.value} className="product-image" thumbnail />:"No Image"}</td>)
                                }                                
                                if(cell.column.id !="col7"){
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                        )
        
                                }else{
                                    return (
                                        <td>
                                        <span onClick={()=>deleteProduct(cell.value)}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </span>
                                        <span className="ml-2" onClick={()=>editProduct(cell.value)}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </span>
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
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{alert.heading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{alert.message}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>handleClose("yes")}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={()=>handleClose("no")}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>               
            </>)
    
    }else{
        return "";
    }
}

export default ProductManagement
