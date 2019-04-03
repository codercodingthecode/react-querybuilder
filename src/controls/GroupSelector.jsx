import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components'

const Input = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const GroupSelector = (props) => {
    const { label, className, handleOnClick, title } = props;

    return (
        <Input className={className}
            type='checkbox'
            onClick={e => handleOnClick(e)}
/>
    );
}

GroupSelector.displayName = 'GroupSelector';

GroupSelector.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    handleOnClick: PropTypes.func,
    title: PropTypes.string,
};

export default GroupSelector