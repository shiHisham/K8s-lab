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
2. Expose it via a **Service** (NodePort)
3. Explore the running pod using `kubectl`
4. Open your app in the browser
5. Clean up the environment

---

## 📁 Folder Structure
```
Practice1_K8s_Basics/
├── README.md
├── manifests/
│   ├── nginx-pod.yaml
│   └── nginx-service.yaml
└── screenshots/ (optional)
```

---

## 🛠️ Step-by-Step Instructions

### 1️⃣ Create the Pod Manifest
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

---

### 2️⃣ Create a Service
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
      nodePort: 30036  # Can be between 30000–32767
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

### 3️⃣ Clean Up
```bash
kubectl delete -f manifests/nginx-service.yaml
kubectl delete -f manifests/nginx-pod.yaml
```

---

## ✅ Outcomes
- First successful Kubernetes deployment
- Understood Pod/Service structure
- Used kubectl to manage cluster

---

## 🧠 Bonus Tips
- Use `kubectl explain pod` to learn about YAML fields
- Try scaling with Deployments next!

---

## 📸 Screenshots