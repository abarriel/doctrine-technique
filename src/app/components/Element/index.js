import React from 'react';

const elem = ({ img, name, quantity }) => (
  <div>
    <img src={img} alt="img" style={{ width: 100, height: 'auto' }} />
    {name} {quantity}
  </div>
);

export default elem;
