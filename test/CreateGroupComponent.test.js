import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import CreateGroupComp from '../src/components/groups/CreateGroup.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CreateGroupComp', () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      addGroup: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  // faalt?

  it('dispatches an action when a button is clicked', () => {
    const wrapper = shallow(CreateGroupComp, {
      store,
      localVue,
    });
    wrapper.find('.create-group-btn').trigger('click');
    expect(actions.addGroup.mock.calls).toHaveLength(1);
  });
});
