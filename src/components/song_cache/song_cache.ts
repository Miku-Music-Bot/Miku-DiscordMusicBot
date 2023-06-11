import { Component } from '../../shared/component/component';
import { IPC_CONFIG } from '../../shared/config/config';
import { SongUID } from '../../shared/types/song_uid';

/**
 * SongCache
 * Handles downloading and caching songs
 */
export default class SongCache extends Component {
  // Property containing settings required to connect to component server
  get connection_settings() {
    return { app_namespace: IPC_CONFIG.app_namespace, component_id: 'song_cache' };
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
   * search()
   * Searches bot music sources for given query
   * @param query - search query
   */
  async search(query: string): Promise<Array<{ title: string; song_uid: SongUID }>> {
    return [];
  }
}
