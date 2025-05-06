# 📘 Practice 2 - Core Kubernetes Resource Types

## 🎯 Goal
Deepen your understanding of the core built-in Kubernetes resources and how they relate to each other. You’ll work with individual YAML manifests and gain more insight into how Kubernetes organizes and manages your applications.

---

## 📚 What You’ll Learn
- Difference between **Pod**, **ReplicaSet**, and **Deployment**
- Why ReplicaSets exist and how they work behind Deployments
- How to apply, update, and delete each resource individually
- Relationship between **resources**, **controllers**, and **labels**

---

## 🧱 What We'll Do

1. Create a Pod manually
2. Replace it with a ReplicaSet
3. Replace the ReplicaSet with a Deployment
4. Observe how Kubernetes tracks ownership and labels
5. Use `kubectl` to explore resources at each level

---

## 📁 Folder Structure
```
Practice2_K8s_ResourceTypes/
├── README.md
├── manifests/
│   ├── pod.yaml
│   ├── replicaset.yaml
│   └── deployment.yaml
├── Makefile
└── screenshots/ (optional)
```

---

## 🛠️ Step-by-Step Instructions

### 1️⃣ Pod Manifest
Create a standalone pod:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  labels:
    app: demo
spec:
  containers:
    - name: web
      image: nginx:latest
      ports:
        - containerPort: 80
```
Apply it:
```bash
kubectl apply -f manifests/pod.yaml
kubectl get pods
```

---

### 2️⃣ ReplicaSet Manifest
Replace the pod with a ReplicaSet:
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-replicaset
spec:
  replicas: 2
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:
        app: demo
    spec:
      containers:
        - name: web
          image: nginx:latest
          ports:
            - containerPort: 80
```
Apply it:
```bash
kubectl delete -f manifests/pod.yaml
kubectl apply -f manifests/replicaset.yaml
kubectl get pods
kubectl get rs
```

---

### 3️⃣ Deployment Manifest
Now manage the ReplicaSet with a Deployment:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:
        app: demo
    spec:
      containers:
        - name: web
          image: nginx:latest
          ports:
            - containerPort: 80
```
Apply it:
```bash
kubectl delete -f manifests/replicaset.yaml
kubectl apply -f manifests/deployment.yaml
kubectl get deployments
kubectl get rs
kubectl get pods
```

---

## 🔍 Explore with `kubectl`
```bash
kubectl describe pod <pod-name>
kubectl describe rs <replicaset-name>
kubectl describe deployment <deployment-name>
```
- Notice how the **Deployment owns the ReplicaSet**, and the **ReplicaSet owns the Pods**
- Explore `ownerReferences` and labels inside the resource metadata

---

## ✅ Outcomes
- Understood how Pods, ReplicaSets, and Deployments relate
- Learned when to use each (and when not to)
- Practiced applying and exploring built-in resource types

---

## 🧼 Makefile
A utility Makefile to simplify workflow and cleanup:

Use the commands like:
```bash
make apply-pod
make apply-replicaset
make apply-deployment
make clean
```

---