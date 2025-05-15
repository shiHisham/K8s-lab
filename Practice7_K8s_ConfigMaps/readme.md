# 📘 Practice 7 - Static Configuration with ConfigMaps

## 🌟 Goal

Learn how to manage **static configuration** in Kubernetes using **ConfigMaps**, and how to inject them into pods as environment variables or mounted files.

---

## 📚 What You’ll Learn

* What is a ConfigMap and when to use it
* How to create a ConfigMap from a file or inline YAML
* How to inject ConfigMaps into pods:

  * As environment variables
  * As mounted volumes (files)
* How to reload pods when config changes (manually)

---

## 🧱 What We'll Do

1. Create a ConfigMap with app configuration values
2. Update the Node.js app to read config from env vars and files
3. Mount the ConfigMap into the pod using both methods
4. Verify the injected values inside the container
5. Modify the ConfigMap and observe what happens

---

## 📁 Folder Structure

```
Practice7_K8s_ConfigMaps/
├── README.md
├── manifests/
│   ├── configmap.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
├── app/
│   └── server.js
├── Dockerfile
├── Makefile
└── screenshots/ (optional)
```

---

## 🤠 Step 1 - Create a Simple Config-Aware App

```js
// app/server.js
const express = require('express');
const fs = require('fs');
const app = express();

// Read config from environment variable
const greetingEnv = process.env.APP_GREETING || 'Hello from ENV!';

// Read config from mounted file
let greetingFile = 'File not found';
try {
  greetingFile = fs.readFileSync('/etc/config/message.txt', 'utf8');
} catch (err) {
  greetingFile = `Error reading file: ${err.message}`;
}

app.get('/', (req, res) => {
  res.send(`ENV: ${greetingEnv}\nFILE: ${greetingFile}`);
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
```

---

## 📂 Step 2 - Dockerfile

```Dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY app /app
RUN npm install express
CMD ["node", "server.js"]
```

---

## 📊 Step 3 - Create the ConfigMap

```yaml
# manifests/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config

data:
  APP_GREETING: "Hello from ConfigMap!"
  message.txt: "This file was mounted from a ConfigMap."
```

---

## 🧩 Step 4 - Define the Deployment

```yaml
# manifests/app-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: configmap-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: configmap-demo
  template:
    metadata:
      labels:
        app: configmap-demo
    spec:
      containers:
        - name: app
          image: health-demo-p7:latest
          ports:
            - containerPort: 3000
          env:
            - name: APP_GREETING
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: APP_GREETING
          volumeMounts:
            - name: config-volume
              mountPath: /etc/config
              readOnly: true
      volumes:
        - name: config-volume
          configMap:
            name: app-config
            items:
              - key: message.txt
                path: message.txt
```

---

## 🌐 Step 5 - Define the Service

```yaml
# manifests/app-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: configmap-demo-svc
spec:
  selector:
    app: configmap-demo
  ports:
    - port: 80
      targetPort: 3000
```

---

## 🧪 Step 6 - Build, Apply, and Test

```bash
# Use Minikube Docker daemon
eval $(minikube docker-env)

# Build the image inside Minikube
docker build -t health-demo-p7:latest .

# Apply all manifests
kubectl apply -f manifests/

# Forward port to access the app
kubectl port-forward svc/configmap-demo-svc 8080:80
```

Test it:

```bash
curl localhost:8080
```

Expected output:

```
ENV: Hello from ConfigMap!
FILE: This file was mounted from a ConfigMap.
```

---

## 🔁 Step 7 - Modify ConfigMap & Reload Pod

```bash
kubectl edit configmap app-config
kubectl delete pod -l app=configmap-demo
```

➡️ Edit `message.txt` or `APP_GREETING`, then restart the pod to see changes.

---

## ✅ Outcomes

* Injected environment variables and files using ConfigMap
* Verified config inside the app with curl and logs
* Understood limitations: configs do not auto-refresh
* Used `kubectl edit` + `delete pod` to force update

---

## 🧼 Makefile

```makefile
build:
	eval $$(minikube docker-env) && docker build -t health-demo-p7:latest .

apply:
	kubectl apply -f manifests/

port:
	kubectl port-forward svc/configmap-demo-svc 8080:80

edit:
	kubectl patch configmap app-config \
      --type merge \
      -p '{"data":{"APP_GREETING":"Bonjour depuis le patch !"}}'

restart:
	kubectl delete pod -l app=configmap-demo

clean:
	kubectl delete -f manifests/ --ignore-not-found
```

---

Run with:

```bash
make build
make apply
make port
make edit
make restart
make clean
```

---

Ready for the quiz or next practice? 🚀
