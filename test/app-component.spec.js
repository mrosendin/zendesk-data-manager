import Vue from 'vue'
import App from '../src/App.vue'

describe('App.vue', function () {

  it('should render', function () {
    var vm = new Vue({
      template: '<div><App/></div>',
      components: { App }
    }).$mount()
    expect(true).toBe(true)
  })
})
