import React from "react";
import "../../style/profile.css"
import Activates_parent from "./UserActivaed _product_Parent";
import SetorderAddress from "../order/setorderaddress";
export default  class Profile extends React.Component
{
    constructor(props) {
        super(props);
        // console.log(props)
    }

//

    render() {
        return<>
            <div className="userprofilecontainer">
                <h1 className="userprofilehead">My Profile</h1>

                <span className="namecontainer">
        <div className="firstnamecontainer">
          <label className="detaillabel" htmlFor="name">First Name</label>
          <input
              type="text"
              readOnly="readonly"
              id="Name"
              className="detailinput"
              value={this.props.Gstate.First_name}
          />
        </div>
        <div className="lastnamecontainer">
          <label className="detaillabel" htmlFor="name">Last Name</label>
          <input
              type="text"
              readOnly="readonly"
              id="Name"
              className="detailinput"
              value={this.props.Gstate.Last_name}
          />
        </div>
      </span>
                <div className="emailcontainer">
                    <label className="detaillabel" htmlFor="email">Email Id</label>
                    <input
                        type="email"
                        readOnly="readonly"
                        id="email"
                        className="detailinput"
                        value={this.props.Gstate.email}
                    />
                </div>
                <div className="phonecontainer">
                    <label className="detaillabel" htmlFor="phone">Phone No.</label>
                    <input
                        type="text"
                        readOnly="readonly"
                        id="phone"
                        className="detailinput"
                        value={this.props.Gstate.phone_number}
                    />
                </div>
                <button className="activateproduct" onClick={ev=>{
                    window.location.href="/oupu/product/activate/"
                }}>
                    Activate Product
                </button>
                {this.props.Gstate.is_coreTeam &&
                <button className="activateproduct" onClick={ev=>{
                    window.location.href="/orderAdmin/"
                }}>
                    Admin Panel
                </button>
                }

                <Activates_parent Gstate={this.props.Gstate} SGstate={this.props.SGstate} />

            </div>


        </>
    }
}
