# 📘 Practice 12 - Multi-Environment Deployments in Kubernetes

## 🎯 Goal
Simulate a real-world production scenario where the same application is deployed in **dev**, **staging**, and **prod** environments. Each environment should:
- Use its own Kubernetes namespace
- Share a common base manifest or Helm chart
- Inject environment-specific configurations

## 📚 What You’ll Learn
- Managing multiple environments using Kubernetes best practices
- Using **Kustomize** overlays to reuse manifests with per-environment customization
- Automating deployment with Makefile targets
- Reading both env vars and config files from a Node.js app
- Structuring a clean multi-environment project
- Working with local Docker images inside Minikube

## 🧱 What We’ll Do
- Build a small Node.js app that prints its environment and config file content
- Containerize the app
- Deploy the app to 3 environments using **Kustomize**
- Automate all actions using a `Makefile`
- Test all endpoints to verify env-specific behavior

## 🛠 Step-by-step
1. ✅ Create `app/server.js` that logs env and config file
2. ✅ Create a `Dockerfile` to build a lightweight container
3. ✅ Use `imagePullPolicy: Never` to use local Minikube image
4. ✅ Add `eval $(minikube docker-env)` before building the image
5. ✅ Create base manifests in `base/` directory
6. ✅ Create overlays for each environment in `overlays/dev|staging|prod/`
7. ✅ Write a Makefile to automate common tasks
8. ✅ Fully test and verify all environments

## 📁 Folder Structure
```
Practice12_K8s_MultiEnv/
├── app/
│   └── server.js
├── Dockerfile
├── Makefile
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
├── overlays/
│   ├── dev/
│   │   ├── configmap.yaml
│   │   ├── kustomization.yaml
│   │   └── namespace.yaml
│   ├── staging/
│   │   ├── configmap.yaml
│   │   ├── kustomization.yaml
│   │   └── namespace.yaml
│   └── prod/
│       ├── configmap.yaml
│       ├── kustomization.yaml
│       └── namespace.yaml
└── README.md
```

## ✅ Outcomes
After this practice, you will be able to:
- Use `Kustomize` to structure multi-environment Kubernetes setups
- Configure env-specific values via ConfigMaps and env vars
- Run local Docker images with Minikube (`imagePullPolicy: Never`)
- Use a Makefile to automate builds, deployments, and teardown

## 🧼 Makefile Targets
```Makefile
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
```

## 🤔 Why Kustomize?
We use **Kustomize** (instead of Helm) because this project focuses on reusing **plain Kubernetes YAML** with small per-env changes. Helm is better when you want to template whole charts. Kustomize is lighter and more readable for beginners and real DevOps engineers in simpler multi-env setups.

## 🧪 Full Test and Verification

### 🛠 Build the Docker image
```bash
make build
```
Output: ✅ Image built successfully inside Minikube

### 🚀 Deploy all environments
```bash
make deploy-all
```
Output:
```
namespace/dev created
configmap/practice12-config created
...
```

### 🔍 Check pod status
```bash
kubectl get pods -n dev
kubectl get pods -n staging
kubectl get pods -n prod
```
All pods should be in `Running` state.

### 📜 View logs (optional)
```bash
kubectl logs -n dev -l app=practice12-app
```
Output: `App running on port 3000`

### 🚪 Port-forward and test each env
```bash
make port-dev
curl localhost:3000
```
Expected:
```
ENV: dev
FILE: Welcome to the dev environment!
```
Repeat for `staging` and `prod`.

### 🧼 Clean everything
```bash
make delete-all
```
All namespaces and resources should be removed.

## ✅ Final Result
You now have a fully working, production-like Kubernetes setup with:
- Environment isolation
- Shared base configuration
- Automated workflow
- Real testing of env-specific responses

---
