.PHONY: default install help start build test test-accessibility

.DEFAULT_GOAL := help

install: ## Install the dependencies
	yarn

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## Run the app in dev mode
	yarn start

build: ## Build the app in production mode
	yarn build

test: ## Run the tests
	yarn test

test-accessibility: ## Run the accessibility tests
	@if [ "$(build)" != "false" ]; then \
		echo 'Building application (call "make build=false test-accessibility" to skip the build)...'; \
		${MAKE} build; \
	fi
	yarn test:accessibility
