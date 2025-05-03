# 🧭 Kubernetes Learning Roadmap – From Zero to Production

👋 Welcome! This file outlines my complete hands-on learning plan for mastering Kubernetes as part of my transition from Software Engineering to **Cloud & Data Engineering**.

It includes:
- ✅ My own structured practices from beginner to advanced
- 📽️ Extra practices adapted from the [DevOpsDirective YouTube course](https://www.youtube.com/watch?v=2T86xAtR6Fo&ab_channel=DevOpsDirective)
- 💼 A portfolio-style approach, focused on professional DevOps standards

---

## 📦 Practice Overview

| # | Folder | Practice Name | Focus | Source |
|--:|--------|----------------|-------|--------|
| 1 | `Practice1_K8s_Basics` | K8s Core Concepts | Pods, Deployments, Services | 🧠 Custom |
| 2 | `Practice2_Secrets_Config` | Secure Configs | ConfigMaps & Secrets | 🧠 Custom |
| 3 | `Practice3_MultiTier_Networking` | Multi-container App | Frontend + API + DB + DNS | 🧠 Custom |
| 4 | `Practice4_Stateful_PostgreSQL` | Persistent Data | StatefulSet + PVC | 🧠 Custom |
| 5 | `Practice5_Ingress_TLS` | HTTPS Routing | Ingress, TLS (mkcert) | 🧠 Custom |
| 6 | `Practice6_Helm_Kustomize` | K8s Templating | Helm, values.yaml, overlays | 🧠 Custom |
| 7 | `Practice7_GitOps_CICD` | GitOps Workflow | GitHub Actions + ArgoCD | 🧠 Custom |
| 8 | `Practice8_Monitoring_Logging` | Observability | Prometheus, Grafana, Loki | 🧠 Custom |
| 9 | `Practice9_Security_Hardening` | Cluster Security | RBAC, Policies, PodSecurity | 🧠 Custom |
| 10 | `Practice10_Debugging_Tools` | Troubleshooting | Logs, exec, probes, `kubectl debug` | 📽️ Course |
| 11 | `Practice11_CRD_Operators` | Extending K8s | Custom Resources & Operators | 📽️ Course |
| 12 | `Practice12_MultiEnv_Deployments` | Environments | Dev, staging, prod strategies | 📽️ Course |
| 13 | `Practice13_Toolbox_Auxiliary` | Add-ons | K9s, metrics-server, dashboard | 📽️ Course |
| 14 | `Practice14_Cluster_Upgrade_Sim` | Upgrades | Simulated K8s upgrades | 📽️ Course |

---

## 🛠️ Tools Used

| Tool | Role |
|------|------|
| `kubectl`, `minikube`, `helm`, `kustomize` | Core setup & CLI |
| `mkcert`, `cert-manager`, `Nginx Ingress` | TLS & routing |
| `ArgoCD`, `GitHub Actions` | GitOps + CI/CD |
| `Prometheus`, `Grafana`, `Loki` | Monitoring & logging |
| `metrics-server`, `K9s`, `kubectl debug` | Developer experience & diagnostics |

---

## 📚 Learning Philosophy

This project is not just about passing Kubernetes certifications or following a video tutorial.

It’s a carefully structured, **real-world progression** to:
- 🧱 Understand Kubernetes fundamentals deeply
- 🚀 Apply best practices from Docker, DevOps, and production systems
- 🔐 Prepare for cloud-native roles like **Cloud Engineer** or **Data Engineer**
- 💼 Build a public portfolio that reflects hands-on expertise

---

## 🎥 About the Video Course Reference

I also used the amazing open-source course by DevOpsDirective as additional reference:

📽️ [DevOpsDirective YouTube Course](https://www.youtube.com/watch?v=2T86xAtR6Fo)  
📦 [GitHub Repo](https://github.com/sidpalas/devops-directive-kubernetes-course)

Several practices above were **adapted and improved** from that series, using a more modular and documented approach in this repo.

---

## 🚀 Next Step

👉 Start with `Practice1_K8s_Basics/` to deploy your first pod, use `kubectl`, and build confidence with raw YAML.

Each folder includes:
- A `README.md` with goals and structure
- YAML manifests or Helm charts
- Optional images and automation scripts

---

Want to contribute or give feedback? Open a pull request or contact me!