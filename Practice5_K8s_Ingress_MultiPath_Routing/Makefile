apply:
	kubectl apply -f manifests/hello-deployment.yaml
	kubectl apply -f manifests/world-deployment.yaml
	kubectl apply -f manifests/hello-service.yaml
	kubectl apply -f manifests/world-service.yaml
	kubectl apply -f manifests/ingress.yaml

clean:
	kubectl delete -f manifests/hello-deployment.yaml --ignore-not-found
	kubectl delete -f manifests/world-deployment.yaml --ignore-not-found
	kubectl delete -f manifests/hello-service.yaml --ignore-not-found
	kubectl delete -f manifests/world-service.yaml --ignore-not-found
	kubectl delete -f manifests/ingress.yaml --ignore-not-found