import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import VueI18n from 'vue-i18n';
import CreatePollComp from '../src/components/groups/CreatePoll.vue';

// const i18n = new VueI18n(lang);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({});

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
      i18n,
    });
    wrapper.setProps({ activeGroup: { groupId: 1 } });
    wrapper.find('.create-poll-btn').trigger('click');
    expect(actions.addPoll.mock.calls).toHaveLength(1);
  });

  it('title should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
      i18n,
    });
    expect(wrapper.vm.title).toBe('');
  });

  it('isClosed should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
      i18n,
    });
    expect(wrapper.vm.isClosed).toBe('');
  });

  it('options should be an empty array', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
      i18n,
    });
    expect(wrapper.vm.options).toEqual([]);
  });

  it('newOption should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
      i18n,
    });
    expect(wrapper.vm.newOption).toBe('');
  });

  it('dateValue should be empty', () => {
    const wrapper = shallow(CreatePollComp, {
      store,
      localVue,
      i18n,
    });
    expect(wrapper.vm.dateValue).toBe('');
  });

  // it('addOption voegt newOption toe aan options', () => {
  //   const wrapper = shallow(CreatePollComp, {
  //     store,
  //     localVue,
  //     i18n,
  //   });
  //   wrapper.setProps({ newOption: 'new option test' });
  //   localVue.nextTick(() => {
  //     expect(wrapper.vm.newOption).toEqual('new option test');
  //     // wrapper.vm.addOption();
  //     // expect(wrapper.vm.options).toEqual([{ description: 'new option test' }]);
  //   });
  // });
});
