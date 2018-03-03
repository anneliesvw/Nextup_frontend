import actions from '../src/store/actions';
import store from '../src/store/store';

describe('Test suite for Vuex store actions', () => {
  it('setLoginAttempt verandert loginAttempt', () => {
    expect(store.state.loginAttempt).toEqual('');
    this.$store.dispatch('setLoginAttempt', 'test');
    //  actions.setLoginAttempt('test');
    expect(store.state.loginAttempt).toEqual('test');
  });
});
