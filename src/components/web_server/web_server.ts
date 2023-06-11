import { Component } from '../../shared/component/component';
import { IPC_CONFIG } from '../../shared/config/config';

/**
 * WebServer
 * Handles serving the webpage for editing guild configurations
 */
export default class WebServer extends Component {
  // Property containing settings required to connect to component server
  get connection_settings() {
    return { app_namespace: IPC_CONFIG.app_namespace, component_id: 'song_database' };
  }

  /**
   * initializeComponent()
   * Initializes the component as a server
   * @returns Promise that resolves once server is started, rejected if failed to start
   */
  async initializeComponent(): Promise<void> {
    //
  }

  /**
   * generateConfigureLink()
   * Generates a temporary, unique link for a guild admin to configure bot
   * @param guild_id - discord guild id
   */
  generateConfigureLink(guild_id: string): string {
    return '';
  }
}
