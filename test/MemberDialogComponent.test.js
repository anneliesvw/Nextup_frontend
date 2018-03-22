import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import MemberDialogComp from '../src/components/groups/MemberDialog.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MemberDialogComp', () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      addUserToGroup: jest.fn(),
      deleteUserFromGroup: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('dispatches addUserToGroup and deleteUserFromGroup when buttons clicked', () => {
    const wrapper = shallow(MemberDialogComp, {
      store,
      localVue,
    });
    wrapper.setProps({ activeGroup: { groupId: 1, users: [{ userId: 1 }] } });
    wrapper.find('.appended-input').trigger('click');
    wrapper.find('.appended-input').trigger('click');
    expect(actions.addUserToGroup.mock.calls).toHaveLength(2);
    wrapper.find('.member-remove').trigger('click');
    expect(actions.deleteUserFromGroup.mock.calls).toHaveLength(1);
  });
});
