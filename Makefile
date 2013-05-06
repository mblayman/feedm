JSHINT=./node_modules/.bin/jshint
PATH:=$(PATH):$(HOME)/.gem/ruby/1.8/bin
RJS=./node_modules/.bin/r.js

# Stuff that shouldn't be in the production area.
PROD_EXTRAS=production/node_modules \
            production/.git \
            production/.gitignore \
            production/build.txt \
            production/compressor.py \
            production/css/main.css \
            production/icon.xcf \
            production/Makefile \
            production/marketing \
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
	$(RJS) -o js/app.build.js
	cat production/css/main.css >> production/css/jquery.mobile-1.3.0.css
	rm -rf $(PROD_EXTRAS)
	cd production; sed '/main.css/d' index.html > i.bak; mv i.bak index.html
	cd production; sed '/cordova.js/d' index.html > firefox.html
	cd production; mv js/main.js .; rm -rf js/*; mv main.js js

package: prod
	cd production; zip -r ../feedm.zip *

