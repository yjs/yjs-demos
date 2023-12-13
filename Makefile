demos = monaco codemirror codemirror.next prosemirror prosemirror-versions quill
dists = $(patsubst %,%/dist,$(demos))
node_modules = $(patsubst %,%/node_modules,$(demos)) demo-server/node_modules

all : $(demos)

# remove all generated files
clean :
	rm -rf */dist */node_modules node_modules

static-content :
	make -j all
	rm -rf node_modules */node_modules

$(node_modules) : %/node_modules: %/package.json %/package-lock.json
	cd $* && npm ci
	@touch $@

.NOTINTERMEDIATE: $(node_modules)

node_modules : package.json package-lock.json
	npm ci
	@touch node_modules

.SECONDEXPANSION:

ifeq ($(MAKECMDGOALS),_serve)
$(dists) : %/dist : %/node_modules node_modules
	cd $* && npm run watch
.PHONY: $(dists)
else
$(dists) : %/dist : node_modules %/node_modules $$(filter-out %/dist %/node_modules,$$(wildcard $$*/*))
	cd $* && npm run dist
	@touch $@
endif

$(demos) : % : %/dist
.PHONY : $(demos)

demo-server : $(node_modules) node_modules
	cd demo-server && npm start
.PHONY : demo-server

# Requires parallel execution of make targets
_serve: demo-server $(demos)

# Start demo server and build & watch all demos in parallel
serve:
	@$(MAKE) -j _serve


