class SmartFile {
	constructor(filePath){
		const _FM = FileManager.local();
		this.fm = _FM.isFileStoredIniCloud(module.filename) ? FileManager.iCloud() : _FM;
		this.libraryPath = this.fm.joinPath(this.fm.libraryDirectory(), filePath);
		this.extension = filePath.slice(filePath.lastIndexOf(".") + 1).toLowerCase();
	}
	create(content){
		if (!this.fm.fileExists(this.libraryPath)) {
			this.fm.writeString(this.libraryPath, content);
		}
	}
	get content(){
		if (!this.fm.fileExists(this.libraryPath)) return undefined;
		const Content = this.fm.readString(this.libraryPath);
		return this.extension == "json"
			? JSON.parse(Content) : Content;
	}
	set content(newValue){
		this.fm.writeString(this.libraryPath, this.extension == "json"
			? JSON.stringify(newValue, null, "\t") : String(newValue)
		);
	}
}
