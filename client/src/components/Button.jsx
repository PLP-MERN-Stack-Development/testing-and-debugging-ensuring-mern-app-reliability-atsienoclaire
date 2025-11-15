import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ children, variant='primary', size='md', disabled=false, className, ...rest }) => {
  const classes = clsx(
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    disabled && 'btn-disabled',
    className
  );
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary','secondary','danger']),
  size: PropTypes.oneOf(['sm','md','lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
