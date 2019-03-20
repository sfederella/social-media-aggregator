import React, {Component} from 'react'
import AsyncSelect from 'react-select/lib/Async';
import MenuList from './MenuList';

class CustomAsyncSelect extends Component {
  constructor() {
    super();
    this.selectRef = React.createRef();
    this.state = {
      isLoading: false
    }
  }

  handleOnkeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        const select = this.selectRef.current.select.select;
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

  handleOnLoadOptions = (value,callback) => {
    this.setState({isLoading: true});
    const query = value || '';
    this.props.loadOptions(query, (res) => {
      callback(res)
      this.setState({isLoading: false});
    });
  }

  render() {
    const {
      isCreatable,
      components,
      loadOptions,
      ...rest
    } = this.props;

    return (
      <AsyncSelect
        ref={this.selectRef}
        selectRef={this.selectRef}
        className="react-select"
        classNamePrefix="react-select"
        isClearable
        type="AsyncSelect"

        // Async 
        isLoading={this.state.isLoading}
        loadOptions={(value,callback) => this.handleOnLoadOptions(value,callback)}

        // Creatable
        components={isCreatable ? {MenuList, ...components} : {...components}}
        onKeyDown={isCreatable ? this.handleOnkeyDown : null}

        {...rest}
      />
    )
  }
}

export default CustomAsyncSelect;