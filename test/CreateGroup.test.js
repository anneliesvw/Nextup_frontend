import { shallow } from 'vue-test-utils';
import CreateGroupComponent from '../src/components/groups/CreateGroup.vue';

describe('Test suite for CreateGroupComponent', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallow(CreateGroupComponent, {
      // Create a shallow instance of the component
      data: {
        // Replace data value with this fake data
        groupInfo: {
          name: 'TestGroep',
          description: 'Dit is een groep om te testen',
        },
        friends: [],
        members: [],
        memberToAdd: '',
      },
    });
  });

  it('Test name is TestGroep', () => {
    // cmp.vm, all Vue instance methods
    expect(cmp.vm.groupInfo.name).toEqual('TestGroep');
  });

  it('calls createGroup when click on button', () => {
    const stub = jest.fn();
    cmp.setMethods({ createGroup: stub });
    const el = cmp.find('.create-group-btn').trigger('click');
    expect(stub).toBeCalled();
  });

  it('addMember adds a member', () => {
    expect(cmp.vm.members).toEqual([]);
    cmp.vm.memberToAdd = 'Jonathan';
    cmp.vm.addMember();
    expect(cmp.vm.members).toEqual([{ name: 'Jonathan' }]);
    cmp.vm.memberToAdd = 'Mahen';
    cmp.vm.addMember();
    expect(cmp.vm.members).toEqual([{ name: 'Jonathan' }, { name: 'Mahen' }]);
  });

  it('removeMember removes a member', () => {
    expect(cmp.vm.members).toEqual([]);
    cmp.vm.memberToAdd = 'Jonathan';
    cmp.vm.addMember();
    cmp.vm.memberToAdd = 'Mahen';
    cmp.vm.addMember();
    expect(cmp.vm.members).toEqual([{ name: 'Jonathan' }, { name: 'Mahen' }]);
    cmp.vm.removeMember(0);
    expect(cmp.vm.members).toEqual([{ name: 'Mahen' }]);
  });
});
