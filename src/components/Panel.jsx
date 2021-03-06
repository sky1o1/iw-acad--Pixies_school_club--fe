import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "../css/panel.css";
import { resetUser } from '../actions/message'
import logo from "../images/default-image.png";
import background from "../images/dashboard-background.jpg";


function Panel(props) {
  const history = useHistory();
  const logout = () => {
    props.reset_login()
    history.push("/");
  };

  console.log(props.userInfo.isSuperAdmin)
  console.log(props.userInfo.isStaff)
  console.log(props.userInfo.isMember)

  return (
    <nav id="sidebar" className="pl-0 pr-0 float-left">
      <div className="navbar-brand col-12 pl-0 pr-0 pt-0 pr-0 d-block">
        <div className="img position-relative">
          <img
            src={background}
            alt="Image"
            className="img-fluid-bg w-100 h-50 ml-0"
          />
          <div className="d-flex">
            <img
              src={logo}
              alt=""
              className="img col-8 logo rounded-circle card-img-overlay d-none d-sm-none d-md-block"
            ></img>
            <img
              src={logo}
              alt=""
              className="img-logo img-thumbnail card-img-overlay h-100 w-100 pl-0 ml-0 bg-dark d-block d-sm-block d-md-none"
            ></img>
            <p className="text-uppercase pl-5 text-xl-center text-lg-left text-md-left position-absolute d-none d-sm-none d-md-block">
              {props.userInfo.first_name}{' '}{' '}
              {props.userInfo.last_name}
            </p>
          </div>
        </div>
      </div>

      <div className="navigation">
        <ul className="list-unstyled pl-0 line-height-3">
          <li className=" mr-auto text-center pt-4 pb-2 text-primary d-block d-sm-block d-md-none">
            {props.userInfo.first_name}{' '} {' '}{props.userInfo.last_name}
            <hr />
          </li>

          <li className="active mr-auto text-center text-red pt-5 pb-2">
            <Link to="/"> Go To Homepage</Link>
          </li>

          <li className="nav-item  mr-auto text-center pt-2 pb-2">
            <Link to="/panel/dashboard">Dashboard</Link>
          </li>

          {(props.userInfo.isSuperAdmin && props.userInfo.isStaff)&& 
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/create-club">Create Club</Link>
            </li>
           }

          {props.userInfo.isStaff && !props.userInfo.isSuperAdmin && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/create-events">Post Event</Link>
            </li>
          )}

          {props.userInfo.isStaff && !props.userInfo.isSuperAdmin && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/create-news">Publish News</Link>
            </li>
          )}

          {props.userInfo.isSuperAdmin && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/add-president">Appoint President</Link>
            </li>
          )}

          {(props.userInfo.isStaff && !props.userInfo.isSuperAdmin )&& 
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/add-members">Add Members</Link>
            </li>
          }
          {(props.userInfo.isSuperAdmin || props.userInfo.isStaff  )&& 
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/upload-gallery">Upload Photos</Link>
            </li>
       }

          {!props.userInfo.isStaff &&
            !props.userInfo.isSuperAdmin &&
            !props.userInfo.isMember && 
              <li className="nav-item  mr-auto text-center pt-2 pb-2">
                <Link to="/panel/application">Join a Club</Link>
              </li>
         }

          <li className="nav-item  mr-auto text-center pt-2 pb-2">
            <Link to="/panel/news">News</Link>
          </li>

          <li className="nav-item  mr-auto text-center pt-2 pb-2">
            <Link to="/panel/events">Events</Link>
          </li>

          {!props.userInfo.isSuperAdmin && props.userInfo.isStaff && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/view-application">View Application</Link>
            </li>
          )}

          {(!props.userInfo.isStaff && !props.userInfo.isSuperAdmin ) && 
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/message">Send Message</Link>
            </li>
         }
          {props.userInfo.isSuperAdmin && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/presidents">Presidents</Link>
            </li>
          )}
          {!props.userInfo.isSuperAdmin && props.userInfo.isStaff && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/members">Members</Link>
            </li>
          )}

          {props.userInfo.isStaff && !props.userInfo.isSuperAdmin && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/view-message">View Message</Link>
            </li>
          )}
          {props.userInfo.isSuperAdmin && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/delete-user">Delete User</Link>
            </li>
          )}
          {props.userInfo.isSuperAdmin && (
            <li className="nav-item  mr-auto text-center pt-2 pb-2">
              <Link to="/panel/delete-club">Delete Club</Link>
            </li>
          )}
          <li className="nav-item  mr-auto text-center pt-2 pb-5 w-75 ml-xl-4 ml-lg-4 ml-md-1 ml-sm-0">
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  reset_login: () => dispatch(resetUser())
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Panel));
