import React, { Component} from 'react'
//import ItrPopup from '../finance-Itr/ItrPopup'
import InqueryForm from '../home/InqueryForm'
import {Link} from 'react-router-dom';

  class SectionMenu extends Component {
    isopen = false;
    constructor(props){
      super(props);
      this.state = {
        isopen:false,
        openEnqueryForm:false,
        serviceType:""
      }
    }
    handleITRPopup = () =>{
      this.setState({
        isopen:this.state.isopen?false:true
      })
    }
    handleEnqueryForm = (serviceType = "")=>{
      console.log(serviceType);
      this.setState({
        openEnqueryForm:this.state.openEnqueryForm?false:true,
        serviceType:serviceType
      })

    }
    render() {
        return (
          <>
            <section className="text-center ">
            <div className="container">
              <div className="col-md-12 shadow-sm p-5 service ">
                <div className="row roww">
                  <div className="col-md-2 col-sm-3 col-xs-3 p-2 service-box" onClick={this.handleITRPopup}>
                    <img src={process.env.PUBLIC_URL + '/assets/img/itr.png'} alt=""/>
                    <h5 className="my-4">Fill ITR</h5>
                  </div>
                 
                  <div className="col-md-2 col-sm-3 col-xs-3 p-2 service-box ">
                  <Link to="/CategoryList">
                    <img  src={process.env.PUBLIC_URL + '/assets/img/food.png'} alt=""/>
                    <h5 className="my-4">FOOD</h5></Link>
                  </div>
                  <div className="col-md-2 col-sm-3 col-xs-3 p-2 service-box" onClick={()=>this.handleEnqueryForm("Catering")}>

                    <img src={process.env.PUBLIC_URL + '/assets/img/catering.png'} alt=""/>
                    <h5 className="my-4">Catering</h5>
                  </div>
                  <div className="col-md-2 col-sm-3 col-xs-3 p-2 service-box" onClick={()=>this.handleEnqueryForm("Balance Sheet")}>

                    <img src={process.env.PUBLIC_URL + '/assets/img/finance.png'} alt=""/>
                    <h5 className="my-4">Financial Consultancy</h5>
                  </div>
                  <div className="col-md-2 col-sm-3 col-xs-3 p-2 service-box" onClick={()=>this.handleEnqueryForm("Investment Planning")}>

                    <img src={process.env.PUBLIC_URL + '/assets/img/investment.png'} alt=""/>
                    <h5 className="my-4">Investment Planning</h5>
                  </div>
                  <div className="col-md-2 col-sm-3 col-xs-3 p-2 service-box" onClick={()=>this.handleEnqueryForm("GST filing")}>
                    <img src={process.env.PUBLIC_URL + '/assets/img/gst.png'} alt=""/>
                    <h5 className="my-4">GST Filing </h5>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <ItrPopup isopen={this.state.isopen} hide={this.handleITRPopup}/> */}
          <InqueryForm isopen={this.state.openEnqueryForm} serviceType={this.state.serviceType} hide={this.handleEnqueryForm}/>         
        </>
        )
    }
}
export default SectionMenu
