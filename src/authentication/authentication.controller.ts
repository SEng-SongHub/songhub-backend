import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthenticationService } from './authentication.service'
import { AnyMxRecord } from 'dns';

@Controller('authentication')
export class AuthenticationController {
	constructor (private readonly authenticationService: AuthenticationService) {}

	@Post('login')
	login (
		@Body('email') email: string,
		@Body('password') password: string
	): any {
        const res = this.authenticationService.login(email, password)
        return res 
    }

}