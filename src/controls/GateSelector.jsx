import uniqueId from 'uuid/v4';
import React from 'react';
import PropTypes from 'prop-types';

const GateSelector = (props) => {
  const { value, options, className, handleOnChange, title, isVisible } = props;
  const displayIt = isVisible === 0 && 'hidden';
  console.log('isvisible -> ', displayIt, isVisible)
  return (
    <select className={className}
            value={value}
            title={title}
            onChange={e=>handleOnChange(e.target.value)}
            style={{visibility: displayIt }}
            >
      {
        options.map(option=> {
          const key = option.id ? `key-${option.id}` : `key-${option.name}`;
          return (
            <option key={key} value={option.name}>{option.label}</option>
          );
        })
      }
    </select>
  );
}

GateSelector.displayName = 'GateSelector';

GateSelector.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
};

export default GateSelector;