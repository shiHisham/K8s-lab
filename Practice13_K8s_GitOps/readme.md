# 🚀 Practice 13 – GitOps with ArgoCD

## 🌟 Goal

Simulate a GitOps deployment flow using **ArgoCD** on a local Kubernetes cluster (Minikube), using Git as the single source of truth. Automate app syncing, detect drift, and demonstrate self-healing deployments.

---

## 📋 What You'll Learn

* The core principles of **GitOps**
* How **ArgoCD** manages Continuous Delivery (CD)
* Syncing Kubernetes apps from Git
* Detecting and correcting configuration drift
* Structuring a clean GitOps project with Makefile automation

---

## 🔧 Tools Used

* 🐳 Minikube (local Kubernetes cluster)
* 🎯 ArgoCD (latest stable)
* 🛠 kubectl + Makefile
* 📂 Git (local repo using `file://`)

---

## 📂 Folder Structure

```
Practice13_K8s_GitOps/
├── my-gitops-app/
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
├── manifests/
│   └── argocd-app.yaml
├── Makefile
└── README.md
```

---

## 🔁 What is GitOps?

> GitOps is a modern DevOps approach where **Git is the single source of truth** for your infrastructure and application deployment.

With GitOps:

* You **push to Git**, not to your cluster
* A tool like **ArgoCD** watches your Git repo
* If your cluster drifts from Git, ArgoCD auto-corrects it (self-heals)
* Changes are **auditable** and **version-controlled**

---

## ⚖️ Why ArgoCD?

ArgoCD is a **GitOps controller** that:

* Continuously watches a Git repo
* Syncs Kubernetes manifests automatically
* Supports Helm, Kustomize, plain YAML
* Offers a powerful UI to manage applications
* Provides health, sync, and drift status of all apps

---

## 🔄 How Auto Sync Works

In this project, the ArgoCD Application manifest includes:

```yaml
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - CreateNamespace=true
```

This tells ArgoCD to:

* Automatically sync changes from Git
* Prune deleted resources
* Self-heal if the cluster state drifts

---

## 🛠️ How to Use This Project

### 1. Install ArgoCD

```bash
make install-argocd
```

### 2. Port-forward the UI

```bash
make port-argocd
```

Then open: `https://localhost:8080`

Default login:

* Username: `admin`
* Password: run `make open-ui`

### 3. Apply the ArgoCD Application

```bash
make apply-app
```

### 4. Watch It Sync

Visit the UI and watch your app (`hello-nginx`) sync to the `gitops-app` namespace.

---

## 🔮 Drift Detection Test

Run this:

```bash
kubectl scale deployment hello-app -n gitops-app --replicas=3
```

Then go back to ArgoCD:

* The app will become **OutOfSync**
* ArgoCD will revert it automatically to match Git state

This is **self-healing in action** ✅

---

## 📄 Makefile Targets

```makefile
install-argocd:
	kubectl create ns argocd || true
	kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

port-argocd:
	kubectl port-forward svc/argocd-server -n argocd 8080:443

open-ui:
	@echo "ArgoCD UI: https://localhost:8080"
	@echo "Username: admin"
	@echo "Password: $$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath=\"{.data.password}\" | base64 -d)"

apply-app:
	kubectl apply -f manifests/argocd-app.yaml

reset:
	kubectl delete ns argocd --ignore-not-found
	kubectl delete ns gitops-app --ignore-not-found
```

---

## 💚 Status

* [x] ArgoCD Installed & UI Working
* [x] App Synced from Git (file path in this case)
* [x] Auto Sync & Drift Correction Confirmed
* [x] Clean Project Structure
* [x] Makefile

---


## 📜 License

This project is part of a self-directed Kubernetes learning journey.
Free to use, study, and improve ✨
