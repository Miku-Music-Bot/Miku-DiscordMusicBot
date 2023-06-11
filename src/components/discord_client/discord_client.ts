import { Component } from '../../shared/component/component';
import { IPC_CONFIG } from '../../shared/config/config';

type GuildConfig = {
  //
};

/**
 * DiscordClient
 * Handles interfacing with discord API
 * Listens for interactions, sends replies, updates discord UI message
 */
export class DiscordClient extends Component {
  // Property containing settings required to connect to component server
  get connection_settings() {
    return { app_namespace: IPC_CONFIG.app_namespace, component_id: 'discord_client' };
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
   * updateConfig()
   * Updates the configuration for a specific guild
   * @param guild_id - discord guild id
   * @param config - updated config
   */
  async updateConfig(guild_id: string, config: Partial<GuildConfig>): Promise<void> {
    //
  }
}
