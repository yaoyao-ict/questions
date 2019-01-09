import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

test('header render', () => {
  const wrapper = shallow(<Header />);

  expect(wrapper.find('.navbar').length).toEqual(2);
});
