import { shallowMount } from '@vue/test-utils'
import App from '../src/App.vue'


describe('App.vue', () => {
  test('renders a div with class "flex"', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.find('div.flex').exists()).toBe(true)
  })
})