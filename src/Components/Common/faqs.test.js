import React from 'react';
import ReactDOM from 'react-dom';
import { Faqs } from './faqs';

it('Faqs renders without csrashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Faqs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
