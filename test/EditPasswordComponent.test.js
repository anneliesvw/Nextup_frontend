import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import EditPasswordComp from '../src/components/users/dialogs/EditPassword.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EditPasswordComp', () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      updatePassword: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  // faalt?

  it('dispatches an action when a button is clicked', () => {
    const wrapper = shallow(EditPasswordComp, {
      store,
      localVue,
      data: {
        userInfo: {
          person: { firstName: 'Jef', lastName: 'Test', location: { name: 'TestLocation' } },
          username: 'TestUser',
        },
      },
    });
    wrapper.find('.update-password-btn').trigger('click');
    expect(actions.updatePassword.mock.calls).toHaveLength(1);
  });
});
