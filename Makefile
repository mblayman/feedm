JSHINT=./node_modules/.bin/jshint
PATH:=$(PATH):$(HOME)/.gem/ruby/1.8/bin

watch: dev
	PATH="$(PATH)" sass --watch feedm.scss:feedm.css

hint: dev
	$(JSHINT) feedm.js

dev:
	@test -e $(JSHINT) || npm install jshint
	@which sass &> /dev/null || gem install sass --user-install

