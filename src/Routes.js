import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home'
import Registration from './components/users/Registration'
import Login from './components/users/Login'
import FillItr from './components/finance-Itr/FillItr'
import InnerLayout from './components/layout/InnerLayout'
import CategoryList from './components/food-order/CategoryList'
import MyCart from './components/food-order/MyCart'
import PlaceOrder from './components/food-order/PlaceOrder'
import OrderSuccess from './components/food-order/OrderSuccess'
import AdminHome from './components/Admin/Home';
import CategoryManagement from './components/Admin/CategoryManagement';
import AddCategory from './components/Admin/AddCategory';
import OrderHistory from './components/Admin/orders/OrderHistory';
import UserOrderHistory from './components/users/UserOrderHistory';
import UserAction from './components/users/user-actions/UserAction';
import ProductManagement from './components/Admin/products/ProductManagement';
import AddProduct from './components/Admin/products/AddProduct';
import EditProduct from './components/Admin/products/EditProduct';
import OrderFailed from './components/food-order/OrderFailed';
import FinanceRequests from './components/Admin/finance/FinanceRequests';
import Form16Requests from './components/Admin/finance/Form16Requests';
import InqueryForm from './components/home/InqueryForm';
import MemberGroup from  './components/masterRecord/memberGroup/MemberGroup';
import AddMemberGroup from  './components/masterRecord/memberGroup/AddMemberGroup';
import AddMember from  './components/masterRecord/member/AddMember';
import Member from  './components/masterRecord/member/Member';
import MemberViewDetails from  './components/masterRecord/member/MemberViewDetails';
import Scheme from  './components/groupLoan/Scheme';
import AddScheme from  './components/groupLoan/AddScheme';
import Dashboard from './components/dashboard/Dashboard';
import LoanApplication from  './components/groupLoan/LoanApplication';
import LoanApproval from  './components/groupLoan/LoanApproval';
import DisburseLoan from  './components/groupLoan/DisburseLoan';
import LoanApprovalDetails from  './components/groupLoan/LoanApprovalDetails';
import AllApplications from  './components/groupLoan/AllApplications';
import EmiCalculator from  './components/groupLoan/EmiCalculator';
import DueEmis from './components/emis/DueEmis';

function Routes() {
    const checkLogin=()=>{
        console.log("check login")
    }
    return (
        <BrowserRouter>
            <Switch>
            <InnerLayout exact path="/" component={Dashboard}/>
            <InnerLayout exact path="/memberGroup" component={MemberGroup} />
            <InnerLayout exact path="/addMemberGroup" component={AddMemberGroup} />
            <InnerLayout exact path="/addMember" component={AddMember} />
            <InnerLayout exact path="/addMember" component={AddMember} />
            <InnerLayout exact path="/scheme" component={Scheme} />
            <InnerLayout exact path="/viewMemberDetail" component={MemberViewDetails} />
            <InnerLayout exact path="/addScheme" component={AddScheme} />
            <InnerLayout exact path="/loanApplication" component={LoanApplication} />
            <InnerLayout exact path="/loanApproval" component={LoanApproval} />
            <InnerLayout exact path="/disburseLoan" component={DisburseLoan} />
            <InnerLayout exact path="/loanApprovalDetails" component={LoanApprovalDetails} />
            <InnerLayout exact path="/allApplications" component={AllApplications} />
            <InnerLayout exact path="/emiCalculator" component={EmiCalculator} />
            <InnerLayout exact path="/dueEmis" component={DueEmis} />
                <Route path="/login" component={Login} />
                <InnerLayout path="/registration" component={Registration} />
                <InnerLayout path="/fillItr" component={FillItr} />
                <InnerLayout path="/CategoryList" component={CategoryList} />
                <InnerLayout path="/myCart" component={MyCart} />
                <InnerLayout path="/placeOrder" component={PlaceOrder} />
                <InnerLayout path="/orderSuccess" component={OrderSuccess} />
                <InnerLayout path="/adminHome" component={AdminHome} />
                <InnerLayout path="/categoryManagement" component={CategoryManagement} />
                <InnerLayout path="/addCategory" component={AddCategory} />
                <InnerLayout path="/orderHistory" component={OrderHistory} />
                <InnerLayout path="/userOrderHistory" component={UserOrderHistory} />
                <InnerLayout path="/userAction" component={UserAction} />
                <InnerLayout path="/productManagement" component={ProductManagement} />
                <InnerLayout path="/addProduct" component={AddProduct} />
                <InnerLayout path="/editProduct" component={EditProduct} />
                <InnerLayout path="/orderFailed" component={OrderFailed} />
                <InnerLayout path="/financeRequests" component={FinanceRequests} />
                <InnerLayout path="/form16Requests" component={Form16Requests} />
                <InnerLayout path="/inqueryForm" component={InqueryForm} />
                <InnerLayout path="/member" component={Member} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes
