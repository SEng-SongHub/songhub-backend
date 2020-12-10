import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { SongService } from './management.service'

@Controller('management')
export class ManagementController {
	constructor (private readonly songService: SongService) {}

	@Post('song')
	@UseInterceptors(FileInterceptor('file'))
	uploadSong (
		@Body('name') name: string,
		@Body('artist') artist: string,
		@Body('length') length: number,
		@UploadedFile() file
	): object {
		const res = this.songService.insertSong(name, artist, length, file)
		return res
	}

	@Get('song')
	getAllSongs (): object {
		return this.songService.getAllSongs()
	}

	@Get('song/:id')
	getSongData (@Param('id') id: string) {
		const res = this.songService.getSong(id)
		return res
	}
}
