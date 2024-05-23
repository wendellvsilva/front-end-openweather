import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import App from './App';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            colorBorder: '#414ABA'
          },
          Radio:{
            
          }
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);