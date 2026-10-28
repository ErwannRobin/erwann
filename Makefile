PM ?= bun
RUN := $(PM) run

.DEFAULT_GOAL := help
.PHONY: help install dev build build-dev preview lint typecheck check clean

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z_-]+:.*## / {printf "  %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	$(PM) install

node_modules: package.json
	$(PM) install
	@touch node_modules

dev: node_modules ## Start the dev server
	$(RUN) dev

build: node_modules ## Production build into dist/
	$(RUN) build

build-dev: node_modules ## Development-mode build
	$(RUN) build:dev

preview: build ## Serve the production build locally
	$(RUN) preview

lint: node_modules ## Run ESLint
	$(RUN) lint

typecheck: node_modules ## Type-check the app
	npx tsc --noEmit -p tsconfig.app.json

check: lint typecheck build ## Lint, type-check and build

clean: ## Remove build output
	rm -rf dist
