import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { collect } from 'react-recollect';

import Header from "components/Header/Header";
/* import Footer from "components/Footer/Footer"; */
import Sidebar from "components/Sidebar/Sidebar";

import { style } from "variables/Variables.jsx";

import dashboardRoutes from "routes/dashboard.jsx";
import UserService from "../../services/UserService";

class Dashboard extends Component {
  constructor(props) {
    if(!props.store.user) {
      props.store.user = {
        username: "",
        name: "",
        boards:[]
      };
      UserService.getCurrentUser({
        onSuccess: async res => {
          const user = await res.json();
          console.log('CurrentUser',user)
          props.store.user = user;
          if (!user.boards.length) {
            props.history.push("/dashboard/edit")
          }
        }
      });
    }

    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    
    this.state = {
      _notificationSystem: null
    };
  }

  handleNotificationClick(level, position) {
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((item, key) => {
              if (item.name === "Notifications")
                return (
                  <Route
                    path={item.path}
                    key={key}
                    render={routeProps => (
                      <item.component
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                  />
                );
              if (item.redirect)
                return <Redirect from={item.path} to={item.to} key={key} />;
              return (
                <Route path={item.path} component={item.component} key={key} />
              );
            })}
          </Switch>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default collect(Dashboard);
