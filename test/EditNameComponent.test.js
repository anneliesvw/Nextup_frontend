import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import EditNameComp from '../src/components/users/dialogs/EditName.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EditNameComp', () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      updateUser: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  // faalt?

  it('dispatches an action when a button is clicked', () => {
    const wrapper = shallow(EditNameComp, {
      store,
      localVue,
      data: {
        userInfo: {
          person: { firstName: 'Jef', lastName: 'Test', location: { name: 'TestLocation' } },
          username: 'TestUser',
        },
      },
    });
    wrapper.find('.update-user-btn').trigger('click');
    expect(actions.updateUser.mock.calls).toHaveLength(1);
  });
});
