# 📘 Practice 3 - Services and Internal DNS in Kubernetes

## 🎯 Goal
Understand how Kubernetes Services work to expose and connect pods internally and externally. Learn how DNS resolution works inside a cluster.

---

## 📚 What You’ll Learn
- What is a Kubernetes **Service**
- The difference between **ClusterIP**, **NodePort**, and **LoadBalancer**
- How DNS and service discovery works inside the cluster
- How to access services from the browser (Minikube)

---

## 🧱 What We'll Do
1. Create a simple Deployment (e.g. `nginx`)
2. Create a Service of type `ClusterIP` to expose it internally
3. Create a Service of type `NodePort` to access it externally (via browser)
4. Use `kubectl` to inspect service behavior
5. Test DNS resolution using a temporary debug pod

---

## 📁 Folder Structure
```
Practice3_K8s_ServicesDNS/
├── README.md
├── manifests/
│   ├── nginx-deployment.yaml
│   ├── clusterip-service.yaml
│   ├── nodeport-service.yaml
├── Makefile
└── screenshots/ (optional)
```

---

## 🛠️ Step-by-Step Instructions

### 1️⃣ Deploy the App
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 2
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
```bash
kubectl apply -f manifests/nginx-deployment.yaml
kubectl get pods
```

---

### 2️⃣ Internal Service: ClusterIP
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-clusterip
spec:
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```
```bash
kubectl apply -f manifests/clusterip-service.yaml
kubectl get svc
```

> ✅ This service is accessible **only from inside the cluster**.

---

### 3️⃣ External Access: NodePort
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30036
  type: NodePort
```
```bash
kubectl apply -f manifests/nodeport-service.yaml
minikube service nginx-nodeport --url
```
> 🌍 Access the returned URL in your browser to see the app

---

### 4️⃣ DNS Testing (Debug Pod)
Run a debug pod to test internal DNS:
```bash
kubectl run test-shell --rm -it --image=busybox -- /bin/sh
nslookup nginx-clusterip
exit
```
> 🧠 DNS is managed by CoreDNS inside the cluster — every service has a name and a cluster-wide DNS entry.

---

## ✅ Outcomes
- Understood how to expose apps inside and outside the cluster
- Learned difference between NodePort and ClusterIP
- Saw how DNS and service names work inside Kubernetes

---

## 🧼 Makefile
```makefile
apply-deployment:
	kubectl apply -f manifests/nginx-deployment.yaml

apply-clusterip:
	kubectl apply -f manifests/clusterip-service.yaml

apply-nodeport:
	kubectl apply -f manifests/nodeport-service.yaml

clean:
	kubectl delete -f manifests/nginx-deployment.yaml --ignore-not-found
	kubectl delete -f manifests/clusterip-service.yaml --ignore-not-found
	kubectl delete -f manifests/nodeport-service.yaml --ignore-not-found
```

Run with:
```bash
make apply-deployment
make apply-clusterip
make apply-nodeport
make clean
```

---