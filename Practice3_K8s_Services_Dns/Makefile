apply-deployment:
	kubectl apply -f manifests/nginx-deployment.yaml

apply-clusterip:
	kubectl apply -f manifests/clusterip-service.yaml

apply-nodeport:
	kubectl apply -f manifests/nodeport-service.yaml

clean:
	kubectl delete -f manifests/nginx-deployment.yaml --ignore-not-found
	kubectl delete -f manifests/clusterip-service.yaml --ignore-not-found
	kubectl delete -f manifests/nodeport-service.yaml --ignore-not-found