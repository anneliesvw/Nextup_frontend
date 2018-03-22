// import Vuex from 'vuex';
// import { shallow, createLocalVue } from 'vue-test-utils';
// import CreateEventComp from '../src/components/events/CreateEvent.vue';

// const localVue = createLocalVue();
// localVue.use(Vuex);

// describe('CreateEventComp', () => {
//   let store;
//   let actions;
//   let getters;
//   beforeEach(() => {
//     actions = {
//       addEventToGroup: jest.fn(),
//     };
//     getters = {
//       getEventById: () => 'testEvent',
//     };
//     store = new Vuex.Store({
//       actions,
//       getters,
//     });
//   });

//   it('dispatches addEventToGroup when button is clicked', () => {
//     const $route = {
//       params: {
//         id: 1,
//       },
//     };

//     const wrapper = shallow(CreateEventComp, {
//       store,
//       localVue,
//       mocks: {
//         $route,
//       },
//     });

//     expect(store.getters.getEventById).toEqual('testEvent');
//     // console.log(wrapper.vm.$route.params);
//     // wrapper.setProps({ activeGroup: { groupId: 1 } });
//     // wrapper.find('.create-event-btn').trigger('click');
//     // expect(actions.addEventToGroup.mock.calls).toHaveLength(1);
//   });
// });
