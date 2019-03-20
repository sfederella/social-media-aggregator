import React, { Component } from 'react'
import { components }  from 'react-select';

class MenuList extends Component {
  getIsFocused = (newOption) => {
    const focusedOption = this.getStateManager().select.state.focusedOption;
    const getOptionValue = this.props.selectProps.getOptionValue;
    return !focusedOption || getOptionValue(focusedOption) === getOptionValue(newOption);
  }

  getStateManager = () => {
    const current = this.props.selectProps.selectRef.current,
             type = this.props.selectProps.type;
    return type === "AsyncSelect" ? current.select : current;
  }

  render() {
    const {
      select,
      state
    } = this.getStateManager()
    
    const createNewOption = this.props.selectProps.onCreateNewOption || (inputValue => ({
      value: inputValue,
      label: inputValue
    }));
    
    const newOption = createNewOption(state.inputValue);

    return (
      <components.MenuList {...this.props}>
        {
          this.props.children.length || !state.inputValue ? (
            this.props.children
          ) : ("")
        }
        {
          state.inputValue ? (
            <div 
              ref={this.createNew}
              className={`react-select__option ${this.getIsFocused(newOption) ? "react-select__option--is-focused" : ""}`}
              onMouseOver={() => {
                select.setState({focusedOption: newOption});
              }}
              onClick={() => {
                this.props.selectOption(newOption);
              }}>
              Create New: "{state.inputValue}"
            </div>
          ) : ("")
        }
      </components.MenuList>
    );
  }
};

export default MenuList;