import React from 'react';
import { Button } from 'reactstrap';
import './style.css';

const CustomButton = ({ style, name, onClick }) => (
  <Button className="buttonCustom" style={style} onClick={onClick}>
    {' '}
    {name}{' '}
  </Button>
);

export default CustomButton;
