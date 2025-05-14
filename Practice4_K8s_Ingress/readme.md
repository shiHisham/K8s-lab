# 📘 Practice 4 - Ingress and Domain-Based Routing in Kubernetes

## 🎯 Goal
Learn how to expose services using domain names (like `hello.local`) using an Ingress Controller. Understand how Ingress compares to NodePort and ClusterIP and why it’s used in real-world deployments.

---

## 📚 What You’ll Learn
- What is an **Ingress** in Kubernetes
- Difference between **ClusterIP**, **NodePort**, **LoadBalancer**, and **Ingress**
- How to install and configure the **NGINX Ingress Controller**
- How to define **Ingress rules** to route traffic by hostname
- How to update your local DNS resolution using `/etc/hosts`

---

## 🧱 What We'll Do
1. Deploy two basic apps (`hello-app` and `world-app`)
2. Create services for both apps (internal exposure)
3. Enable NGINX Ingress Controller
4. Patch the controller service to type `LoadBalancer`
5. Create an Ingress rule to map hostnames to services
6. Update `/etc/hosts` to simulate DNS resolution

---

## 📁 Folder Structure
```
Practice4_K8s_Ingress/
├── README.md
├── manifests/
│   ├── hello-deployment.yaml
│   ├── world-deployment.yaml
│   ├── hello-service.yaml
│   ├── world-service.yaml
│   └── ingress.yaml
├── Makefile
└── screenshots/ (optional)
```

---

## 🛠️ Step-by-Step Instructions

### 1️⃣ Deploy Sample Apps
```bash
kubectl apply -f manifests/hello-deployment.yaml
kubectl apply -f manifests/world-deployment.yaml
```
These apps use the `hashicorp/http-echo` container to return a custom message.

---

### 2️⃣ Create Services
```bash
kubectl apply -f manifests/hello-service.yaml
kubectl apply -f manifests/world-service.yaml
```
Services expose each app within the cluster via port `80`, forwarding traffic to container port `5678`.

---

### 3️⃣ Enable Ingress Controller
Enable the official ingress addon from Minikube:
```bash
minikube addons enable ingress
```
Wait until the pods are running:
```bash
kubectl get pods -n ingress-nginx
```
If the controller is not of type `LoadBalancer`, patch it:
```bash
kubectl patch svc ingress-nginx-controller -n ingress-nginx \
  -p '{"spec": {"type": "LoadBalancer"}}'
```

---

### 4️⃣ Create Ingress Resource
```bash
kubectl apply -f manifests/ingress.yaml
```
This maps `hello.local` and `world.local` to their respective services.

---

### 5️⃣ Update Hosts File (Simulate DNS)
```bash
sudo nano /etc/hosts
```
Add the Ingress IP:
```
192.168.49.2 hello.local
192.168.49.2 world.local
```
Use `kubectl describe ingress example-ingress` to confirm the IP (usually matches Minikube IP).

---

### 6️⃣ Test Routing
Use `curl` to simulate browser access:
```bash
curl -H "Host: hello.local" http://192.168.49.2
curl -H "Host: world.local" http://192.168.49.2
```
Or open in a browser: `http://hello.local`, `http://world.local`

---

## ✅ Outcomes
- Understood the role of an **Ingress Controller**
- Successfully exposed services using **host-based routing**
- Practiced internal vs external access with **Service** and **Ingress**

---

## 🧼 Makefile
```makefile
apply-apps:
	kubectl apply -f manifests/hello-deployment.yaml
	kubectl apply -f manifests/world-deployment.yaml

apply-services:
	kubectl apply -f manifests/hello-service.yaml
	kubectl apply -f manifests/world-service.yaml

apply-ingress:
	kubectl apply -f manifests/ingress.yaml

clean:
	kubectl delete -f manifests/hello-deployment.yaml --ignore-not-found
	kubectl delete -f manifests/world-deployment.yaml --ignore-not-found
	kubectl delete -f manifests/hello-service.yaml --ignore-not-found
	kubectl delete -f manifests/world-service.yaml --ignore-not-found
	kubectl delete -f manifests/ingress.yaml --ignore-not-found
```

Run:
```bash
make apply-apps
make apply-services
make apply-ingress
make clean
```

---

## 📸 Screenshots (optional)
Include screenshots of browser responses to `http://hello.local` and `http://world.local` if you'd like.
