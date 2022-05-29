import React,{useState,useEffect, useMemo} from 'react'
import { Table, Nav, Button, Modal } from 'react-bootstrap';
import agent from '../../agent'
import {Link} from 'react-router-dom';
import {useTable,useSortBy,usePagination} from 'react-table'
function CategoryManagement(props) {
      const initialState = {
          categoryList:[]
      }
      const [state, setstate] = useState([]) 
      const [show, setShow] = useState(false);
      const [alert, setalert] = useState({heading:"",message:"",data:{}});
        const handleClose = (action) => {
            if(action=="yes"){
                props.showLoader(true);
                agent.Order.deleteCategory(alert.data.name).then((res=>{
                    props.showLoader(false);
                    console.log(res);
                    if(res.statusCode == 200){
                        getCategories()
                    }else{
                    }
                }));
        
            }
            setShow(false)
        };
      const handleShow = () => setShow(true);
    
      useEffect(() => {
        if(props.selectedTab=="categories"){
            getCategories()
        }
    },[props.selectedTab])

    const getCategories =()=>{
        console.log("category run")
        props.showLoader(true);
        agent.Order.getCategoryAdmin().then((res=>{
            props.showLoader(false);
            if(res.statusCode == 200){
                setstate(res.body.record);
            }else{
                setstate([]);
            }
        }));
    }
    const deleteCategory = (data)=>{
        console.log(data);
        setalert({
            heading:`Delete Category: ${data.name}`,
            message:`Are you sure you want to delete category: ${data.name}`,
            data:data
        })
        handleShow();    
    }
    const data = useMemo(
        () => 
            state.map((record,index)=>
                { return {col1:index+1,
                col2:record.name,
                col3:record
                }
            }
        )
        ,
        [state]
      )   
      const columns = useMemo(
        () => [
          {
            Header: '#',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Name',
            accessor: 'col2',
          },
          {
            Header: 'Action',
            accessor: 'col3',
          },

        ],
        []
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
    if(props.selectedTab == "categories"){
        return (
            <>
                <Button type="button" onClick={()=>props.changeTab("addCategory")} variant="danger">Add Category</Button>
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
                                if(cell.column.id !="col3"){
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                        )
        
                                }else{
                                    return (
                                        <td>
                                        <span onClick={()=>deleteCategory(cell.value)}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
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

export default CategoryManagement
