JSHINT=./node_modules/.bin/jshint
PATH:=$(PATH):$(HOME)/.gem/ruby/1.8/bin
RJS=./node_modules/.bin/r.js

# Stuff that shouldn't be in the production area.
PROD_EXTRAS=production/node_modules \
            production/.git \
            production/.gitignore \
            production/app.build.js \
            production/build.txt \
            production/date.js \
            production/Makefile \
            production/models \
            production/templates \
            production/vendor \
            production/views \
            production/README.md

go:
	python -m SimpleHTTPServer 8000

sass: dev
	@PATH="$(PATH)" sass --watch feedm.scss:feedm.css --style compressed

hint: dev
	$(JSHINT) models/*.js views/*.js *.js

dev: rjs
	@which sass &> /dev/null || gem install sass --user-install
	@test -e $(JSHINT) || npm install jshint

clean:
	rm -rf production feedm.zip

rjs:
	@test -e $(RJS) || npm install requirejs

prod: clean rjs
	$(RJS) -o app.build.js
	rm -rf $(PROD_EXTRAS)

package: prod
	cd production; zip -r ../feedm.zip *

