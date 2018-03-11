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
//       props: {
//         isVisible: true,
//         activeGroup: { groupId: 1, users: [{ userId: 1 }] },
//         poll: {
//           pollId: 1,
//           name: 'TestPoll',
//           pollOptions: [
//             { id: 1, description: 'Test option 1' },
//             { id: 2, description: 'Test option 2' },
//           ],
//         },
//       },
//       data() {
//         return {
//           dataPoll: { name: 'TestPoll' },
//           options: [
//             { id: 1, description: 'Test option 1' },
//             { id: 2, description: 'Test option 2' },
//           ],

//           newOption: '',
//         };
//       },
//     });
//     // wrapper.setProps({
//     //   isVisible: true,
//     //   activeGroup: { groupId: 1, users: [{ userId: 1 }] },
//     //   poll: {
//     //     pollId: 1,
//     //     name: 'TestPoll',
//     //     pollOptions: [
//     //       { id: 1, description: 'Test option 1' },
//     //       { id: 2, description: 'Test option 2' },
//     //     ],
//     //   },
//     // });
//     // wrapper.setData({ dataPoll: wrapper.vm._props.poll });
//     console.log(wrapper.vm.dataPoll);
//     wrapper.find('.delete-poll-btn').trigger('click');
//     expect(actions.removePoll.mock.calls).toHaveLength(1);
//     wrapper.find('.update-poll-btn').trigger('click');
//     expect(actions.updatePoll.mock.calls).toHaveLength(1);
//   });
// });
