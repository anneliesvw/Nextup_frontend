import { mutations } from '../src/store/store';

describe('Test suite for Vuex store mutations', () => {
  it('setLoginAttempt verandert loginAttempt', () => {
    const state = {
      debug: true,
      loginAttempt: '',
      groups: [],
    };
    mutations.setLoginAttempt(state, 'test');
    expect(state.loginAttempt).toEqual('test');
    mutations.setLoginAttempt(state, 'login');
    expect(state.loginAttempt).toEqual('login');
  });

  it('addGroup voegt groep toe aan groups', () => {
    const state = {
      debug: true,
      loginAttempt: '',
      groups: [],
    };
    mutations.addGroup(state, { groupId: '1', groupName: 'group1' });
    expect(state.groups).toEqual([{ groupId: '1', groupName: 'group1' }]);
    mutations.addGroup(state, { groupId: '2', groupName: 'group2' });
    expect(state.groups).toEqual([
      { groupId: '1', groupName: 'group1' },
      { groupId: '2', groupName: 'group2' },
    ]);
  });

  it('setGroups vervangt alle groepen', () => {
    const state = {
      debug: true,
      loginAttempt: '',
      groups: [{ groupId: '1', groupName: 'hello' }, { groupId: '2', groupName: 'there' }],
    };
    const groups = [{ groupId: '1', groupName: 'general' }, { groupId: '2', groupName: 'kenobi' }];
    expect(state.groups).toEqual([
      { groupId: '1', groupName: 'hello' },
      { groupId: '2', groupName: 'there' },
    ]);
    mutations.setGroups(state, groups);
    expect(state.groups).toEqual([
      { groupId: '1', groupName: 'general' },
      { groupId: '2', groupName: 'kenobi' },
    ]);
  });

  it('updateGroup verandert alle waarden van de juiste groep naar de geupdatete waarden', () => {
    const state = {
      debug: true,
      loginAttempt: '',
      groups: [{ groupId: '1', groupName: 'hello' }, { groupId: '2', groupName: 'there' }],
    };
    mutations.updateGroup(state, { groupId: '1', groupName: 'Darth Plagueis' });
    expect(state.groups).toEqual([
      { groupId: '1', groupName: 'Darth Plagueis' },
      { groupId: '2', groupName: 'there' },
    ]);
    mutations.updateGroup(state, { groupId: '2', groupName: 'the wise' });
    expect(state.groups).toEqual([
      { groupId: '1', groupName: 'Darth Plagueis' },
      { groupId: '2', groupName: 'the wise' },
    ]);
  });
});
