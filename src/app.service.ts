import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	showOptions () {
		return '<h1>Options</h1><br/><p>management - /management</p>'
	}
}
