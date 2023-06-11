/**
 * Derived type of ComponentInterface
 * For each object property that is not 'initializeComponent' or 'connection_settings'
 * if it is not a function, change its type to never
 * if it is a function that returns a promise, leave its type alone
 * if it is a function that does not return a promise, change its return type to a promise
 */
export type ComponentInterface<T> = {
  [Property in keyof T as Exclude<Property, 'initializeComponent' | 'connection_settings'>]: T[Property] extends (
    ...args: any[]
  ) => any
    ? ReturnType<T[Property]> extends Promise<any>
      ? T[Property]
      : (...args: Parameters<T[Property]>) => Promise<T[Property]>
    : never;
};

/**
 * Component
 * Helper class to create bot components
 * Components are either started as a server or an interface
 * Servers run the functions, interfaces communicate with the server to cause the server to run the function
 */
export abstract class Component {
  /**
   * initializeComponent()
   * Initializes the component as a server
   * @returns Promise that resolves once server is started, rejected if failed to start
   */
  abstract initializeComponent(): Promise<void>;

  // Property containing settings required to connect to component server
  abstract readonly connection_settings: { app_namespace: string; component_id: string };

  /**
   * _enumComponentMethods()
   * Gets the sorted list of methods that need to be overridden by interface
   * @param obj - some object
   * @returns - sorted list of object methods to be overridden on interface
   */
  private static _enumComponentMethods(component: object): string[] {
    const prototype = Object.getPrototypeOf(component);
    const method_names = Object.getOwnPropertyNames(prototype).filter((property: string) => {
      // no need to redefine constructor
      if (property === 'constructor') return false;
      // no need to redefine private and protected methods
      if (property.startsWith('_') || property.startsWith('_')) return false;

      if (typeof prototype[property] === 'function') return true;
      return false;
    });

    return method_names.sort();
  }

  /**
   * createServer()
   * Converts a component into a server
   * @param component - some component to make into a server
   */
  static createServer<T extends Component>(component: T): T {
    return component;
  }

  /**
   * createInterface()
   * Converts a component into a component interface and connects to component server
   * @param component - some component to make into an interface
   * @returns - Promise that resolves to ComponentInterface, rejects if failed to connect to server
   */
  static async createInterface<T extends Component>(component: T): Promise<ComponentInterface<T>> {
    const methods = this._enumComponentMethods(component);

    const component_interface = {} as ComponentInterface<T>;

    for (const method of methods) {
      component_interface[method as keyof ComponentInterface<T>] = (async (...args: any[]) => {
        return 'overridden';
      }) as unknown as any;
    }

    return component_interface;
  }
}
