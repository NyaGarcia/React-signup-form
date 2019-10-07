import { SignupContainer } from 'pods/signup/signup.container';
import { shallow } from 'enzyme';

describe('Signup component', () => {
  it('Should render correctly', () => {
    const component = shallow(SignupContainer());
    expect(component).toMatchSnapshot();
  });
});
