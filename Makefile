WGET=wget --no-check-certificate
RHINO=rhino1_7R4
JSHINT=jshint

hint: dev
	@java -jar $(RHINO)/js.jar $(JSHINT)/build/jshint-rhino.js feedm.js

dev:
	@test -d $(RHINO) || ($(WGET) https://github.com/downloads/mozilla/rhino/$(RHINO).zip && unzip $(RHINO).zip  && rm $(RHINO).zip)
	@test -d $(JSHINT) || (git clone https://github.com/jshint/jshint.git && make -C $(JSHINT) rhino)

