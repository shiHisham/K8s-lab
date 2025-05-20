# 📘 Practice 11 - Developer Experience Tools in Kubernetes

## 🌟 Goal

Get familiar with tools that improve the **developer experience** in Kubernetes:

* Easily switch contexts and namespaces
* Navigate resources with a TUI (Terminal UI)
* Monitor resource usage
* Diagnose issues fast

These tools won’t change how Kubernetes works, but they will drastically improve your speed and visibility when debugging or exploring.

---

## 📚 What You’ll Learn

* Use `kubectl config` and `kubectx` to switch contexts
* Use `k9s` to explore and debug Kubernetes in the terminal
* Use `metrics-server` to view live pod CPU/memory
* Use `kubectl top`, `describe`, `logs`, `exec`, and `debug`

---

## 📊 Tools Covered

| Tool             | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `kubectx`        | Switch between clusters                   |
| `kubens`         | Switch between namespaces                 |
| `k9s`            | Interactive terminal UI for K8s resources |
| `metrics-server` | Enable `kubectl top` for live stats       |
| `kubectl debug`  | Attach ephemeral containers to debug      |

---

## 🧱 Step-by-Step

### 1️⃣ Install Developer Tools

#### 🔧 k9s (Manual install)

```bash
# Download the latest release
curl -LO https://github.com/derailed/k9s/releases/latest/download/k9s_Linux_amd64.tar.gz

# Extract the binary
tar -xzf k9s_Linux_amd64.tar.gz

# Move the binary to a system-wide location
sudo mv k9s /usr/local/bin/

# Verify installation
k9s version
```

#### 🔧 kubectx / kubens (Manual install)

```bash
# Clone the repository
git clone https://github.com/ahmetb/kubectx.git
cd kubectx

# Move binaries to /usr/local/bin
sudo mv kubectx kubens /usr/local/bin/

# Verify installation
kubectx --help
kubens --help
```

#### 🔧 Enable metrics-server (Minikube)

```bash
minikube addons enable metrics-server
```

---

### 2️⃣ View Contexts and Namespaces

```bash
kubectl config get-contexts
kubectx
kubens
```

**Switch context:**

```bash
kubectx minikube
```

**Switch namespace:**

```bash
kubens kube-system
```

---

### 3️⃣ Use k9s (Terminal UI)

```bash
k9s
```

**Keyboard Tips:**

* `:` = command bar
* `/` = search
* `Ctrl + A` = switch context
* `Ctrl + N` = switch namespace
* `l` = view logs
* `d` = describe
* `Enter` = select resource

---

### 4️⃣ Enable & Use metrics-server

```bash
minikube addons enable metrics-server
kubectl top pods
kubectl top nodes
```

This shows CPU and memory in real time.

---

### 5️⃣ Debugging with kubectl

**View pod logs:**

```bash
kubectl logs <pod>
```

**Execute into a pod:**

```bash
kubectl exec -it <pod> -- /bin/sh
```

**Describe issues:**

```bash
kubectl describe pod <pod>
```

**Use ephemeral container to debug:**

```bash
kubectl debug -it <pod> --image=busybox --target=app -- /bin/sh
```

This runs a temporary container inside your pod for inspection.

---

## ✅ Outcomes

* Used `kubectx` and `kubens` to quickly switch views
* Navigated your cluster interactively using `k9s`
* Collected live usage metrics from `metrics-server`
* Gained real debugging skills: `logs`, `exec`, `describe`, and `debug`

These tools are optional but powerful. They’re used in real companies by real cloud engineers.

---

## 📁 Folder Structure

```
Practice11_K8s_ToolsUX/
└── README.md
```

No manifests or Dockerfiles here — this practice focuses on tools, not app deployment.
