MODEL ?= llama3.2:1b

pull:
	docker exec -it ollama ollama pull $(MODEL)

up:
	docker-compose up -d && docker exec -it ollama ollama pull $(MODEL)

generate-client:
	kiota generate -l typescript -d http://localhost:5010/openapi/v1.json -c client -o ./web-client/src/app/_client
	find ./web-client/src/app/_client -type f -name '*.ts' -exec sed -i 's/index.js//g' {} +

dev:
	cd web-client && yarn dev --turbo