import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import CreatePollComp from '../src/components/groups/CreatePoll.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CreatePollComp', () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      addPoll: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  // faalt?

  it('dispatches an action when a button is clicked', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    wrapper.setProps({ activeGroup: { groupId: 1 } });
    wrapper.find('.create-poll-btn').trigger('click');
    expect(actions.addPoll.mock.calls).toHaveLength(1);
  });
});
