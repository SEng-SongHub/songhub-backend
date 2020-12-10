export class Song {
	constructor (
		public id: string,
		public name: string,
		public artist: string,
		public length: number,
		public file: any,
		public likes: number
	) {}
}
