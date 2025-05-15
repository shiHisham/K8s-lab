build:
	docker build -t health-demo:latest .

apply:
	kubectl apply -f manifests/

clean:
	kubectl delete -f manifests/ --ignore-not-found