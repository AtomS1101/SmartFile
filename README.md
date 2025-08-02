# SmartFile
### version : 1.0

```js
new SmartFile();
```

___
## Properties
#### `filePath`: String
File name
#### `content`: String or object
Data to write to File.

___
## Method
#### ` SetFile()`
Save the content to the file. If the file does not already exist, it will be created. If the file already exists the contents of the file will be overwritten with the new content. If the file extension set in filePath is “.json”, the content is automatically stringified before saving, and the returned value is also parsed into an object.

___
## returned value
String of file content.
`Promise <String>`

___
## Example
```js
const NewFile = new SmartFile();
NewFile.filePath = "setting.json";
NewFile.content = { theme: "dark" };
log(NewFile.content);  // { theme: "dark"}
```

___
## source code

