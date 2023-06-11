import { Component } from '../../shared/component/component';
import { IPC_CONFIG } from '../../shared/config/config';

export enum AUDIO_PLAYER_STATE {
  Idle, // Not in voice channel
  InChannel, // In a voice channel not playing a song
  Buffering, // In a voice channel, waiting for song to be partially downloaded
  Playing, // Currently playing a song
  Paused, // Song is paused
}

// Object containing information about what audio player is doing
export type AudioPlayerInfo =
  | {
      state: AUDIO_PLAYER_STATE.Buffering | AUDIO_PLAYER_STATE.Playing | AUDIO_PLAYER_STATE.Paused;
      playback_duration: number;
    }
  | {
      state: AUDIO_PLAYER_STATE.Idle | AUDIO_PLAYER_STATE.InChannel;
    };

/**
 * AudioPlayer
 * Handles playing audio in voice channels from local cache
 */
export class AudioPlayer extends Component {
  // Property containing settings required to connect to component server
  get connection_settings() {
    return { app_namespace: IPC_CONFIG.app_namespace, component_id: 'audio_player' };
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
   * join()
   * Join a given voice channel for a specific guild
   * @param guild_id - discord guild id
   * @param voice_channel_id - discord channel id
   */
  async join(guild_id: string, voice_channel_id: string): Promise<void> {
    //
  }

  /**
   * play()
   * Start playing from queue for a specific guild
   * @param guild_id - discord guild id
   */
  async play(guild_id: string): Promise<void> {
    //
  }

  /**
   * pause()
   * Pauses the current song for a specific guild
   * @param guild_id - discord guild id
   */
  pause(guild_id: string): void {
    //
  }

  /**
   * skip()
   * Skips the current song for a specific guild
   * @param guild_id - discord guild id
   */
  skip(guild_id: string): void {
    //
  }

  /**
   * leave()
   * Leaves the current voice channel for a specific guild
   * @param guild_id - discord guild id
   */
  leave(guild_id: string): void {
    //
  }

  /**
   * getPlayerInfo()
   * Fetches state and playback duration of audio player for a specific guild
   * @param guild_id - discord guild id
   * @returns AudioPlayerInfo object
   */
  getPlayerInfo(guild_id: string): AudioPlayerInfo {
    return {
      state: AUDIO_PLAYER_STATE.Idle,
    };
  }
}
