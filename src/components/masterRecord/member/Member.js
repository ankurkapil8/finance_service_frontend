import React, { useEffect, useState, useMemo } from 'react';
import { Table,Button,Modal,Pagination,ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import memberRecord from '../../../models/memberDetails';
import moment from 'moment';
import {useTable,useSortBy,usePagination,useFilters } from 'react-table'
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { CHANGE_PAGE } from '../../../constants/actionTypes'

function Members(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [isShowLoader, setisShowLoader] = useState(0)
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [deleteID, setDeleteID] = useState(0)
    const [memberRecords,setMemberRecords]=useState([]);
    useEffect(() => {
        setisShowLoader(10);
        getMemberGroup();
        dispatch({ type: CHANGE_PAGE, page: "All Members" });
    },[])
    
    const data = useMemo(
        () => 
        memberRecords.map((record,index)=>
                { 
             return {
                col1:moment(record.enrollment_date).format('DD-MM-yyy hh:ss A'),
                col2:record.member_name,
                col3:record.member_group_id,
                col4:record.mobile_number,
                col5:record
                }
            }
        )
        ,
        [memberRecords]
      )   

    const columns = useMemo(
        () => [
          {
            Header: 'Enrollment Date',
            accessor: 'col1', // accessor is the "key" in the data
            allowFilter:true
          },
          {
            Header: 'Member Name',
            accessor: 'col2',
            allowFilter:true
          },
          {
            Header: 'Member Group Code',
            accessor: 'col3',
            allowFilter:true
            },
          {
            Header: 'Mobile Number',
            accessor: 'col4',
            allowFilter:true
          },
          {
            Header: 'Action',
            accessor: 'col5',
            allowFilter:false
          }

        ],
        []
      )    

    const getMemberGroup = () =>{
        setisShowLoader(30);
        memberRecord.MemberDetailModel.getMemberDetailsData().then(res=>{
            setisShowLoader(90);
            if(res.statusCode == 200){
                setMemberRecords(res.body.message);
            }else{
                setMemberRecords([]);
            }
            setisShowLoader(100);
        })
       
    }
    const deleteHandle=(id)=>{
        setDeleteID(id);        
        setShowDeleteModel(true);
    }
    const deleteMember=async()=>{
        setShowDeleteModel(false);
        let initialData = [...memberRecords];
        setMemberRecords([]);
        try{
            setisShowLoader(30);
            let response = await memberRecord.MemberDetailModel.deleteMember(deleteID);
            setisShowLoader(90);
            if(response.statusCode == 200){
                let UpdatedList = initialData.filter((member,idx)=>member.member_id!=deleteID);
                setMemberRecords(UpdatedList);
             }
             setisShowLoader(100);
        }catch (error) {
                console.log(error.response.body.message);
                setisShowLoader(100);
            }
              
    }
  
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
      <Modal show={showDeleteModel} onHide={()=>setShowDeleteModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowDeleteModel(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>deleteMember()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>        
        {/* <Loader show={isShowLoader}/> */}
        <div class="content">
                <div class="row">
                    <div class="col-md-12">
                <Link to="/addMember">
                <Button variant="info" active>
                <i className="nc-icon nc-simple-add mr-2"></i>
                    Add Member
                </Button>
                </Link>
                {/* </Col>
            </Row>
            <Row>
            <Col> */}
            <div className="text-right">
              {paginate(pageCount)}
            </div>   
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">

            <Table {...getTableProps()} className="table small" >
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
            <tbody {...getTableBodyProps()}>

                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                console.log(cell);
                                if(cell.column.id !="col5"){                                
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                        )
                                    }else{
                                        return (
                                            <td>
                                                <Button size={"sm"} variant="primary"  onClick={()=>{history.push("/viewMemberDetail",cell.value.member_id)}}>View</Button>
                                                {' '}
                                                <Button size={"sm"} variant="success" onClick={()=>{history.push("/addMember",cell.value.member_id)}} >Edit</Button>
                                                {' '}
                                                <Button size={"sm"} variant="danger" onClick={()=>deleteHandle(cell.value.member_id)} >Delete</Button>
                                            </td>
                                        )
                                    }
                            })}
                            </tr>
                        )
                        })}
            </tbody>
        </Table>
        {isShowLoader<100?<div style={{ top: '50%',position:"relative" }}><ProgressBar style={{"position":"relative","width":"30%","left":"40%"}} striped variant="success" now={isShowLoader} label={`${isShowLoader}%`} /></div>:""}
        </div></div></div>
        <div className="text-right">
          {paginate(pageCount)}
        </div>   
        </div>
        </div>
        </div>
        </>
        );
}

export default Members;