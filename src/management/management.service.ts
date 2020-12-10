import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { Song } from './management.models'

@Injectable()
export class SongService {
	songs: Song[] = []

	insertSong (name: string, artist: string, length: number, file: any) {
		const songID = uuid()
		this.songs.push(new Song(songID, name, artist, length, file, 0))

		// Return song upload response object
		return {
			success: 'yes',
			id: songID
		}
	}

	getAllSongs (): object {
		const songs = [ ...this.songs ]
		if (songs.length === 0) {
			throw new HttpException(`The response we got was empty. There is no songs in our database.`, 500)
		}
		return songs
	}

	getSong (id: string) {
		let selectedSong = this.songs.filter((song) => {
			if (song.id === id) {
				return song
			}
		})

		if (selectedSong[0]) return selectedSong[0]
		else throw new NotFoundException(null, `Could not find the requested song with ID: ${id}`)
	}
}
