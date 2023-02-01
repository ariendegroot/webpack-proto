/**
 *
 * navigation.js
 * functions for navigation
 *
 **/

export default class Navigation {
	constructor(elem) {
		this.elem = elem;
		this.navigationItems = this.elem.querySelectorAll('ul li a');
		this.navigation = this.elem.querySelector('ul');
		this.addClass(this.navigationItems);
		this.toggle = this.elem.querySelector('.toggle-menu');
		this.bindListeners();
	}

	addClass(navigation) {
		for (let i = 0; i < navigation.length; i++) {
			let item = navigation[i];
			if (item.innerText === 'Doneer') {
				item.classList.add('btn');
				item.classList.add('btn-primary');
				item.parentNode.classList.add('donate-button');
			}
		}
	}

	bindListeners() {
		this.toggle.addEventListener('click', () => {
			this.navigation.classList.toggle('show');
			this.elem.classList.toggle('active');
			document.querySelector('body').classList.toggle('nav-active');
		});
	}

	static getSelector() {
		return '[data-navigation]';
	}
}
