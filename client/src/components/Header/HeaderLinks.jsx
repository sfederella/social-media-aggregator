import React, { Component } from "react";
import { Nav, NavDropdown, MenuItem } from "react-bootstrap";
import AuthService from "services/AuthService";

class HeaderLinks extends Component {
  constructor() {
    super();
    
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    AuthService.doLogout();
  }

  render() {
    const user = this.props.store.user
    return (
      <div>
        <Nav pullRight>
          <NavDropdown
            eventKey={1}
            title={user.imageUrl ? (
              <span>
                <img className="header-profile-image" src={user.imageUrl} alt={user.username}/>
                {user.name}
              </span>
            ) : (
              user.name
            )}
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={1.1} onClick={this.handleLogout}>Log out</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default HeaderLinks;
