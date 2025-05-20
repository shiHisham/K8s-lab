build:
	eval $$(minikube docker-env) && docker build -t health-demo-p10:latest .

install:
	helm install myapp ./myapp-chart

upgrade:
	helm upgrade myapp ./myapp-chart -f myapp-chart/values.yaml

uninstall:
	helm uninstall myapp

port:
	minikube service myapp-myapp-chart --url