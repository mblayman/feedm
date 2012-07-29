JSHINT=./node_modules/.bin/jshint

hint: dev
	$(JSHINT) feedm.js

dev:
	@test -e $(JSHINT) || npm install jshint

