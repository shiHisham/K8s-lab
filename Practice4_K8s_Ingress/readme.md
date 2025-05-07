# 📘 Practice 4 - Ingress and Domain-Based Routing in Kubernetes

## 🎯 Goal
Learn how to expose services using domain names (like `myapp.local`) using an Ingress Controller. Understand how Ingress works compared to NodePort and ClusterIP.

---

## 📚 What You’ll Learn
- What is an **Ingress** in Kubernetes
- The difference between **NodePort**, **LoadBalancer**, and **Ingress**
- How to set up **Ingress Controller** in Minikube
- How to define **Ingress rules** to route traffic by hostname or path
- How to test routing with your browser using a fake domain name

---

## 🧱 What We'll Do

1. Set up NGINX Ingress Controller on Minikube
2. Deploy two apps (`hello-app` and `world-app`)
3. Create services to expose both apps internally
4. Create an Ingress resource to route:
    - `http://hello.local` → hello-app
    - `http://world.local` → world-app
5. Update your local `hosts` file to simulate DNS
6. Access apps in the browser using custom domains

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

### 1️⃣ Enable NGINX Ingress Controller
```bash
minikube addons enable ingress
```
Wait until the pod is running:
```bash
kubectl get pods -n kube-system -l app.kubernetes.io/name=ingress-nginx
```

---

### 2️⃣ Deploy Sample Apps
#### `hello-deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
        - name: hello
          image: hashicorp/http-echo
          args:
            - "-text=Hello World"
          ports:
            - containerPort: 5678
```

#### `world-deployment.yaml`
Same as above, change name, label, and message:
```yaml
metadata:
  name: world-app
...
args:
  - "-text=World Peace"
```
```bash
kubectl apply -f manifests/hello-deployment.yaml
kubectl apply -f manifests/world-deployment.yaml
```

---

### 3️⃣ Create Services
```yaml
# hello-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-service
spec:
  selector:
    app: hello
  ports:
    - port: 80
      targetPort: 5678
```
```yaml
# world-service.yaml (same, change name/selector)
```
```bash
kubectl apply -f manifests/hello-service.yaml
kubectl apply -f manifests/world-service.yaml
```

---

### 4️⃣ Create the Ingress Resource
```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
spec:
  rules:
    - host: hello.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: hello-service
                port:
                  number: 80
    - host: world.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: world-service
                port:
                  number: 80
```
```bash
kubectl apply -f manifests/ingress.yaml
```

---

### 5️⃣ Update Your Hosts File (Simulate DNS)
Edit:
```bash
sudo nano /etc/hosts  # or C:\Windows\System32\drivers\etc\hosts
```
Add:
```
127.0.0.1 hello.local
127.0.0.1 world.local
```
✅ Now your browser will route those domains to Minikube!

---

## ✅ Outcomes
- Understood why Ingress is more flexible than NodePort
- Used host-based routing to simulate real production setups
- Tested domain-based traffic with NGINX Ingress

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
Add browser screenshots showing `hello.local` and `world.local` work