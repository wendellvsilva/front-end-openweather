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
            colorBorder: '#414ABA',
            borderWidth: 24,
          },
          Radio: {
            buttonBg: '#BEE7F9',
            buttonColor: '#414ABA',
            buttonPaddingInline: 15,
            radioSize: 16,
            buttonCheckedBg: '#BEE7F9',
            buttonSolidCheckedColor: '#221F52',
            buttonSolidCheckedBorderColor: '#221F52',
          },
          DatePicker: {
          colorBorder: 'red', 
          lineWidth: 40,
            },
          
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);