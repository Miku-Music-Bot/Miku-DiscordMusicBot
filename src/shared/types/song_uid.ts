enum SONG_SOURCE {
  Youtube = 'yt',
  GoogleDrive = 'gd',
}

export type SongUID = `${SONG_SOURCE}$${string}`;
