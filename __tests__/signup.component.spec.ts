import {
  act,
  cleanup,
  fireEvent,
  render,
  waitForElement
} from '@testing-library/react';
import { mount, shallow } from 'enzyme';

import { SignupComponent } from 'pods/signup/signup.component';

const signup = SignupComponent();

describe('Signup component', () => {
  it('Should render correctly', () => {
    const component = shallow(signup);
    expect(component).toMatchSnapshot();
  });

  it('Should capture', async () => {
    const component = mount(signup);
    act(() => {
      const firstName = component
        .find('input')
        .at(0)
        .simulate('change', { target: { target: 'firstName', value: 'Nya' } });
    });

    expect(component.state('firstName')).toEqual('Nya');
  });
});
