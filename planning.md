# 🧭 Kubernetes Learning Roadmap – From Zero to Production

👋 Welcome! This file outlines my complete hands-on learning plan for mastering Kubernetes as part of my transition from Software Engineering to **Cloud & Data Engineering**.

It includes:

* ✅ My own structured practices from beginner to advanced
* 📽️ Extra practices adapted from the [DevOpsDirective YouTube course](https://www.youtube.com/watch?v=2T86xAtR6Fo&ab_channel=DevOpsDirective)
* 💼 A portfolio-style approach, focused on professional DevOps standards

---

## 📦 Practice Overview

|  # | Folder                                   | Practice Name             | Focus                                | Source              |
| -: | ----------------------------------       | ------------------------- | ------------------------------------ | ------------------- |
|  1 | `Practice1_K8sBasics`                    | Pods & Services           | ClusterIP, NodePort, curl, local DNS | 🧠 Custom           |
|  2 | `Practice2_Core_K8s_Resource_Types`      | ReplicaSets & Deployments | Scaling, rollout, ownership          | 🧠 Custom           |
|  3 | `Practice3_K8s_Services_Dns`             | Services DNS              | ClusterIP && nodeport                | 🧠 Custom           |
|  4 | `Practice4_K8s_Ingress`                  | Ingress with Host Routing | Ingress Controller, `/etc/hosts`     | 🧠 Custom           |
|  5 | `Practice5_K8s_Ingress_MultiPath_Routing`| Ingress with Multi-Path   | Routing via path prefixes            | 🧠 Custom           |
|  6 | `Practice6_K8s_Probes`                   | Health Checks             | Liveness & Readiness                 | 🧠 Custom           |
|  7 | `Practice7_K8s_ConfigMaps`               | Static Configuration      | Env vars + mounted files             | 🧠 Custom           |
|  8 | `Practice8_K8s_Secrets`                  | Secure Config             | Secret injection via env/files       | 🧠 Custom           |
|  9 | `Practice9_K8s_Helm_Intro`               | Helm Basics               | Install 3rd-party charts             | 📽️ Course-inspired |
| 10 | `Practice10_K8s_Helm_Custom`             | Helm for Your App         | Helm template your own services      | 🧠 Custom           |
| 11 | `Practice11_K8s_DevTools`                | Developer UX              | k9s, namespaces, contexts            | 📽️ Course          |
| 12 | `Practice12_K8s_Environments`            | Multi-Env Strategy        | dev/stage/prod YAMLs                 | 🧠 Custom           |
| 13 | `Practice13_K8s_GitOps`                  | GitOps Simulation         | ArgoCD / Flux                        | 🧠 Custom           |
| 14 | `Practice14_K8s_CICD`                    | CI/CD Integration         | GitHub Actions for K8s               | 🧠 Custom           |
| 15 | `Practice15_K8s_Finalization`            | Wrap-Up                   | Docs, screenshots, clean repo        | 🧠 Custom           |

---

## 🛠️ Tools Used

| Tool                                     | Role                   |
| ---------------------------------------- | ---------------------- |
| `kubectl`, `minikube`, `helm`            | Cluster operations     |
| `Nginx Ingress`, `/etc/hosts`            | Local routing          |
| `mkcert` / TLS                           | Ingress + HTTPS        |
| `k9s`, `kubectl debug`, `metrics-server` | Troubleshooting & UX   |
| `ArgoCD`, `GitHub Actions`               | GitOps and CI/CD flows |

---

## 📚 Learning Philosophy

This project is not just about passing Kubernetes certifications or following a video tutorial.

It’s a carefully structured, **real-world progression** to:

* 🧱 Understand Kubernetes fundamentals deeply
* 🚀 Apply best practices from Docker, DevOps, and production systems
* 🔐 Prepare for cloud-native roles like **Cloud Engineer** or **Data Engineer**
* 💼 Build a public portfolio that reflects hands-on expertise

---

## 🎥 About the Video Course Reference

I also used the amazing open-source course by DevOpsDirective as additional reference:

📽️ [DevOpsDirective YouTube Course](https://www.youtube.com/watch?v=2T86xAtR6Fo)
📦 [GitHub Repo](https://github.com/sidpalas/devops-directive-kubernetes-course)

Several practices above were **adapted and improved** from that series, using a more modular and documented approach in this repo.

---

## 🚀 Next Step

👉 Start with `Practice1_K8s_PodsServices/` to deploy your first pod, use `kubectl`, and build confidence with raw YAML.

Each folder includes:

* A `README.md` with goals and structure
* YAML manifests or Helm charts
* Optional images and automation scripts

---

Want to contribute or give feedback? Open a pull request or contact me!
