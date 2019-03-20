import React, { Component } from "react";
import UserCard from "./UserCard.jsx";
import { collect } from 'react-recollect';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
} from "react-bootstrap";
import AsyncSelect from 'components/CustomSelect/CustomAsyncSelect.jsx';
import Button from "../CustomButton/CustomButton.jsx";
import UserService from "../../services/UserService.jsx"

export class UserCRUD extends Component {
  constructor() {
    super();

    this.state = {
      twitterUser: null
    }
  }

  getUser = () => {
    return this.props.store.user;
  }

  getBoard = () => {
    return this.props.store.user.boards[this.props.boardKey];
  }
  
  handleOnAddUser = () => {
    const twitterUser = this.state.twitterUser;
    if(twitterUser) {
      const user = this.getUser();
      const board = this.getBoard();
      if(!board.userFollowings.some(u => u.username === twitterUser.username)){
        UserService.followUser({
          username: user.username,
          boardname: board.name,
          twitterUser,
          onSuccess: res => {
            board.userFollowings = [twitterUser].concat(board.userFollowings);
            this.setState({twitterUser: null});
          },
        });
      } else {
        this.setState({twitterUser: null});
      }
    }  
  }

  handleOnRemoveUser = (twitterUser) => {
    const user = this.getUser();
    const board = this.getBoard();
    UserService.unfollowUser({
      username: user.username,
      boardname: board.name,
      twitterUsername: twitterUser.username,
      onSuccess: res => {
        board.userFollowings = board.userFollowings.filter(u => u.username !== twitterUser.username);
      },
    });
  }

  handleOnUserSearch = (query, callback) => {
    UserService.searchTwitterUsers({
      query,
      onSuccess: async res => {
        const users = await res.json();
        callback(users);
      }
    });
  }

  render() {
    const board = this.getBoard();
    return (
      <div className="crud">
        <form>
          <Row>
            <Col md={4} xs={11}>
              <FormGroup >
                  <ControlLabel>Add User</ControlLabel>
                  <AsyncSelect
                    loadOptions={this.handleOnUserSearch}
                    value={this.state.twitterUser}
                    onChange={twitterUser => this.setState({twitterUser})}
                    getOptionLabel={twitterUser => 
                      <div>
                        <strong>{twitterUser.name}</strong> @{twitterUser.username}
                      </div>
                    }
                    getOptionValue={twitterUser => twitterUser.username}
                    placeholder="newuser"
                  />
              </FormGroup>
            </Col>
            <Col md={1}>
              <Button 
                fill
                bsStyle="primary"
                bsSize="small"
                className="add-btn"
                onClick={this.handleOnAddUser}>
                ADD
              </Button>
            </Col>
          </Row>
        </form>
        <div className="node-container">
          {board.userFollowings.map( twitterUser => (
            <UserCard
              key={twitterUser.username}
              data={twitterUser}
              onClick={() => this.handleOnRemoveUser(twitterUser)}/>
          ))}
          <div className="space-between-fix"></div>
        </div>
      </div>
    );
  }
}

export default collect(UserCRUD);
