import { Component } from '../../../src/shared/component/component';

import valid_input_outputs from './valid_input_outputs';
import invalid_input_ouputs from './invalid_input_outputs';

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

describe('valid return values', () => {
  /**
   * testReturn()
   * Checks that the list of values to return are returned by interface exactly as they are returned by component
   * @param to_return - Array of values to return and test
   */
  async function testReturn(to_return: Array<any>) {
    let to_mock = test_component.testFunction;
    for (const t of to_return) {
      // check with both normal return and promise
      to_mock = to_mock.mockReturnValueOnce(t);
      to_mock = to_mock.mockResolvedValueOnce(t);
    }

    await Component.createServer(test_component);
    const component_interface = await Component.createInterface(test_interface);

    for (const t of to_return) {
      await expect(component_interface.testFunction()).resolves.toEqual(t);
      await expect(component_interface.testFunction()).resolves.toEqual(t);
    }
  }

  test('valid numbers', async () => await testReturn(valid_input_outputs.numbers));
  test('strings', async () => await testReturn(valid_input_outputs.strings));
  test('booleans', async () => await testReturn(valid_input_outputs.bools));
  test('arrays', async () => await testReturn(valid_input_outputs.arrays));
  test('objects', async () => await testReturn(valid_input_outputs.objs));
  test('others', async () => await testReturn(valid_input_outputs.other));
});

describe('invalid return values', () => {
  test('return invalid number', async () => {
    // test_component.initializeComponent
    //   .mockResolvedValueOnce(Number.POSITIVE_INFINITY)
    //   .mockResolvedValueOnce(Number.NEGATIVE_INFINITY)
    //   .mockResolvedValueOnce(Number.NaN);
    // await Component.createServer(test_component);
    // const component_interface = await Component.createInterface(test_interface);
    // await expect(component_interface.testFunction()).resolves.toBe(Number.POSITIVE_INFINITY);
    // await expect(component_interface.testFunction()).resolves.toBe(Number.NEGATIVE_INFINITY);
    // await expect(component_interface.testFunction()).resolves.toBe(Number.NaN);
  });
});
