import { Type } from 'class-transformer'
import { IsDate } from 'class-validator'

export class AccountDto {
  readonly email: string
  readonly password: string

  @Type(() => Date)
  @IsDate()
  readonly dob: Date
}
