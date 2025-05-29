# 🚀 Practice 14 – GitOps with Helm (via ArgoCD)

## 🌟 Goal

Simulate a real GitOps deployment using **ArgoCD** and a **Helm chart** from a private GitHub repository. Enable auto-sync, self-healing, and use ArgoCD to manage a Helm release declaratively through Git.

---

## 📋 What You'll Learn

* How ArgoCD deploys Helm charts directly from Git
* How to override Helm `values.yaml` in a GitOps workflow
* How to register and authenticate a private GitHub repo with ArgoCD
* How auto-sync and self-healing work with Helm
* How to structure a Helm-based GitOps project professionally

---

## 🔧 Tools Used

* 🐳 Minikube (local Kubernetes cluster)
* 🎯 ArgoCD (latest stable)
* 🛠 kubectl + Makefile + argocd CLI
* 📂 GitHub private repo: `https://github.com/shiHisham/K8s-lab`

---

## 📂 Folder Structure

```
Practice14_K8s_GitOps_Helm/
├── my-helm-app/
│   ├── charts/
│   ├── templates/
│   ├── values.yaml
│   └── Chart.yaml
├── manifests/
│   └── argocd-app.yaml
├── Makefile
└── README.md
```

---

## ⚖️ GitOps with Helm vs. Kustomize

| Feature                 | Practice 13 (Kustomize) | Practice 14 (Helm)      |
| ----------------------- | ----------------------- | ----------------------- |
| Resource format         | Raw YAML + overlays     | Helm templated chart    |
| Configuration injection | Kustomize patches       | `values.yaml` overrides |
| App structure in ArgoCD | Flat / limited view     | Full live tree view     |
| Templates / reusability | ❌ None                  | ✅ Yes (Helm)            |
| Best for                | Simple, internal apps   | Production-grade apps   |

---

## 🔄 What Was Done

### ✅ 1. Created a Helm chart-based app

* Used `helm create my-helm-app`
* Modified `values.yaml` and templates
* Structured it for ArgoCD to consume

### ✅ 2. Registered Private GitHub Repo with ArgoCD

```bash
argocd login localhost:8080 --insecure
argocd repo add https://github.com/shiHisham/K8s-lab.git \
  --username shiHisham \
  --password <personal-access-token> \
  --type git
```

### ✅ 3. Defined ArgoCD Application Manifest

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: helm-nginx
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/shiHisham/K8s-lab.git
    targetRevision: HEAD
    path: Practice14_K8s_GitOps_Helm/my-helm-app
    helm:
      valueFiles:
        - values.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: helm-gitops
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

### ✅ 4. Enabled Auto-Sync & Self-Heal

* Defined in YAML via `syncPolicy.automated`
* Synced on Git change without button click (after UI override was reset)
* Live pod changes reflected in UI

### ✅ 5. Changed `values.yaml` and tested GitOps flow

* Updated `replicaCount`
* Committed and pushed to GitHub
* ArgoCD auto-detected change and synced
* Verified replica scaling from ArgoCD UI

---

## 🛠️ Makefile Targets

```makefile
install-argocd:
	kubectl create ns argocd || true
	kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

port-argocd:
	kubectl port-forward svc/argocd-server -n argocd 8080:443

apply-app:
	kubectl apply -f manifests/argocd-app.yaml

open-ui:
	@echo "ArgoCD UI: https://localhost:8080"
	@echo "Username: admin"
	@echo "Password: $$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath=\"{.data.password}\" | base64 -d)"

reset:
	kubectl delete ns argocd --ignore-not-found
	kubectl delete ns helm-gitops --ignore-not-found
```

---

## 🔮 ArgoCD UI View

* Full tree of resources
* Real-time sync and health status
* Application auto-synced on Git commit
* Easily traceable live rollout via UI

---

## 📄 Status

* [x] Helm app created and pushed to private GitHub repo
* [x] ArgoCD registered the repo with credentials
* [x] Auto-sync, self-heal, and prune configured via YAML
* [x] Application synced and live-tested
* [x] Professional project structure maintained
    
---

## 📜 License

This project is part of a self-directed Kubernetes + DevOps learning series.
Free to use, contribute, and improve ✨
