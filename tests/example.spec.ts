import { mount } from '@vue/test-utils';
import Home from '../src/views/Home.vue';

describe('Home.vue', () => {
  it('renders the homepage', () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toContain('Welcome to the homepage!');
  });
});
