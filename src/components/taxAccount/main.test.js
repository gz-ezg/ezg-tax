import { mount } from '@vue/test-utils'
import main from './main'

describe('main', () => {
    test('是一个 Vue 实例?', () => {
      const wrapper = mount(main)
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })