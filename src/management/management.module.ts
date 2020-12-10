import { Module } from '@nestjs/common'
import { ManagementController } from './management.controller'
import { SongService } from './management.service'

@Module({
	controllers: [ ManagementController ],
	providers: [ SongService ]
})
export class ManagementModule {}
