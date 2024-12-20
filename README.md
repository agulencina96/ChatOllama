# Chat Ollama

## Descripción

Este proyecto busca crear una interfaz y gestor de chats para interactura a través [[Ollama](https://github.com/ollama/ollama)] con diferentes LLMs.

## Requerimientos

- .NET 9
- Docker y Docker Compose
- (Opcional) Make

## ¿Cómo correr el proyecto?

1. Clonar el repositorio
2. Correr `make up` o `docker-compose up` en la raíz del proyecto.
3. En caso de haber usado `docker-compose up`, correr `docker exec -it ollama ollama pull llama3.2:1b` para descargar el modelo de LLM.
