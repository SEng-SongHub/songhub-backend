import { Body, Controller, Post } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { AccountDto } from './account.dto'

@Controller('auth')
export class AuthenticationController {
  constructor (private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login (@Body('email') email: string, @Body('password') password: string): any {
    const res = this.authenticationService.login(email, password)
    return res
  }

  @Post('register')
  register (@Body() account: AccountDto): object {
    const res = this.authenticationService.register(account)
    return res
  }
}
