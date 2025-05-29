install-argocd:
	kubectl create ns argocd || true
	kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

port-argocd:
	kubectl port-forward svc/argocd-server -n argocd 8080:443

open-ui:
	@echo "ArgoCD UI: https://localhost:8080"
	@echo "Username: admin"
	@echo "Password: $$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)"

apply-app:
	kubectl apply -f manifests/argocd-app.yaml

reset:
	kubectl delete ns argocd --ignore-not-found
	kubectl delete ns gitops-app --ignore-not-found
