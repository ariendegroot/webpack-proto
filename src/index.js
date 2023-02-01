import '@babel/polyfill';
import style from './main.scss';


import Navigation from './javascript/navigation';

const componentsArr = [Navigation];

for (let j = 0; j < componentsArr.length; j = j + 1) {
	const componentsList = document.querySelectorAll(
		componentsArr[j].getSelector()
	);
	if (componentsList.length) {
		for (const component of componentsList) {
			new componentsArr[j](component);
		}
	}
}
