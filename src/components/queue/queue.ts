import { Component } from '../../shared/component/component';
import { IPC_CONFIG } from '../../shared/config/config';
import { SongUID } from '../../shared/types/song_uid';

export type QueuePage = {
  songs: Array<{
    title: string;
    index: number; // index of song in the queue
  }>;
  now_playing_index: number; // index in the queue of the song that is currently playing
  page: number; // page number
  total_pages: number; // total number of pages
};

/**
 * Queue
 * Handles the order of songs to play, requesting upcoming songs to be cached, and generating autoplay songs
 */
export default class Queue extends Component {
  // Property containing settings required to connect to component server
  get connection_settings() {
    return { app_namespace: IPC_CONFIG.app_namespace, component_id: 'queue' };
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
   * peek()
   * View a certain page of the queue
   * If page is not specified, view page containing now playing song
   * @param guild_id - discord guild id
   * @param page - page of queue to peek at
   */
  async peek(guild_id: string, page?: number): Promise<QueuePage> {
    return { songs: [], now_playing_index: 0, page: 0, total_pages: 0 };
  }

  /**
   * next()
   * Advances the queue for a specific guild
   * @param guild_id - discord guild id
   * @returns SongUID of song of now playing song after advancing queue
   */
  async next(guild_id: string): Promise<SongUID> {
    return 'yt$';
  }

  /**
   * insert()
   * Inserts a song into the queue for a specific guild
   * @param guild_id - discord guild id
   * @param song_uid SongUID of song to insert
   */
  async insert(guild_id: string, song_uid: SongUID): Promise<void> {
    //
  }

  /**
   * advance()
   * Moves the selected song in the queue so that it is next to be played for a specific guild
   * @param guild_id - discord guild id
   * @param index - index of song in queue
   */
  async advance(guild_id: string, index: number): Promise<void> {
    //
  }

  /**
   * remove()
   * Removes the selected song in the queue for a specific guild
   * @param guild_id - discord guild id
   * @param index - index of song in queue
   */
  async remove(guild_id: string, index: number): Promise<void> {
    //
  }

  /**
   * clearQueue()
   * Clears the queue of a specific
   * @param guild_id - discord guild id
   */
  async clearQueue(guild_id: string): Promise<void> {
    //
  }
}
