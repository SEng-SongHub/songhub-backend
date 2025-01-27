import { Body, Controller, Get, HttpException, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { SongService } from './management.service'

@Controller('management')
export class ManagementController {
	constructor(private readonly songService: SongService) { }

	@Post('song')
	@UseInterceptors(FileInterceptor('file'))
	uploadSong(
		@Body('name') name: string,
		@Body('artist') artist: string,
		@Body('album') album: string,
		@UploadedFile() file: any,
	): object {
		if (file.originalname.split('.').pop() === 'mp4' || file.originalname.split('.').pop() === 'mp3') {
			const res = this.songService.insertSong(name, artist, album, file)
			return res;
		}
		else {
			throw new HttpException(
				'Invalid file type specified. Only MP3 or MP4 files are supported at this time.',
				400
			);
		}
	}

	@Get('song')
	getAllSongs(): object {
		return this.songService.getAllSongs()
	}

	@Get('song/:id')
	getSongData(@Param('id') id: string) {
		const res = this.songService.getSong(id)
		return res
	}

	@Post('song/:id/like')
	likeSong(@Param('id') id: string) {
		const res = this.songService.likeSong(id)
		return res
	}

}
