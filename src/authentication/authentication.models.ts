import { Type } from 'class-transformer'
import { IsDate } from 'class-validator'

export class Account {
  constructor (public email: string, public password: string, public dob: Date) {}
}
