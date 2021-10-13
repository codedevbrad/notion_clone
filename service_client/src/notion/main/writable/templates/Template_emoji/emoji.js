
import React from 'react';
const  Emoji = ({ label , symbol , style }) => (
  <span style={ { cursor: 'pointer' , padding: 5 , borderRadius: 4 , width: 32 } }
    className="emoji"
    role="img"
    aria-label={ label ? label : ""}
    aria-hidden={ label ? "false" : "true"}
  >
    { symbol}
  </span>
)

export default Emoji;

// <Emoji label="sheep" symbol="🐑"/>
