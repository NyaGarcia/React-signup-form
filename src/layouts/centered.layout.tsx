import React from 'react';

export const CenteredLayout: React.FunctionComponent = props => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '50vw',
      height: '100vh',
      margin: '0 auto',
      boxSizing: 'border-box',
      padding: '2rem',
      overflow: 'auto'
    }}
  >
    {props.children}
  </div>
);
