

all :
	make -j demos

static-content : all
	rm -rf node_modules */node_modules

demos: monaco cm cm6 pm pm-versions quill

node_modules :
	npm ci

# build demo-server
demo-server :
	cd demo-server
	npm ci
.PHONY demo-server

# build codemirror 5 demo
cm : node_modules
	cd codemirror
	npm ci
	npm run dist

# build codemirror 6 demo
cm6 : node_modules
	cd codemirror.next
	npm ci
	npm run dist

# build prosemirror demo
pm : node_modules
	cd prosemirror
	npm ci
	npm run dist

# build prosemirror-versions demo
pm-versions : node_modules
	cd prosemirror-versions
	npm ci
	npm run dist

# build quill demo
quill : node_modules
	cd quill
	npm ci
	npm run dist

# build monaco demo
monaco : node_modules
	cd monaco
	npm ci
	npm run dist
.PHONY : monaco

# remove all generated files
clean :
	rm -rf */dist */node_modules node_modules

.ONESHELL :
