import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ManagementModule } from './management/management.module'
import { AuthenticationModule } from './authentication/authentication.module'

@Module({
	imports: [
		ManagementModule,
		AuthenticationModule,
		ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'static') })
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule { }
