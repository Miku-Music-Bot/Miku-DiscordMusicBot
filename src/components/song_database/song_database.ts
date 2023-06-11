import { Component } from '../../shared/component/component';
import { IPC_CONFIG } from '../../shared/config/config';

/**
 * SongDatabase
 * Handles storing and editing song information, their cache locations, and current playback locks
 */
export default class SongDatabase extends Component {
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

  //
}
