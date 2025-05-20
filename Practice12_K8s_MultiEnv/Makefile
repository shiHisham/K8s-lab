IMAGE_NAME=practice12-multienv
PORT=3000

build:
	eval $$(minikube docker-env) && docker build -t $(IMAGE_NAME):latest .

deploy-%:
	kubectl apply -k overlays/$*

delete-%:
	kubectl delete -k overlays/$*

deploy-all:
	make deploy-dev && make deploy-staging && make deploy-prod

delete-all:
	make delete-dev && make delete-staging && make delete-prod

port-%:
	kubectl port-forward svc/practice12-service -n $* $(PORT):3000
