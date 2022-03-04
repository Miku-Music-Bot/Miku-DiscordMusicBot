import GuildComponent from '../Components/GuildComponent';
import type GuildHandler from '../GuildHandler';
import Song from './Data/SourceData/Song';
import AudioSource from './VCPlayer/AudioSources/AudioSource';
import YTSource from './VCPlayer/AudioSources/YTAudioSource';

/**
 * Queue
 * 
 * Handles queue of songs to be played and playing said songs
 */
export default class Queue extends GuildComponent {
	private _queue: Array<Song>;
	private _autoplayQueue: Array<Song>;
	nowPlaying: boolean;
	private _nowPlayingSong: Song;
	private _lastPlayed: Song;
	private _currentLoc: number;

	private _repeatSong: number;
	private _repeatQueue: boolean;

	/**
	 * @param guildHandler - guild handler for guild this queue object is responsible for
	 */
	constructor(guildHandler: GuildHandler) {
		super(guildHandler);

		this._queue = [];
		this._autoplayQueue = [];
		this.nowPlaying = false;
		this._currentLoc = -1;

		this._repeatSong = 0;
		this._repeatQueue = false;

		this._refreshAutoplay();
	}

	/**
	 * _resolveIndex()
	 * 
	 * @param i - index to resolve
	 * @returns Object with property "from" (queue or notFound or autoplay), "index" (of queueList or autoplayList), and "song"
	 */
	private _resolveIndex(i: number) {
		if (this._queue.length > i) {
			return {
				from: 'queue',
				index: i,
				song: this._queue[i]
			};
		}
		else if (this._queue.length + this._autoplayQueue.length <= i) {
			return {
				from: 'notFound',
				index: i,
				song: undefined
			};
		}
		else {
			return {
				from: 'autoplay',
				index: i - this._queue.length,
				song: this._autoplayQueue[i - this._queue.length]
			};
		}
	}

	/**
	 * removeSong()
	 * 
	 * Removes a song with the given id from the queue
	 * @param id - id of song to remove
	 */
	removeSong(id: number) {
		const loc = this._resolveIndex(id - 1);
		if (loc.from === 'queue') { this._queue.splice(loc.index, 1); }
		else if (loc.from === 'autoplay') { this._autoplayQueue.splice(loc.index, 1); }
		else { this.ui.sendError('That song doens\'t exist in the queue or in autoplay'); }

	}

	/**
	 * addQueue()
	 * 
	 * Inserts a song to queue
	 * @param song - song to add to queue
	 */
	addQueue(song: Song) { this._queue.push(song); }

	/**
	 * _refreshQueue()
	 * 
	 * Shuffles the queue
	 */
	private _refreshQueue() { this._queue = this._shuffle(this._queue); }

	/**
	 * _refreshAutoplay()
	 * 
	 * Adds new songs to the autoplay queue
	 */
	private _refreshAutoplay() {
		const newSongs = [];
		for (let i = 0; i < this.data.guildSettings.autoplayList.length; i++) {
			newSongs.push(...this.data.sourceManager.resolveRef(this.data.guildSettings.autoplayList[i]));
		}
		this._autoplayQueue.push(...this._shuffle(newSongs));
	}

	/**
	 * _shuffle()
	 * 
	 * Implements a Fisher-Yates algorithm to shuffle an array
	 * @param list - array to shuffle
	 * @returns suffled array
	 */
	private _shuffle(list: Array<Song>): Array<Song> {
		for (let i = list.length - 1; i > 0; i--) {
			const rand = Math.round(Math.random() * i);
			const temp = list[i];
			list[i] = list[rand];
			list[rand] = temp;
		}
		return list;
	}

	/**
	 * _createSource()
	 * 
	 * Creates the appropriate AudioSource for the given song (yt vs gd vs etc)
	 * @param song - song to create source for
	 * @returns AudioSource object of created source
	 */
	private _createSource(song: Song) {
		let source: AudioSource;
		switch (song.type) {
			case ('yt'): {
				source = new YTSource(this.guildHandler, song);
				break;
			}
		}
		return source;
	}

	/**
	 * nextSong()
	 * 
	 * Queues up the next song if queue is not finished, otherwise does nothing
	 */
	nextSong() {
		this.nowPlaying = true;
		this._lastPlayed = this._nowPlayingSong;

		// if repeatSong, play the same song again
		if ((this._repeatSong > 0 || this._repeatSong === -1) && this._lastPlayed) {
			if (this._repeatSong !== -1) { this._repeatSong--; }
			const source = this._createSource(this._lastPlayed);
			this.vcPlayer.play(source);
			return;
		}
		
		// Move to next song, unless we are at the end of the queue
		this._currentLoc++;
		if (this._currentLoc >= this._queue.length) {
			// refresh the queue if it has ended and we want to repeat it, otherwise clear the queue
			if (this._repeatQueue) {
				this._refreshQueue();
				this._currentLoc = 0;
			}
			else { this._queue = []; }
		}

		// if queue is empty and autoplay is on, set currentLoc to the right place
		if (this._queue.length === 0 && this.data.guildSettings.autoplay) { this._currentLoc = -1; }

		// if currentLoc is -1, play from autoplay
		if (this._currentLoc === -1 && this.data.guildSettings.autoplay) {
			const source = this._createSource(this._autoplayQueue[0]);
			this._nowPlayingSong = this._autoplayQueue[0];
			this._autoplayQueue.shift();
			this.vcPlayer.play(source);
		}
		// otherwise play the right song from the queue
		else if (this._currentLoc < this._queue.length) {
			const source = this._createSource(this._queue[this._currentLoc]);
			this._nowPlayingSong = this._queue[this._currentLoc];
			this.vcPlayer.play(source);
		}
		// send error if there is nothing to play
		else { this.ui.sendError('Nothing to play!'); }

		// refresh autoplay queue if we are near the end
		if (this._autoplayQueue.length <= 10) { this._refreshAutoplay(); }
	}
}