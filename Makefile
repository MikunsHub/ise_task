COMPOSE_FILE=docker-compose.yml

docker-run:
	docker-compose -f ${COMPOSE_FILE} up -d