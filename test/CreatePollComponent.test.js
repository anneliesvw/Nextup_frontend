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

  it('dispatches addPoll when a button is clicked', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    wrapper.setProps({ activeGroup: { groupId: 1 } });
    wrapper.find('.create-poll-btn').trigger('click');
    expect(actions.addPoll.mock.calls).toHaveLength(1);
  });

  it('title should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.title).toBe('');
  });

  it('isClosed should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.isClosed).toBe('');
  });

  it('deadline should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.deadline).toBe('');
  });

  it('description should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.description).toBe('');
  });

  it('options should be an empty array', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.options).toEqual([]);
  });

  it('newOption should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.newOption).toBe('');
  });

  it('dateValue should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.dateValue).toBe('');
  });

  it('addOption voegt newOption toe aan options', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
    });
    wrapper.setProps({ newOption: 'new option test' });
    wrapper.vm.addOption();
    expect(wrapper.options).toEqual([{ description: 'new option test' }]);
  });
});
