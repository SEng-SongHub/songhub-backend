import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { Account } from './authentication.models'

@Injectable()
export class AuthenticationService {

    sampleAccount: Account = new Account('user@email.com', 'password')

    accounts: Account[] = [this.sampleAccount]

    login (email: string, password: string) : object {
        const account = this.accounts.filter(account => {
            if (account.email === email && account.password === password) {
                return account
            }
        })

        if (account.length !== 0) {
            return { email : account[0].email }
        } else {
            throw new HttpException("Account not found.", 401)

        }
	}

}

