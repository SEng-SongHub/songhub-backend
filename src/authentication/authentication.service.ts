import { HttpException, Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { AccountDto } from './account.dto'
import { Account } from './authentication.models'

@Injectable()
export class AuthenticationService {
  sampleAccount: Account = new Account('user@email.com', 'password', new Date(1994, 4, 20))

  accounts: Account[] = [ this.sampleAccount ]

  accountExists (email: string): boolean {
    const found = this.accounts.filter((account) => {
      if (account.email === email) return true
    })

    return found.length > 0
  }

  login (email: string, password: string): object {
    const account = this.accounts.filter((account) => {
      if (account.email === email && account.password === password) {
        return account
      }
    })

    if (account.length !== 0) {
      return {
        success: 'yes',
        email: account[0].email,
        dateofbirth: account[0].dob
      }
    } else {
      throw new HttpException('Account not found with that email:password combination...', 401)
    }
  }

  register (account: AccountDto): object {
    if (account.email.length > 0 && account.password.length > 0 && account.dob !== null) {
      if (!this.accountExists(account.email)) {
        this.accounts.push(new Account(account.email, account.password, account.dob))

        return {
          success: 'yes',
          email: account.email,
          dob: account.dob
        }
      } else {
        throw new HttpException(`An account already exists with that email (${account.email})`, 500)
      }
    } else {
      throw new HttpException(`Account could not be created for email: ${account.email}`, 500)
    }
  }
}
