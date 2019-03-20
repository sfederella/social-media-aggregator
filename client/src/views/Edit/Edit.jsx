import React, { Component } from "react";
import { 
  Grid,
  Row,
  Col,
  Tab,
  Tabs } from "react-bootstrap";
import Button from "../../components/CustomButton/CustomButton.jsx";
import { collect } from 'react-recollect';
import BoardFormModal from "../../components/BoardFormModal/BoardFormModal.jsx";
import Card from "../../components/Card/Card.jsx";
import UserCRUD from "../../components/UserCRUD/UserCRUD.jsx";
import SubjectCRUD from "../../components/SubjectCRUD/SubjectCRUD.jsx";
import UserService from "../../services/UserService.jsx"

class Edit extends Component {
  constructor() {
    super();

    this.state = {
      activeBoardKey: 0,
      activeListKey: "users",

      showModal: false,
      boardname: "",
      onModalAccept: ()=>{}
    }
  }

  componentDidMount = () => {
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.activeBoardKey !== prevState.activeBoardKey) {
    }
  }

  handleOnSelectBoard = (key) => {
    if (key==="+") {
      this.handleOnNewBoard();
    } else if (key!==this.state.activeBoardKey) {
      this.setState({
        activeBoardKey: key,
      });
    }
  }

  handleOnNewBoard = () => {
    this.setState({
      showModal: true,
      boardname: "",
      onModalAccept: this.handleOnNewBoardAccept
    });
  }
  
  handleOnNewBoardAccept = (boardname) => {
    const user = this.props.store.user;
    UserService.addBoard({
      username: user.username,
      boardname,
      onSuccess: res => {
        user.boards.push({
          name: boardname,
          userFollowings: [],
          subjectFollowings: []
        });
        this.setState({
          showModal: false,
          activeBoardKey: user.boards.length-1,
        });
      },
    });
  }
  
  handleOnEditBoard = () => {
    const user = this.props.store.user;
    this.setState({
      showModal: true,
      boardname: user.boards[this.state.activeBoardKey].name,
      onModalAccept: this.handleOnEditBoardAccept
    });
  }

  handleOnEditBoardAccept = (newBoardname) => {
    const user = this.props.store.user;
    UserService.editBoard({
      username: user.username,
      boardname: user.boards[this.state.activeBoardKey].name,
      newBoardname,
      onSuccess: res => {
        user.boards[this.state.activeBoardKey].name = newBoardname
        this.setState({showModal: false});
      },
    });
  }
  
  handleOnDeleteBoard = () => {
    const user = this.props.store.user;
    UserService.deleteBoard({
      username: user.username,
      boardname: user.boards[this.state.activeBoardKey].name,
      onSuccess: res => {
        user.boards.splice(this.state.activeBoardKey,1);
        var nextActiveBoardKey = this.state.activeBoardKey -1;
        if (nextActiveBoardKey < 0) {
          nextActiveBoardKey = user.boards.length > 0 ? 0 : "+";
        }
        this.setState({
          activeBoardKey: nextActiveBoardKey
        });
      },
    });
  }
  
  handleModalClose = () => this.setState({showModal: false});
  
  handleOnSelectList = (key) => {
    this.setState({
      activeListKey: key,
    });
  }

  render() {
    const {
      activeBoardKey,
      activeListKey,
      showModal,
      boardname,
      onModalAccept
    } = this.state
    const user = this.props.store.user;
    const activeBoard = user.boards[activeBoardKey];

    return (
      <div className="content content-tabs edit">
        <Tabs
          id="tabs-boards"
          className="tabs-container"
          activeKey={activeBoardKey}
          onSelect={this.handleOnSelectBoard}
        >
          {user.boards.map((board,key) => (
            <Tab eventKey={key} key={key} title={board.name.toUpperCase()}></Tab>
          ))}
          <Tab title="+" eventKey="+" ></Tab>
        </Tabs>
        <div className="active-tab">
          <Grid fluid>
            <Row>
              <Col md={12}>
                { !activeBoard ? (
                  <Card
                    title={"Welcome!"}
                    category={
                      <span>
                        Create a new board with the
                        <span className="btn-instruction">+</span>
                        button.
                      </span>
                    }
                  />
                ) : (
                  <Card
                    title={activeBoard.name}
                    category="Follow users and subjects"
                    content={
                      <div>
                        <div className="board-actions">
                          <Button 
                            fill
                            bsStyle="primary"
                            bsSize="small"
                            onClick={this.handleOnEditBoard}>
                            <i className="pe-7s-tools"/>
                          </Button>
                          <Button
                            fill
                            bsStyle="danger"
                            bsSize="small"
                            onClick={this.handleOnDeleteBoard}>
                            <i className="pe-7s-trash"/>
                          </Button>
                        </div>
                        <div className="inner-tabs">
                          <Row>
                            <Tabs
                              id="tabs-lists"
                              activeKey={activeListKey}
                              onSelect={this.handleOnSelectList}
                              >
                              <Tab 
                                eventKey="users" 
                                title={
                                  <span>Users<strong>{activeBoard.userFollowings.length}</strong></span>
                                } >
                                <UserCRUD boardKey={activeBoardKey}/>
                              </Tab>
                              <Tab eventKey="subjects"
                                title={
                                  <span>Hashtags<strong>{activeBoard.subjectFollowings.length}</strong></span>
                                } >
                                <SubjectCRUD boardKey={activeBoardKey}/>
                              </Tab>
                            </Tabs>
                          </Row>
                        </div>
                      </div>
                    }
                  />
                )}
              </Col>
            </Row>
          </Grid>
        </div>
        < BoardFormModal
          boardname={boardname}
          show={showModal}
          onAccept={onModalAccept}
          onClose={this.handleModalClose}
          />
      </div>
    );
  }
}

export default collect(Edit);
