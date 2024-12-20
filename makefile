MODEL ?= llama3.2:1b

pull:
	docker exec -it ollama ollama pull $(MODEL)

up:
	docker-compose up -d && docker exec -it ollama ollama pull $(MODEL)
