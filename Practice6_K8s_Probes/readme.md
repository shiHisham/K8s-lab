# 📘 Practice 6 - Readiness & Liveness Probes in Kubernetes

## 🌟 Goal

Understand how Kubernetes uses **Liveness** and **Readiness** probes to manage pod health and control traffic flow.

---

## 📚 What You’ll Learn

* The difference between **Readiness** and **Liveness** probes
* How probes affect pod restarts and service routing
* How to simulate real-world failure and recovery
* Best practices for defining probes in production apps

---

## 🧱 What We'll Do

1. Create a simple HTTP app with endpoints for health checking
2. Define both **readiness** and **liveness** probes in the pod spec
3. Simulate a failing **readiness** probe to test service routing
4. Simulate a failing **liveness** probe to trigger a pod restart
5. Observe pod and service behavior using `kubectl`

---

## 📁 Folder Structure

```
Practice6_K8s_Probes/
├── README.md
├── manifests/
│   ├── app-deployment.yaml
│   ├── app-service.yaml
├── app/
│   └── server.js
├── Dockerfile
├── Makefile
└── screenshots/ (optional)
```

---

## 🛠️ Step-by-Step Instructions

### 1️⃣ Create a Simple HTTP App

Use Node.js to create a small app:

```js
// app/server.js
const express = require('express');
const app = express();
let isReady = true;
let isAlive = true;

app.get('/healthz', (req, res) => {
  if (isAlive) res.send('I am alive!');
  else res.status(500).send('Crashed!');
});

app.get('/ready', (req, res) => {
  if (isReady) res.send('Ready!');
  else res.status(500).send('Not Ready!');
});

app.post('/toggle', (req, res) => {
  isReady = !isReady;
  res.send(`Readiness set to ${isReady}`);
});

app.post('/crash', (req, res) => {
  isAlive = false;
  res.send('Liveness set to false');
});

app.listen(3000, () => console.log('App running on port 3000'));
```

---

### 2️⃣ Dockerize the App

```Dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY app /app
RUN npm install express
CMD ["node", "server.js"]
```

---

### 3️⃣ Define the Deployment with Probes

```yaml
# manifests/app-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: health-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: health-demo
  template:
    metadata:
      labels:
        app: health-demo
    spec:
      containers:
        - name: app
          image: health-demo:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 10
```

---

### 4️⃣ Define the Service

```yaml
# manifests/app-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: health-demo-svc
spec:
  selector:
    app: health-demo
  ports:
    - port: 80
      targetPort: 3000
```

---

### 5️⃣ Build, Apply, and Test

```bash
# Switch to Minikube Docker environment
eval $(minikube docker-env)

# Build the image inside Minikube
docker build -t health-demo:latest .

# Apply manifests
kubectl apply -f manifests/

# Port forward to access the app
kubectl port-forward svc/health-demo-svc 8080:80
```

Open another terminal:

#### Toggle Readiness (simulate app not ready):

```bash
curl -X POST localhost:8080/toggle
kubectl get endpoints
```

➡️ Service will stop routing traffic to the pod (endpoints list empty)

#### Restore Readiness:

```bash
curl -X POST localhost:8080/toggle
kubectl get endpoints
```

➡️ Pod returns to service endpoint

#### Simulate Liveness Failure:

```bash
curl -X POST localhost:8080/crash
kubectl get pods -l app=health-demo
```

➡️ Kubernetes will detect liveness failure and **restart the pod**

You can confirm by watching the `RESTARTS` field increase:

```bash
kubectl get pod -l app=health-demo -w
```

Also check:

```bash
kubectl describe pod -l app=health-demo
```

Look for:

* `Exit Code: 137`
* `Reason: Error`
* `Message: Container app failed liveness probe, will be restarted`

---

## ✅ Outcomes

* Learned the difference between readiness and liveness probes
* Saw how readiness failure removes pods from Service routing
* Saw how liveness failure causes Kubernetes to restart the pod
* Used `curl`, `kubectl`, and live toggling to simulate failures
* Verified `RESTARTS` increase after liveness probe fails
* Understood when to use `imagePullPolicy: Never` for local builds
* Fixed `ImagePullBackOff` by building the image inside Minikube
* Confirmed Kubernetes self-heals based on liveness checks

---

## 🧼 Makefile

```makefile
build:
	eval $$(minikube docker-env) && docker build -t health-demo:latest .

apply:
	kubectl apply -f manifests/

clean:
	kubectl delete -f manifests/ --ignore-not-found
```

Run with:

```bash
make build
make apply
make clean
```

---
