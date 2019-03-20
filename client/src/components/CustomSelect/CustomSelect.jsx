import React, { Component } from 'react'
import Select from 'react-select';
import MenuList from './MenuList';

class CustomSelect extends Component {
  constructor() {
    super();
    this.selectRef = React.createRef();
  }

  handleOnkeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        const select = this.selectRef.current.select;
        if (select.props.menuIsOpen) {
          select.selectOption(
            select.state.focusedOption || 
            this.props.onCreateNewOption(select.props.inputValue)
          );
        } else {
          select.focusOption('first');
        }
        event.defaultPrevented = true;
        break;
      default:
        return;
    }
  };

  render() {
    const {
      isCreatable,
      components,
      ...rest
    } = this.props;

    return (
      <Select
        ref={this.selectRef}
        selectRef={this.selectRef}
        className="react-select"
        classNamePrefix="react-select"
        isClearable isSearchable
        type="Select"
        
        // Creatable
        components={isCreatable ? {MenuList, ...components} : {...components}}
        onKeyDown={isCreatable ? this.handleOnkeyDown : null}

        {...rest}
      />
    )
  }
}

export default CustomSelect;