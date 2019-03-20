import React, { Component } from "react";
import { 
  Row,
  Col,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl } from "react-bootstrap";
import Button from "../../components/CustomButton/CustomButton.jsx";
export class Tweet extends Component {
  
  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.onAccept(this.name.value)
  }

  render() {
    const {
      boardname,
      show,
      onAccept,
      onClose
    } = this.props

    return (
      <Modal 
        show={!!show} 
        onHide={onClose}>
        {!!show ? (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>{boardname ? "Edit Board" : "New Board"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleOnSubmit}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Name</ControlLabel>
                      <FormControl 
                        inputRef={ref => this.name = ref}
                        type="text"
                        bsClass="form-control"
                        defaultValue = {boardname}
                        placeholder="New Board"
                        />
                    </FormGroup>
                  </Col>
                </Row>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                fill
                bsStyle="primary"
                onClick={() => onAccept(this.name.value)}>
                Aceptar
              </Button>
              <Button 
                fill
                bsStyle="default"
                onClick={onClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </div>
        ) : null}
      </Modal>
    );
  }
}

export default Tweet;
