build:
	eval $$(minikube docker-env) && docker build -t health-demo-p7:latest .

apply:
	kubectl apply -f manifests/

port:
	kubectl port-forward svc/configmap-demo-svc 8080:80

edit:
	kubectl patch configmap app-config \
      --type merge \
      -p '{"data":{"APP_GREETING":"Bonjour depuis le patch !"}}'

restart:
	kubectl delete pod -l app=configmap-demo

clean:
	kubectl delete -f manifests/ --ignore-not-found