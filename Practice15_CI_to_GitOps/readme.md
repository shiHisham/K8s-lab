# 🚀 Practice 15 – CI → GitOps Pipeline (Kubernetes + ArgoCD)

## 🌟 Goal

Simulate a real CI/CD system where **GitHub Actions** updates `values.yaml` in a Git repo, and **ArgoCD** automatically syncs the change to Kubernetes.

---

## 📚 What You'll Learn

* How to connect CI pipelines (GitHub Actions) to GitOps CD (ArgoCD).
* How to trigger deployments by committing changes to Git.
* How ArgoCD detects and syncs Git changes automatically.
* How to structure a complete CI → GitOps workflow.

---

## 🔧 Tools Used

* 🐳 Minikube (local Kubernetes cluster)
* 🎯 ArgoCD (latest stable)
* 🛠 kubectl + Makefile + argocd CLI
* 🔐 Private GitHub Repo: `https://github.com/shiHisham/K8s-lab`
* ⚙️ GitHub Actions

---

## 📂 Folder Structure

```
Practice15_CI_to_GitOps/
├── .github/workflows/deploy.yaml    # CI workflow
├── my-helm-app/                     # Helm chart app
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
├── manifests/
│   └── argocd-app.yaml              # ArgoCD Application manifest
├── Makefile
└── README.md
```

---

## 🔄 What Was Done

### ✅ 1. Set up CI Workflow

* `.github/workflows/deploy.yaml` modifies `values.yaml` (e.g. replicaCount) and commits back to Git.
* Triggers on push to `main` branch.

### ✅ 2. Configured ArgoCD Application

* `manifests/argocd-app.yaml` defines:

  * `repoURL`: GitHub repo URL
  * `path`: Path to `my-helm-app`
  * `syncPolicy`: `automated`, `prune`, `selfHeal`
* ArgoCD watches the Git repo and auto-syncs changes.

### ✅ 3. Connected Private GitHub Repo

* Used `argocd repo add` with GitHub token to allow ArgoCD to access the private repo.

### ✅ 4. Pushed Change to Trigger CI

* Committed a manual change to `values.yaml`.
* GitHub Actions ran, modified `values.yaml`, and pushed back.

### ✅ 5. Verified ArgoCD Sync

* ArgoCD detected the Git change.
* Auto-sync applied the new configuration to the cluster.
* Verified via:

```bash
kubectl get deployment -n helm-gitops helm-nginx-ci -o yaml | grep replicas
```

---

## 🧠 Key Concepts

* **GitOps CD**: ArgoCD continuously syncs cluster state from Git.
* **CI Integration**: GitHub Actions modifies Git files, triggering ArgoCD sync.
* **Auto-Sync & Self-Healing**: ArgoCD automatically applies and corrects drift.
* **Private Repo Integration**: Secure access to GitHub repo.

---

## 🛠️ Makefile

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

## ✅ Status

* [x] GitHub Actions pipeline configured and working.
* [x] ArgoCD auto-syncs changes from Git.
* [x] Full CI → GitOps pipeline tested and verified.
* [x] Cluster reflects updated values from Git.

---

## 🔜 Next Step

Move to **Terraform Fundamentals** to provision AWS infrastructure (VPCs, EKS, RDS, IAM) and complete the transition from Kubernetes learning to real-world DevOps engineering.

---

## 📜 License

This project is part of a self-directed Kubernetes + DevOps learning series. Free to use, contribute, and improve ✨
