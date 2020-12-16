import { HttpException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { Song } from './management.models'
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

@Injectable()
export class SongService implements OnModuleInit {

	songs: Song[] = [];

	onModuleInit() {
		const json = fs.readFileSync('db.json').toString();
		try {
			this.songs = JSON.parse(json);
		} catch (error) {
			console.log('Songs file is their empty or is invalid')
		}
	}

	insertSong(name: string, artist: string, album: string, file: any) {
		// create folder if it doesn't exist
		const staticPath = path.join('music', artist, album)
		const location = url.pathToFileURL(path.join(__dirname, '..', '..', 'static', staticPath));
		fs.mkdirSync(location, { recursive: true });

		// save songs
		let tempSongs = [];
		const songID = uuid();
		const extension = file.originalname.split('.').pop();
		const fileName = path.join(url.fileURLToPath(location), `${name}.${extension}`);
		const staticFilePath = path.join('/', staticPath, `${name}.${extension}`);
		fs.writeFileSync(fileName, Buffer.from(file.buffer));
		tempSongs.push(new Song(songID, name, artist, album, staticFilePath, 0));
		this.songs = [...this.songs, ...tempSongs];

		// sync database
		this.sync();

		// Return song upload response object
		return {
			success: 'yes',
			songs: tempSongs,
		}
	}

	getAllSongs(): Song[] {
		const songs = [...this.songs]
		if (songs.length === 0) {
			throw new HttpException(`The response we got was empty. There is no songs in our database.`, 500)
		}
		return songs
	}

	getSong(id: string) {
		let selectedSong = this.songs.filter((song) => {
			if (song.id === id) {
				return song
			}
		})

		if (selectedSong[0]) return selectedSong[0]
		else throw new NotFoundException(null, `Could not find the requested song with ID: ${id}`)
	}

	likeSong(id: string) {
		const index = this.songs.findIndex(s => s.id === id);
		this.songs[index].likes += 1;
		this.sync();
	}

	private sync() {
		const json = JSON.stringify(this.songs);
		fs.writeFileSync('db.json', json);
	}
}
