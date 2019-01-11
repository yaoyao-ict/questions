import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('header test', () => {
  test('header should render', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('.navbar').length).toEqual(1);
  });
});
