# 📘 Practice 5 - Ingress Multi-Path Routing in Kubernetes

## 🎯 Goal
Route multiple apps through the same domain using different paths. Understand the flexibility of Ingress beyond host-based rules.

---

## 📚 What You’ll Learn
- How to define path-based Ingress rules
- The difference between host-based and path-based routing
- Why and how to patch the Ingress Controller to use LoadBalancer
- How to make requests work from the host using domain + path

---

## 🧱 What We'll Do

1. Deploy a **shared domain** (`myapp.local`) routing to 2 services:
   - `/hello` → hello-service
   - `/world` → world-service
2. Patch the Ingress controller to use LoadBalancer
3. Route traffic using fake DNS (`/etc/hosts`) and real paths

---

## 📁 Folder Structure
```
Practice5_K8s_Ingress_MultiPath_Routing/
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

### 1️⃣ Deploy Applications
```bash
kubectl apply -f manifests/hello-deployment.yaml
kubectl apply -f manifests/world-deployment.yaml
```

### 2️⃣ Create Services
```bash
kubectl apply -f manifests/hello-service.yaml
kubectl apply -f manifests/world-service.yaml
```

### 3️⃣ Create Ingress with Path Routing
```bash
kubectl apply -f manifests/ingress.yaml
```

### 4️⃣ Patch the Ingress Controller to Use LoadBalancer
By default, Minikube creates the Ingress Controller as `NodePort`. We need it to be `LoadBalancer` so we can assign a real IP.
```bash
kubectl patch svc ingress-nginx-controller -n ingress-nginx \
  -p '{"spec": {"type": "LoadBalancer"}}'
```

Then confirm:
```bash
kubectl get svc -n ingress-nginx
```
You should now see a real IP in the `EXTERNAL-IP` column.

---

### 5️⃣ Update /etc/hosts
Get the IP from either:
- `minikube ip`
- `kubectl describe ingress path-routing-ingress` → Address field

Then edit:
```bash
sudo nano /etc/hosts
```
Add this line:
```
192.168.49.2 myapp.local
```
✅ Replace `192.168.49.2` with the actual IP from above

---

### 6️⃣ Test Ingress Routing
Use curl to hit different paths:
```bash
curl -H "Host: myapp.local" http://192.168.49.2/hello
curl -H "Host: myapp.local" http://192.168.49.2/world
```
You should see:
- `Hello Path`
- `World Path`

❌ `127.0.0.1` will NOT work in this case because the IP exposed is not localhost.

---

## ✅ Outcomes
- Used one domain for multiple app paths
- Patched Ingress to behave like a real load balancer
- Learned how Ingress works with path and host routing in real setup

---

## 🧼 Makefile
```makefile
apply:
	kubectl apply -f manifests/hello-deployment.yaml
	kubectl apply -f manifests/world-deployment.yaml
	kubectl apply -f manifests/hello-service.yaml
	kubectl apply -f manifests/world-service.yaml
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
make apply
make clean
```

---

## 📸 Screenshots (optional)
Add terminal or browser screenshots for `/hello` and `/world`
