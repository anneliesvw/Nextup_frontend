import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import CreateEventComp from '../src/components/events/CreateEvent.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CreateEventComp', () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      addEventToGroup: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  // faalt?

  it('dispatches an action when a button is clicked', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    wrapper.setProps({ activeGroup: { groupId: 1 } });
    wrapper.find('.create-event-btn').trigger('click');
    expect(actions.addEventToGroup.mock.calls).toHaveLength(1);
  });
});
