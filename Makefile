demos = monaco codemirror codemirror.next prosemirror prosemirror-versions quill
dists = $(patsubst %,%/dist,$(demos))
node_modules = $(patsubst %,%/node_modules,$(demos)) demo-server/node_modules

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: dist
dist: $(demos) # Build all distribution files

.PHONY: clean
clean : # remove all generated files
	rm -rf */dist */node_modules node_modules

static-content : # Build the demos so that they can be served via a CDN
	make -j dist
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

$(demos) : % : %/dist # Build a specific demo
.PHONY : $(demos)

demo-server : demo-server/node_modules 
	cd demo-server && npm start
.PHONY : demo-server

# Requires parallel execution of make targets
_serve: demo-server $(demos)

serve: # Start demo server and build & watch all demos in parallel
	@$(MAKE) -j _serve

