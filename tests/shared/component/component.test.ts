import { Component } from '../../../src/shared/component/component';

// Define a testable component and interface
class TestComponent extends Component {
  get connection_settings() {
    return { app_namespace: 'test_component', component_id: 'test_component' };
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  initializeComponent = jest.fn();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  testFunction = jest.fn();
}
class TestInterface extends Component {
  get connection_settings() {
    return { app_namespace: 'test_component', component_id: 'test_component' };
  }
  async initializeComponent() {
    throw new Error('intiializeComponent should not have been called on interface');
  }
  testFunction() {
    throw new Error('testFunction should have been overriden on interface');
  }
}

let test_component: TestComponent;
let test_interface: TestInterface;
beforeEach(() => {
  // Create a new component and interface each test
  test_component = new TestComponent();
  test_interface = new TestInterface();
});

describe('createServer calls initializeComponent', () => {
  test('successfully', async () => {
    test_component.initializeComponent.mockResolvedValue('Success');

    await Component.createServer(test_component);
    await Component.createServer(test_component);
    await Component.createServer(test_component);

    expect(test_component.initializeComponent.mock.instances.length).toBe(1);
  });

  test('unsuccessfully', async () => {
    test_component.initializeComponent.mockRejectedValue('Failed Initialization');

    await expect(Component.createServer(test_component)).rejects.toBe('Failed Initialization');
  });
});
