import React, { Component } from "react";
import SubjectCard from "./SubjectCard.jsx";
import { collect } from 'react-recollect';
import {
  Row,
  Col,
  FormControl,
  FormGroup,
  ControlLabel,
} from "react-bootstrap";
import Button from "../CustomButton/CustomButton.jsx";
import UserService from "../../services/UserService.jsx"

export class SubjectCRUD extends Component {
  
  getUser = () => {
    return this.props.store.user;
  }

  getBoard = () => {
    return this.props.store.user.boards[this.props.boardKey];
  }
  
  handleOnAddSubject = (subject) => {
    if(subject) {
      const user = this.getUser();
      const board = this.getBoard();
      if(!board.subjectFollowings.some(s => s === subject)){
        UserService.followSubject({
          username: user.username,
          boardname: board.name,
          subject,
          onSuccess: res => {
            board.subjectFollowings = [subject].concat(board.subjectFollowings);
            this.subject.value = "";
          },
        });
      } else {
        this.subject.value = "";
      }
    }  
  }

  handleOnRemoveSubject = (subject) => {
    const user = this.getUser();
    const board = this.getBoard();
    UserService.unfollowSubject({
      username: user.username,
      boardname: board.name,
      subject,
      onSuccess: res => {
        board.subjectFollowings.unshift(subject);
        board.subjectFollowings = board.subjectFollowings.filter(s => s !== subject);
      },
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
                  <ControlLabel>Add hashtag</ControlLabel>
                  <FormControl 
                    inputRef={ref => this.subject = ref}
                    type="text"
                    bsClass="form-control"
                    placeholder="newhashtag"
                    />
              </FormGroup>
            </Col>
            <Col md={1}>
              <Button 
                fill
                bsStyle="primary"
                bsSize="small"
                className="add-btn"
                onClick={() => this.handleOnAddSubject(this.subject.value)}>
                ADD
              </Button>
            </Col>
          </Row>
        </form>
        <div className="subject-container">
          {board.subjectFollowings.map( subject => (
            <SubjectCard
              key={subject}
              data={subject}
              onClick={() => this.handleOnRemoveSubject(subject)}/>
          ))}
          <div className="space-between-fix"></div>
        </div>
      </div>
    );
  }
}

export default collect(SubjectCRUD);
