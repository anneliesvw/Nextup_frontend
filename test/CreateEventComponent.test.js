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

  it('dispatches addEventToGroup when button is clicked', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    wrapper.setProps({ activeGroup: { groupId: 1 } });
    wrapper.find('.create-event-btn').trigger('click');
    expect(actions.addEventToGroup.mock.calls).toHaveLength(1);
  });

  it('eventInfo should have the right properties', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.eventInfo.name).toBe('');
    expect(wrapper.vm.eventInfo.isPrivate).toBeFalsy();
    expect(wrapper.vm.eventInfo.location).toBeNull();
    expect(wrapper.vm.eventInfo.startDate).toBeNull();
    expect(wrapper.vm.eventInfo.endDate).toBeNull();
    expect(wrapper.vm.eventInfo.description).toBeNull();
  });

  it('dateValue should be empty', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.dateValue).toBe('');
  });

  it('dynamicTags should be an empty list', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.dynamicTags).toEqual([]);
  });

  it('inputVisible should be false', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.inputVisible).toBeFalsy();
  });

  it('inputValue should be empty', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.inputValue).toBe('');
  });

  it('participantsValue should be 0', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.participantsValue).toEqual(0);
  });

  it('price should be empty', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.price).toBe('');
  });

  it('valuta should be empty', () => {
    const wrapper = shallow(CreateEventComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.valuta).toBe('');
  });
});
