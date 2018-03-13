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
      createroom: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('dispatches addGroup when a button is clicked', () => {
    const wrapper = shallow(CreateGroupComp, {
      store,
      localVue,
    });
    wrapper.find('.create-group-btn').trigger('click');
    expect(actions.addGroup.mock.calls).toHaveLength(1);
  });

  it('groupInfo should have an empty name and description', () => {
    const wrapper = shallow(CreateGroupComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.groupInfo.name).toBe('');
    expect(wrapper.vm.groupInfo.description).toBe('');
  });

  it('friends should be an empty array', () => {
    const wrapper = shallow(CreateGroupComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.friends).toEqual([]);
  });

  it('members should be an empty array', () => {
    const wrapper = shallow(CreateGroupComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.members).toEqual([]);
  });

  it('memberToAdd should be empty', () => {
    const wrapper = shallow(CreateGroupComp, {
      store,
      localVue,
    });
    expect(wrapper.vm.memberToAdd).toBe('');
  });

  // it('calls createroom when group created', () => {
  //   const wrapper = shallow(CreateGroupComp, {
  //     store,
  //     localVue,
  //   });

  //   wrapper.find('.create-group-btn').trigger('click');
  //   expect(actions.createroom.mock.calls).toHaveLength(1);
  // });
});
