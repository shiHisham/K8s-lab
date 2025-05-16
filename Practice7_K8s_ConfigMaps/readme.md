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
* How ConfigMaps create files on-the-fly using key–path mapping
* How to reload pods when config changes (manually)

---

## 🧱 What We'll Do

1. Create a ConfigMap with key/value config
2. Update a Node.js app to read from env vars and mounted file
3. Use a different file path/key to verify flexibility
4. Track how mounted files appear inside the container
5. Simulate real-world debugging when config is missing or incorrect

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

## 🤠 Step 1 - Create a Config-Aware App

```js
// app/server.js
const express = require('express');
const fs = require('fs');
const app = express();

const greetingEnv = process.env.APP_GREETING || 'Hello from ENV!';
let greetingFile = 'File not found';
try {
  greetingFile = fs.readFileSync('/etc/config/message_file.txt', 'utf8');
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
  name: app-config-p7

data:
  APP_GREETING: "Hello from ConfigMap!"
  message_key.txt: "This file was mounted from a ConfigMap."
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
          imagePullPolicy: Never
          ports:
            - containerPort: 3000
          env:
            - name: APP_GREETING
              valueFrom:
                configMapKeyRef:
                  name: app-config-p7
                  key: APP_GREETING
          volumeMounts:
            - name: config-volume
              mountPath: /etc/config
              readOnly: true
      volumes:
        - name: config-volume
          configMap:
            name: app-config-p7
            items:
              - key: message_key.txt
                path: message_file.txt
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

## 🧪 Step 6 - Build, Apply, and Inspect

```bash
# Use Minikube Docker
eval $(minikube docker-env)

# Build app image
docker build -t health-demo-p7:latest .

# Apply manifests
kubectl apply -f manifests/

# Port forward
kubectl port-forward svc/configmap-demo-svc 8080:80
```

Test it:

```bash
curl localhost:8080
```

You should see:

```
ENV: Hello from ConfigMap!
FILE: This file was mounted from a ConfigMap.
```

Check file exists inside container:

```bash
kubectl exec -it <pod-name> -- cat /etc/config/message_file.txt
```

---

## 🔁 Step 7 - Update & Debug ConfigMap

If file/key/path is wrong, pod may fail or start but log errors.

To change config:

```bash
kubectl delete configmap app-config-p7
kubectl create configmap app-config-p7 \
  --from-literal=APP_GREETING="Updated!" \
  --from-literal=message_key.txt="New message from updated config."

kubectl delete pod -l app=configmap-demo
```

Revisit:

```bash
curl localhost:8080
```

---

## ✅ Outcomes

* Built a Node.js app that loads env and file-based config
* Used ConfigMap to inject both as files and environment variables
* Validated the real creation of mounted files inside the container
* Simulated broken paths and debugged using `kubectl describe`

---

## 🧼 Makefile

```makefile
build:
	eval $$(minikube docker-env) && docker build -t health-demo-p7:latest .

apply:
	kubectl apply -f manifests/

port:
	kubectl port-forward svc/configmap-demo-svc 8080:80

reload:
	kubectl delete pod -l app=configmap-demo

recreate-config:
	kubectl delete configmap app-config-p7
	kubectl create configmap app-config-p7 \
		--from-literal=APP_GREETING="Updated!" \
		--from-literal=message_key.txt="New message"

clean:
	kubectl delete -f manifests/ --ignore-not-found
```

---

Use like:

```bash
make build
make apply
make port
make recreate-config
make reload
make clean
```

---

🧠 You now understand how Kubernetes **builds files from keys**, how they appear live in containers, and how to troubleshoot config injection issues.