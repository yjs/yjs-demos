demos = monaco codemirror codemirror.next prosemirror prosemirror-versions quill

all : $(demos)

# remove all generated files
clean :
	rm -rf */dist */node_modules node_modules

static-content :
	make -j all
	rm -rf node_modules */node_modules

$(demos) : % : %/dist
.PHONY : $(demos)

%/node_modules: %/package.json %/package-lock.json
	cd $* && npm ci
	touch $@

.NOTINTERMEDIATE: $(patsubst %,%/node_modules,$(demos))

node_modules : package.json package-lock.json
	-npm ci
	-touch node_modules

.SECONDEXPANSION:
%/dist : node_modules %/node_modules $$(filter-out %/dist %/node_modules,$$(wildcard $$*/*))
	cd $* && npm run dist
	touch $@

.PHONY: serve
serve : $(demos) demo-server/node_modules
	cd demo-server && npm start

