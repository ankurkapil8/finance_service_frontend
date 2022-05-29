import React, { useEffect, useState } from 'react'
import agent from '../../../agent'
import { useHistory } from 'react-router-dom';
import { Table, Nav, Pagination, Button, Modal } from 'react-bootstrap';

function OrderHistory(props) {
    //let active = 0;
    let items = [];

    useEffect(() => {
        if(props.selectedTab=="orders"){
            getOrders()
        }
    }, [props.selectedTab])

    const [orderHistory, setorderHistory] = useState([])
    const [selectedorder, setselectedorder] = useState([]);
    const [totalPage, settotalPage] = useState(0);
    const [isopenpopup, setisopenpopup] = useState(false);
    const [selectedPage,setselectedPage] = useState(0);
    const handleClose = () => setisopenpopup(false);
    for (let number = 0; number <= totalPage; number++) {
        if(totalPage >0){
            items.push(
                <Pagination.Item onClick={() => changePage(number)} key={number} active={number == selectedPage}>
                  {number+1}
                </Pagination.Item>,
              );
        }
      }         
      const paginationBasic = (
        <div>
          <Pagination>{items}</Pagination>
        </div>
      ); 

    const viewOrderPopUp = (record) => {
        setselectedorder(record);
        setisopenpopup(true);
    }
    let history = useHistory();
    const getOrders = (page=0) => {
        props.showLoader(true);
        agent.Order.getOrdersHistoryAdmin(page).then((res => {
            props.showLoader(false);
            console.log(res.body.record)
            setorderHistory(res.body.record);
            let totalRecord = res.body.totalOrders;
            let totalPage = parseInt(res.body.totalOrders)/10;
            console.log("totalPage",totalPage);
            settotalPage(totalPage);
        }), (err) => {
            console.log(err.response.body.message);
            if (err.response.body.message == "jwt must be provided") {
                console.log("login required");
                history.push("/login");
            }
            props.showLoader(false);

        });
    }
    const changePage=(number) =>{
        console.log("page",number);
        setselectedPage(number);
        getOrders(number);
    }
    if (props.selectedTab == "orders") {
        return (
            <>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Details</th>
                            <th>Number</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map((record, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{record.shipping.name}</td>
                                <td>{record.datePlaced}</td>
                                <td>{record.items.map(itm => <span>{itm.item.title} Quantity:{itm.quantity}<br></br></span>)}</td>
                                <td>{record.shipping.phone}</td>

                                <td>
                                    <Button type="button" onClick={() => viewOrderPopUp(record)}>View</Button>
                                </td>
                            </tr>

                        )}
                    </tbody>
                </Table>
                {paginationBasic}
                <Modal show={isopenpopup} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover responsive>
                            <thead><tr><td colSpan="6"><h4>Shipping Details</h4></td></tr></thead>
                            <tbody>
                                <tr>
                                    <td><b>Name:</b> {selectedorder?.shipping?.name}</td>
                                    <td><b>Address:</b> {selectedorder?.shipping?.address}</td>
                                    <td><b>Street:</b> {selectedorder?.shipping?.street}</td>
                                    <td><b>Landmark:</b> {selectedorder?.shipping?.landmark}</td>

                                    <td><b>Phone:</b> {selectedorder?.shipping?.phone}</td>
                                    <td><b>City:</b> {selectedorder?.shipping?.city}</td>

                                </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover responsive>
                            <thead><tr><td colSpan="4"><h4>Products</h4></td></tr></thead>
                            <tbody>{selectedorder?.items?.map(itm => <tr>
                                <td><b>Title:</b> {itm.item.title}</td>
                                <td><b>Description:</b> {itm.item.description}</td>
                                <td><b>Quantity:</b> {itm.quantity}</td>
                                <td><b>Total Price:</b> {parseInt(itm.quantity) * itm.perItemPrice}</td>
                            </tr>)}
                            </tbody>
                        </Table>
                        <Table striped bordered hover responsive>
                            <thead><tr><td colSpan="4"><h4>Payment Details</h4></td></tr></thead>
                            <tbody>
                                <tr>
                                    <td><b>Payment Mode: </b>{selectedorder.paymentMode}</td>
                                    <td><b>Razorpay Order id: </b>{selectedorder.razorpay_order_id}</td>
                                </tr>
                            </tbody>
                        </Table>


                        <Table striped bordered hover responsive>
                            <thead><tr><td colSpan="4"><h4>Bill Details</h4></td></tr></thead>
                            <tbody>
                                {selectedorder.isDiscountApplied ? <tr>
                                    <td>
                                        <b>
                                            Prime Member Discount:
                                </b>
                                    </td>
                                    <td>10%</td>
                                </tr> : ""}
                                <tr>
                                    <td>
                                        <b>Total Bill Amount</b>
                                    </td>
                                    <td>{selectedorder.totalBillAmount}</td>
                                </tr>
                            </tbody>

                        </Table>

                    </Modal.Body>
                </Modal>

            </>
        )

    } else {
        return "";
    }
}

export default OrderHistory
