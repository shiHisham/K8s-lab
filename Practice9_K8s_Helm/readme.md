# 📘 Practice 9 - Helm & 3rd-Party Charts

## 🌟 Goal

Understand how to install and customize third-party Helm charts (like NGINX) using best practices. Learn to override values, upgrade deployments, and inspect rendered templates.

---

## 📚 What You’ll Learn

- How to install third-party charts using Helm
- The structure of a Helm chart and what it installs
- How to override configuration using `values.yaml`
- How to upgrade, rollback, and uninstall charts safely
- How Helm templating works (render before apply)

---

## 📁 Folder Structure

```
Practice9_K8s_Helm3rdParty/
├── README.md
├── values/
│   └── custom-values.yaml
├── Makefile
└── screenshots/ (optional)
```

---

## 🚀 Step-by-Step Instructions

### 1️⃣ Add Helm Repo and Install NGINX

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install my-nginx bitnami/nginx
```

Verify deployment:

```bash
helm list
kubectl get all
```

---

### 2️⃣ Expose the NGINX Service

Check service type:

```bash
kubectl get svc my-nginx
```

If it’s `ClusterIP` (Minikube default), use:

```bash
minikube service my-nginx --url
```

---

### 3️⃣ Inspect the Chart

```bash
helm show values bitnami/nginx > values/default.yaml
```

Copy it:

```bash
cp values/default.yaml values/custom-values.yaml
```

Customize your file:

```yaml
# values/custom-values.yaml
service:
  type: NodePort
  nodePorts:
    http: 32080
    https: 32443

serverBlock: |-
  location /custom {
    return 200 'This is a custom route!';
  }
```

---

### 4️⃣ Upgrade the Release

```bash
helm upgrade my-nginx bitnami/nginx -f values/custom-values.yaml
```

Access again:

```bash
minikube service my-nginx --url
```

---

### 5️⃣ Rollback if Needed

```bash
helm rollback my-nginx 1
```

---

## ✅ Outcomes

- Installed a real Helm chart (NGINX)
- Extracted and customized `values.yaml`
- Used Helm to upgrade with custom config
- Understood what Helm charts are and how they render templates
- Simulated rollback and service access

---

## 🧼 Makefile

```makefile
install:
	helm install my-nginx bitnami/nginx

upgrade:
	helm upgrade my-nginx bitnami/nginx -f values/custom-values.yaml

uninstall:
	helm uninstall my-nginx

rollback:
	helm rollback my-nginx 1

show-values:
	helm show values bitnami/nginx > values/default.yaml

service-url:
	minikube service my-nginx --url
```

---

## 📌 Notes

- Helm does not write files to your folder unless you export or render templates manually
- This practice helps you track and test Helm usage like a professional DevOps engineer
- You can reuse this approach for any other Bitnami or third-party chart

