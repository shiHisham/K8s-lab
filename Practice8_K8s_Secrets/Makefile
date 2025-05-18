build:
	eval $$(minikube docker-env) && docker build -t health-demo-p8:latest .

apply:
	kubectl apply -f manifests/

port:
	kubectl port-forward svc/secret-demo-svc 8080:80

clean:
	kubectl delete -f manifests/ --ignore-not-found

reload:
	kubectl delete pod -l app=secret-demo

recreate-secret:
	kubectl delete secret app-secret-p8 --ignore-not-found
	kubectl create secret generic app-secret-p8 \
		--from-literal=DB_PASSWORD="new-pass" \
		--from-literal=api-token.txt="new-token"
