JSHINT=./node_modules/.bin/jshint
PATH:=$(PATH):$(HOME)/.gem/ruby/1.8/bin
RJS=./node_modules/.bin/r.js

go:
	python -m SimpleHTTPServer 8000

sass: dev
	@PATH="$(PATH)" sass --watch feedm.scss:feedm.css --style compressed

hint: dev
	$(JSHINT) models/*.js views/*.js *.js

dev: rjs
	@which sass &> /dev/null || gem install sass --user-install
	@test -e $(JSHINT) || npm install jshint

rjs:
	@test -e $(RJS) || npm install requirejs

prod: rjs
	$(RJS) -o app.build.js

