apply-pod:
	kubectl apply -f manifests/pod.yaml

apply-replicaset:
	kubectl delete -f manifests/pod.yaml --ignore-not-found
	kubectl apply -f manifests/replicaset.yaml

apply-deployment:
	kubectl delete -f manifests/replicaset.yaml --ignore-not-found
	kubectl apply -f manifests/deployment.yaml

clean:
	kubectl delete -f manifests/pod.yaml --ignore-not-found
	kubectl delete -f manifests/replicaset.yaml --ignore-not-found
	kubectl delete -f manifests/deployment.yaml --ignore-not-found