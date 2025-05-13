# 🚀 Kubernetes Concepts Map (Full Overview)

This file visually and structurally explains all key concepts and layers involved in Kubernetes — as practiced in this repo. It shows how everything fits together and builds a complete mental model.

---

## 🧱 Layer 1: Core Building Blocks

| **Concept**      | **Description**                                                    |
|------------------|--------------------------------------------------------------------|
| 🐳 **Container**  | Isolated app runtime, built from images (e.g. Nginx)              |
| 📦 **Image**      | Blueprint for a container, built via Dockerfile                  |
| 📁 **Dockerfile** | Script that defines how to build a container image               |

> ✅ These are your foundation — from Docker basics.

---

## 🔲 Layer 2: Kubernetes Pod Abstraction

| **Concept**   | **Purpose**                                                           |
|---------------|------------------------------------------------------------------------|
| 🧊 **Pod**     | Smallest deployable K8s unit — can hold multiple containers           |
| 🔁 **Sidecar** | Extra container in a pod for proxy, logging, or syncing helpers       |

> Pods group containers with shared network/storage.

---

## 🔁 Layer 3: Controllers — Managing Pods

| **Concept**     | **Purpose**                                                                  |
|------------------|-------------------------------------------------------------------------------|
| 👥 **ReplicaSet**  | Ensures a fixed number of Pods remain live                                  |
| 🧠 **Deployment**  | Manages ReplicaSets, updates, rollbacks, and scaling                        |
| 📋 **Job/CronJob** | Run one-time or recurring tasks (e.g., backups, reports)                    |

> Controllers manage pod lifecycle automatically.

---

## 🔌 Layer 4: Exposing Services

| **Service Type**      | **Description**                                                                 |
|------------------------|---------------------------------------------------------------------------------|
| 🔗 **ClusterIP**        | Internal-only access to a Service                                               |
| 🔓 **NodePort**         | Exposes Service on each Node’s IP (e.g., port 30000+)                          |
| 🌐 **LoadBalancer**     | Gets an external IP (in cloud or via Minikube tunnel)                          |
| 🌍 **Ingress**          | Smart router based on domain/path rules                                        |
| 🧭 **Ingress Controller** | The pod that listens for and processes Ingress rules (e.g., NGINX Controller) |

> Services + Ingress decide how apps are accessed.

---

## ⚙️ Layer 5: Cluster Internals

| **Component**     | **Role**                                                           |
|-------------------|---------------------------------------------------------------------|
| 🧩 **Node**        | VM or physical machine that runs Pods                              |
| 🌐 **Kubelet**     | Agent that manages Pods on a node                                  |
| 🧠 **API Server**  | The control plane component that `kubectl` talks to                |
| 🧱 **Cluster**     | A group of Nodes + control plane working together                  |

> This is the engine room of Kubernetes.

---

## 🔐 Layer 6: App Configuration

| **Concept**     | **Purpose**                                                    |
|------------------|----------------------------------------------------------------|
| 🧾 **ConfigMap**   | Inject non-sensitive configs (env vars, files, CLI args)       |
| 🔐 **Secret**      | Inject sensitive data (DB passwords, API tokens)              |

> Separates app config from code — for security and flexibility.

---

## ❤️ Layer 7: App Health & Lifecycle

| **Probe Type**         | **Purpose**                                              |
|------------------------|----------------------------------------------------------|
| 🟢 **Liveness Probe**    | Restart container if it's dead or stuck                 |
| 🟡 **Readiness Probe**   | Wait before sending traffic (ensure it's ready)         |

> Health checks ensure only healthy pods receive traffic.

---

## 🚀 Layer 8: Automation, CI/CD, GitOps

| **Concept**     | **Use Case**                                                            |
|------------------|-------------------------------------------------------------------------|
| 🔄 **CI/CD**        | Automate build → test → deploy (e.g., GitHub Actions, ArgoCD)          |
| 📦 **Helm**         | Package manager to install apps or bundles in cluster                 |
| 🧠 **GitOps**       | Declarative deployment by syncing Git state (e.g., ArgoCD, Flux)      |
| 🗂️ **Namespaces**    | Organize and isolate environments (e.g., `dev`, `prod`)               |

> K8s — automation and repeatability.

---

## 🧭 CLI Tools & UX Helpers

| Tool / Feature  | Purpose                             |
|------------------|-------------------------------------|
| 📊 **Lens**        | Visual dashboard for managing K8s   |
| 🧵 **stern**       | Tail logs across multiple pods      |
| 📍 **kubectx / kubens** | Switch between clusters or namespaces |

---

## 🧠 Conceptual Summary

```text
Image → Container → Pod → ReplicaSet → Deployment
                                  └→ Services (ClusterIP, NodePort, LoadBalancer)
                                         └→ Ingress (via Ingress Controller)
                                                  └→ Route traffic to Services

   | ConfigMap & Secret → Injected into Pods
   | Liveness/Readiness Probes → Health mgmt
   | CI/CD + GitOps → Automate deployment
   | Namespaces → Structure environments
```