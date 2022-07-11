import React, { useEffect, useState } from 'react'
import agent from '../../agent'
import Loader from '../layout/Loader';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE } from '../../constants/actionTypes'
import DashboardModel from '../../models/dashboard'
import processingFee from '../../models/processingFee';
import expenseRecord from '../../models/expenseRecord';
import groupLoan from '../../models/groupLoan';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend);
//var demo;
export default function Dashboard() {
  const dispatch = useDispatch();
  const [paidAmount, setPaidAmount] = useState({});
  const [receivedAmount, setReceivedAmount] = useState({});
  const [processingFeeReport, setProcessingFeeReport] = useState({});
  const [countActiveInactive, setCountActiveInactive] = useState({});
  const [expenseReport, setExpenseReport] = useState({});
  const [allEmis, setAllEmis] = useState({});
  const [isShowLoader, setisShowLoader] = useState(false);
  useEffect(() => {
    dispatch({ type: CHANGE_PAGE, page: "Dashboard" });
    getReport();
  }, [])
  const getReport = async () => {
    try {
      setisShowLoader(true);
      let data = await Promise.allSettled([
        DashboardModel.paidAmount(),
        DashboardModel.receivedAmount(),
        DashboardModel.countActiveInactive(),
        processingFee.ProcessingFeeModel.getProcessingFee('all'),
        expenseRecord.ExpenseModel.getExpense('all'),
        groupLoan.EmiModel.getAllEmis()]);
      setisShowLoader(false);
      setPaidAmount(data[0].value?.body?.message)
      setReceivedAmount(data[1].value?.body?.message)
      setCountActiveInactive(data[2].value?.body?.message)
      setAllEmis(data[5].value?.body)
      let totalProcessing = 0;
      data[3].value?.body?.message?.forEach(
        val=>totalProcessing += val.amount
        );
      setProcessingFeeReport({total:totalProcessing,fee:data[3].value?.body?.message})

      let totalExpense = 0;
      data[4].value?.body?.message?.forEach(
        val=>totalExpense += val.amount
        );

      
      setExpenseReport({total:totalExpense,expense:data[4].value?.body?.message})

    } catch (error) {
      setisShowLoader(false);
      console.log(error);
    }
  }
  const data = {
    labels: [`Paid - ${allEmis?.paidCount}`,`Unpaid - ${allEmis?.notPaidCount}`],
    datasets: [
      {
        label: '# of Votes',
        data: [allEmis?.paidCount, allEmis?.notPaidCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <>
      <Loader show={isShowLoader} />
      <div className="content">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Paid</p>
                      <p className="card-title">{paidAmount?.total}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <hr />
                <div className="stats">
                  <Link to="/paidDetailView">
                    <i className="nc-icon nc-bullet-list-67"></i>
                    Detail View
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Received</p>
                      <p className="card-title">{receivedAmount?.total?.toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <hr />
                <div className="stats">
                  <Link to="/recieveDetailView">
                    <i className="nc-icon nc-bullet-list-67"></i>
                    Detail View
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Main Ledger</p>
                      <p className="card-title">{(receivedAmount?.total+processingFeeReport?.total)-(paidAmount?.total+expenseReport?.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <hr />
                <div className="stats">
                  <Link to="/outstandingDetailView">
                    <i className="nc-icon nc-bullet-list-67"></i>
                    Detail View
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='row justify-content-center'>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Active Borrowers</p>
                      <p className="card-title">{countActiveInactive?.active_accounts}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card-footer ">
              <hr/>
              <div className="stats">
                <i className="fa fa-clock-o"></i>
                In the last hour
              </div>
            </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Inactive Borrowers</p>
                      <p className="card-title">{countActiveInactive?.inactive_accounts}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card-footer ">
              <hr/>
              <div className="stats">
                <i className="fa fa-refresh"></i>
                Update now
              </div>
            </div> */}
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header ">
              <h5 className="card-title">Paid/Unpaid EMIs</h5>
              <p className="card-category">
                <span><b>Total Paid:</b> {allEmis?.paidAmount}</span><br/>
                <span><b>Total Unpaid:</b> {allEmis?.unPaidAmount}</span>
                </p>
            </div>
            <div className="card-body ">
              {/* <canvas id="chartHours" width="400" height="100"></canvas> */}
              <Pie
              width={null}
              height={null}
                data={data}
                options={{
                  maintainAspectRatio: false// this would be a 1:1 aspect ratio
                }}
              />
            </div>
            <div className="card-footer ">
              <hr/>
              <div className="stats">
                
                {/* <i className="fa fa-history"></i> Updated 3 minutes ago */}
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* <div className="row">
        <div className="col-md-4">
          <div className="card ">
            <div className="card-header ">
              <h5 className="card-title">Email Statistics</h5>
              <p className="card-category">Last Campaign Performance</p>
            </div>
            <div className="card-body ">
              <canvas id="chartEmail"></canvas>
            </div>
            <div className="card-footer ">
              <div className="legend">
                <i className="fa fa-circle text-primary"></i> Opened
                <i className="fa fa-circle text-warning"></i> Read
                <i className="fa fa-circle text-danger"></i> Deleted
                <i className="fa fa-circle text-gray"></i> Unopened
              </div>
              <hr/>
              <div className="stats">
                <i className="fa fa-calendar"></i> Number of emails sent
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card card-chart">
            <div className="card-header">
              <h5 className="card-title">NASDAQ: AAPL</h5>
              <p className="card-category">Line Chart with Points</p>
            </div>
            <div className="card-body">
              <canvas id="speedChart" width="400" height="100"></canvas>
            </div>
            <div className="card-footer">
              <div className="chart-legend">
                <i className="fa fa-circle text-info"></i> Tesla Model S
                <i className="fa fa-circle text-warning"></i> BMW 5 Series
              </div>
              <hr />
              <div className="card-stats">
                <i className="fa fa-check"></i> Data information certified
              </div>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  )
}
