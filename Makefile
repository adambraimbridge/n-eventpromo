# n-gage bootstrapping logic
node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	npx rollup -c tooling/rollup/index.js

unit-test:
	npx jest -c tooling/jest/index.js

test:
	make verify
	make unit-test
