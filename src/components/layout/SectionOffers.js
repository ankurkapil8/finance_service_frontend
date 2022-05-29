import React, { Component } from 'react'

export default class SectionOffers extends Component {
    render() {
        return (
            <section className="text-center">
                <div className="container">
                    <h4 className="h4-responsive font-weight-bold my-3 text-primary">Best Offers</h4>
                    <div className="row my-5">
                        <div className="col-md-3">
                            <img src={process.env.PUBLIC_URL + '/assets/img/s-1.jpeg'} className="img-fluid radius" alt="" />
                            <h5 className="font-weight-bold my-4 text-primary">Offer 1</h5>
                            <p className="grey-text mb-md-0 mb-5 text-primary">Up to 50% Off
                            </p>
                        </div>
                        <div className="col-md-3">
                            <img src={process.env.PUBLIC_URL + '/assets/img/s-2.jpg'} className="img-fluid radius" alt="" />
                            <h5 className="font-weight-bold my-4 text-primary">offer 2</h5>
                            <p className="grey-text mb-md-0 mb-5 text-primary">Up to 60% off
                  </p>
                        </div>
                        <div className="col-md-3">
                            <img src={process.env.PUBLIC_URL + '/assets/img/s-4.jpeg'} className="img-fluid radius" alt="" />
                            <h5 className="font-weight-bold my-4 text-primary">offer 3</h5>
                            <p className="grey-text mb-0 text-primary">Up to 50% off
                  </p>
                        </div>
                        <div className="col-md-3">
                            <img src={process.env.PUBLIC_URL + '/assets/img/s-3.jpeg'} className="img-fluid radius" alt="" />
                            <h5 className="font-weight-bold my-4 text-primary">Offer 4</h5>
                            <p className="grey-text mb-0 text-primary">Standard EMI Options Available
                  </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
