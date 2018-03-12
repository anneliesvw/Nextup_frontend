// import Vuex from 'vuex';
// import { shallow, createLocalVue } from 'vue-test-utils';
// import PollDialogComp from '../src/components/groups/PollDialog.vue';

// const localVue = createLocalVue();
// localVue.use(Vuex);

// describe('PollDialogComp', () => {
//   let store;
//   let actions;
//   beforeEach(() => {
//     actions = {
//       removePoll: jest.fn(),
//       updatePoll: jest.fn(),
//     };
//     store = new Vuex.Store({
//       actions,
//     });
//   });

//   it('dispatches an action when a button is clicked', () => {
//     const wrapper = shallow(PollDialogComp, {
//       store,
//       localVue,
//       data: {
//         dataPoll: {
//           pollId: 1,
//           name: 'TestPoll',
//           pollOptions: [
//             { id: 1, description: 'Test option 1' },
//             { id: 2, description: 'Test option 2' },
//           ],
//         },
//         options: [{ id: 1, description: 'Test option 1' }, { id: 2, description: 'Test option 2' }],
//         newOption: '',
//       },
//     });
//     wrapper.setProps({
//       isVisible: true,
//       activeGroup: { groupId: 1, users: [{ userId: 1 }] },
//       poll: {
//         pollId: 1,
//         name: 'TestPoll',
//         pollOptions: [
//           { id: 1, description: 'Test option 1' },
//           { id: 2, description: 'Test option 2' },
//         ],
//       },
//     });
//     wrapper.find('.update-poll-btn').trigger('click');
//     expect(actions.updateUser.mock.calls).toHaveLength(1);
//   });
// });
