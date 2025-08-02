# ShowAlert()
### version : 1.0

```js
ShowAlert(style);
```

___
## style format

|  propaties  | sign  |  value |
|  --- | --- | --- |
|  alert type  |  `type` |  String |
|  title  |  `title` | String |
|  message  |  `message` | String |
|  action  |  `act#` | String |
|  cancel  |  `can#` | String |
|  destructive  | `des#` | String |
|  text field  | `txt#` | Array |

### alert type: `type`

|  type  | sign |
|  --- | --- |
|  alert  | ` alert` |
|  sheet | `sheet` |

### text field: `txt#`

```
txt#: [placeholder: String, defaultAnswer: String, keyboardType: String]
```
#### `keyboardType`
|  type  | sign |
|  --- | --- |
|  default  | `default` |
|  secure field | `secure` |
|  number pad  | `number` |

___
## returned value
` Promise <object> `

```
return {
	index: number,
	text: [text 1, text 2, …]
}
```

___
## Example
```js
const Answer = await ShowAlert({
	type: "alert",
	title: "Title",
	message: "This is a test Alert!",
	act2: "Action2",
	act1: "Action1",
	can3: "Cancel",
	des4: " Delete",
	txt5: ["Enter...", "default answer", "default"]
});
```
The keys of the dictionary are sorted according to the numbers appearing from the fourth character onward, appended after content identifier. This helps simplify your code if you want to add or change content order after already adding something.
In this example, act1 button is placed to the top of act2 based on the key number, even though act2 defined before act1 defined.

___
## source code
```js
async function ShowAlert(Style) {
	const Art = new Alert();
	Art.title = Style.title;
	Art.message = Style.message;
	let TextField = 0;
	let Sorted = Object.keys(Style).sort((a, b) => {
		const NumA = parseInt(a.slice(3), 10);
		const NumB = parseInt(b.slice(3), 10);
		return NumA - NumB;
	});
	Style = Object.fromEntries(Sorted.map(key => [key, Style[key]]));
	for (let [item, value] of Object.entries(Style)) {
		switch (item.slice(0, 3)) { //extract identifier
			case "act": Art.addAction(value); break;
			case "can": Art.addCancelAction(value); break;
			case "des": Art.addDestructiveAction(value); break;
			case "txt":
				switch (value[2]) {
					case "secure": Art.addSecureTextField(value[0], value[1]); break;
					case "number": Art.addTextField(value[0], value[1]).setNumberPadKeyboard(); break;
					case "default": Art.addTextField(value[0], value[1]); break;
				}
				TextField++; break;
		}
	}
	const ActionIndex = Style.type == "alert"
		? await Art.presentAlert()
		: await Art.presentSheet();
	let TextList = [];
	for (let i=0; i<TextField; i++) TextList.push(Art.textFieldValue(i));
	return {index: ActionIndex, text: TextList};
}
```
