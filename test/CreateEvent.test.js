import { shallow } from 'vue-test-utils';
import CreateEventComponent from '../src/components/events/CreateEvent.vue';

describe('Test suite for CreateGroupComponent', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallow(CreateEventComponent, {
      // Create a shallow instance of the component
      data: {
        // Replace data value with this fake data
        dateValue: '',
        publicValue: false,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        participantsValue: 0,
        price: '',
        valuta: '',
      },
    });
  });

  it('handeInputConfirm maakt tag aan en verandert inputValue', () => {
    // cmp.vm, all Vue instance methods
    expect(cmp.vm.dynamicTags).toEqual([]);
    cmp.vm.inputValue = 'Bakdag';
    cmp.vm.handleInputConfirm();
    expect(cmp.vm.dynamicTags).toEqual(['Bakdag']);
    cmp.vm.inputValue = 'Kateren';
    cmp.vm.handleInputConfirm();
    expect(cmp.vm.dynamicTags).toEqual(['Bakdag', 'Kateren']);
    expect(cmp.vm.inputValue).toEqual('');
  });
});
