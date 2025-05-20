# 📘 Practice 10 - Helm for Your Own Application

## 🌟 Goal

Learn how to build, customize, and deploy a Helm chart for your **own application**. Practice real-world DevOps patterns: templating, environment injection, file mounts, and clean deployments.

---

## 📚 What You’ll Learn

* How to use `helm create` to scaffold charts
* How to remove default templates (you won’t use most of them)
* How to inject env variables and mount config files
* How to build your app image and use it in Helm
* How to install, upgrade, and debug Helm charts
* How to test and expose apps locally using Minikube

---

## 🧱 What We Did

### 🛠 1. Create Helm Chart Structure

```bash# 📘 Practice 10 - Helm for Your Own Application

## 🌟 Goal
Build and deploy your own Helm chart for a custom app, learning how to replace raw YAML with dynamic, reusable Helm templates.

## 📚 What You’ll Learn
- How to create and structure a Helm chart (helm create)
- How to use values.yaml to inject config and metadata
- How to template ConfigMaps, env vars, volume mounts
- How to install, upgrade, and debug Helm charts
- How Helm generates resource names and why it matters

## 🧱 What We Did
1. Generated a Helm chart using helm create myapp-chart
2. Cleaned out default templates (hpa, ingress, tests, serviceaccount)
3. Replaced hardcoded YAML with:
   - A templated ConfigMap
   - A dynamic Deployment
   - A flexible NodePort Service
4. Mounted a file from ConfigMap and injected an environment variable
5. Installed the chart and accessed the app via minikube service --url
6. Used helm upgrade to apply future config changes

## 📁 Folder Structure
Practice10_K8s_HelmOwnChart/
├── Dockerfile
├── app/
│   └── server.js
├── myapp-chart/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── configmap.yaml
│       ├── deployment.yaml
│       └── service.yaml
├── Makefile
└── README.md

## 🧼 Makefile
build:
	eval $$(minikube docker-env) && docker build -t health-demo-p10:latest .

install:
	helm install myapp ./myapp-chart

upgrade:
	helm upgrade myapp ./myapp-chart -f myapp-chart/values.yaml

uninstall:
	helm uninstall myapp

port:
	minikube service myapp-myapp-chart --url

## 🧪 Testing the Result
After running:

make build  
make install  
make port

Visit the URL in your browser or run:

curl $(make port)

You should see:

ENV: Hello from Helm Chart!  
FILE: This file was generated from a Helm value.

## ✅ Outcomes
- Built a custom Helm chart from scratch using templates and values
- Practiced chart installation, upgrade, and cleanup
- Understood the relationship between values.yaml, templates, and rendered Kubernetes manifests
- Learned how Helm charts are used in real-world cloud-native deployments

🧠 You're now comfortable turning any raw YAML-based deployment into a Helm-powered reusable chart — a key skill for DevOps and Cloud Engineer roles.

helm create myapp-chart
```

This generated a full chart scaffold under `myapp-chart/`.

---

### 🧹 2. Clean Default Templates

We removed everything unnecessary for our use case:

```bash
rm -rf myapp-chart/templates/hpa.yaml \
       myapp-chart/templates/ingress.yaml \
       myapp-chart/templates/serviceaccount.yaml \
       myapp-chart/templates/tests \
       myapp-chart/templates/NOTES.txt
```

---

### 🐳 3. Build Custom App & Image

**App source:**
`app/server.js`

**Dockerfile:**
`Dockerfile`

We built the image inside Minikube’s Docker daemon:

```bash
eval $(minikube docker-env)
docker build -t health-demo-p10:latest .
```

---

### 🧾 4. Customize `values.yaml`

**Path:** `myapp-chart/values.yaml`

```yaml
image:
  repository: health-demo-p10
  tag: latest
  pullPolicy: Never

service:
  type: NodePort
  port: 80
  nodePort: 32010

replicaCount: 1

app:
  containerPort: 3000
  env:
    APP_GREETING: "Hello from Helm Chart!"
  configFile:
    message: "This file was generated from a Helm value."
```

---

### 🧹 5. Customize Templates

**ConfigMap:**
`myapp-chart/templates/configmap.yaml`

**Deployment:**
`myapp-chart/templates/deployment.yaml`

**Service:**
`myapp-chart/templates/service.yaml`

These templates use `.Values` to inject dynamic values and build clean resource names.

---

### 🚀 6. Install the Chart

```bash
helm install myapp ./myapp-chart
```

If there's an update in `values.yaml` or templates:

```bash
helm upgrade myapp ./myapp-chart -f myapp-chart/values.yaml
```

---

### 🌐 7. Access the App

We used a NodePort and accessed via Minikube:

```bash
minikube service myapp-myapp-chart --url
```

Sample output:

```
http://192.168.49.2:32010
```

Then tested it:

```bash
curl http://192.168.49.2:32010
```

Expected output:

```
ENV: Hello from Helm Chart!
FILE: This file was generated from a Helm value.
```

---

## ✅ Outcomes

* You used `helm create` and cleaned up defaults
* Injected config as environment variable and mounted file
* Validated real behavior from inside a container
* Gained confidence using `helm install`, `upgrade`, `uninstall`, and `values.yaml`

---

## 📁 Folder Structure

```
Practice10_K8s_HelmOwnChart/
├── Dockerfile
├── app/
│   └── server.js
├── myapp-chart/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── configmap.yaml
│       ├── deployment.yaml
│       └── service.yaml
├── Makefile
└── README.md
```

---

## 🧼 Makefile

**Makefile:**

```makefile
build:
	eval $$(minikube docker-env) && docker build -t health-demo-p10:latest .

install:
	helm install myapp ./myapp-chart

upgrade:
	helm upgrade myapp ./myapp-chart -f myapp-chart/values.yaml

uninstall:
	helm uninstall myapp

port:
	minikube service myapp-myapp-chart --url
```

**Run:**

```bash
make build
make install
make port
```

---

## 🧠 Key Concepts Locked

* Helm is not just for third-party charts — it's for your own real applications
* ConfigMaps and `values.yaml` can build full app behavior
* A clean Helm chart = reusable deployment for any environment
