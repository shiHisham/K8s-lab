## ✅ Kubernetes Local Setup

As part of my Kubernetes learning journey, I installed and configured a local environment using:

### 🧰 Installed Tools
- **kubectl**: v1.29.2 – Kubernetes CLI
- **Minikube**: v1.35.0 – Local Kubernetes cluster (Docker driver)
- **Helm**: v3.17.2 – Kubernetes package manager
- **VS Code** with **YAML RedHat plugin** – for YAML syntax highlighting and validation

### 📦 Installations (via Chocolatey on Windows)
```bash
choco install kubernetes-cli -y --force
choco install minikube -y
choco install kubernetes-helm -y --force




===============================================================
# 📦 Practice 1 - Kubernetes Basics

## 🎯 Goal
Deploy your very first application on Kubernetes using raw YAML files and `kubectl` commands. This practice is designed to help you understand:

- The role of **pods**, **deployments**, and **services**
- How to write and apply basic Kubernetes manifests
- How to use `kubectl` to inspect and interact with the cluster

---

## 🧱 What We'll Do

1. Write a simple **Pod manifest** using NGINX
2. Replace it with a **Deployment** with 3 replicas
3. Expose it via a **Service** (NodePort)
4. Explore the running pods using `kubectl`
5. Open your app in the browser
6. Clean up the environment

---

## 📁 Folder Structure
```
Practice1_K8s_Basics/
├── README.md
├── manifests/
│   ├── nginx-pod.yaml
│   ├── nginx-deployment.yaml
│   └── nginx-service.yaml
└── screenshots/ (optional)
```

---

## 🛠️ Step-by-Step Instructions

### 1️⃣ Create the Pod Manifest (Optional for Reference)
`manifests/nginx-pod.yaml`
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: nginx:latest
      ports:
        - containerPort: 80
```
Apply it:
```bash
kubectl apply -f manifests/nginx-pod.yaml
```
Check the pod:
```bash
kubectl get pods
kubectl describe pod nginx-pod
kubectl logs nginx-pod
```
Delete it before continuing:
```bash
kubectl delete -f manifests/nginx-pod.yaml
```

---

### 2️⃣ Create a Deployment with Replicas
`manifests/nginx-deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
```
Apply it:
```bash
kubectl apply -f manifests/nginx-deployment.yaml
```
Check running pods:
```bash
kubectl get deployments
kubectl get pods
kubectl describe deployment nginx-deployment
```

---

### 3️⃣ Create a Service
`manifests/nginx-service.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30036  # Optional: fixed port
```
Apply the service:
```bash
kubectl apply -f manifests/nginx-service.yaml
```
Find the URL to open:
```bash
minikube service nginx-service --url
```

---

### 4️⃣ Clean Up
```bash
kubectl delete -f manifests/nginx-service.yaml
kubectl delete -f manifests/nginx-deployment.yaml
```

---

## ✅ Outcomes
- First successful Kubernetes Deployment
- Understood difference between Pod and Deployment
- Learned how to scale replicas
- Accessed service via external port

---

## 🧠 Bonus Tips
- Use `kubectl scale deployment nginx-deployment --replicas=5` to test scaling
- Try `kubectl rollout restart deployment nginx-deployment`
- Use `kubectl describe` to inspect changes

---

## 📸 Screenshots (optional)
Add your screenshots here if you want to keep visual proof of progress!
