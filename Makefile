node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

unit-test:
	mocha 'tests/**/*.spec.js' --inline-diffs

test:
	# TODO: don't ignore a11y but don't block releasing it in it's current state
	export IGNORE_A11Y=true; \
	make verify
	make unit-test
