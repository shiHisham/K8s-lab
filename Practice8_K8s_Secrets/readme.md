# 📘 Practice 8 - Secrets Management in Kubernetes

## 🌟 Goal

Learn how to manage **sensitive configuration** in Kubernetes using **Secrets**, and safely inject them into containers as environment variables and mounted files.

---

## 📚 What You’ll Learn

- What is a Kubernetes **Secret**, and how it differs from ConfigMap
- How to store and encode sensitive values
- How to inject secrets into pods:
  - As **environment variables**
  - As **mounted files**
- Risks of env vs file secrets (memory, logging, exposure)
- How to rotate and debug secrets safely

---

## 📁 Folder Structure

```
Practice8_K8s_Secrets/
├── README.md
├── manifests/
│   ├── secret.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
├── app/
│   └── server.js
├── Dockerfile
├── Makefile
└── screenshots/ (optional)
```

---

## 🤠 Step 1 - Secrets-Aware Node.js App

```js
// app/server.js
const express = require('express');
const fs = require('fs');
const app = express();

const dbPassword = process.env.DB_PASSWORD || 'Not set';
let apiToken = 'File not found';

try {
  apiToken = fs.readFileSync('/etc/secret/api-token.txt', 'utf8');
} catch (err) {
  apiToken = `Error reading file: ${err.message}`;
}

app.get('/', (req, res) => {
  res.send(`DB_PASSWORD (env): ${dbPassword}\nAPI_TOKEN (file): ${apiToken}`);
});

app.listen(3000, () => {
  console.log('Secrets app running on port 3000');
});
```

---

## 📦 Step 2 - Create Secret

```yaml
# manifests/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret-p8
type: Opaque
stringData:
  DB_PASSWORD: "super-secret-db-password"
  api-token.txt: "abc-123-def-456"
```

> ✅ Use `stringData` to avoid manual base64 encoding

---

## 📦 Step 3 - Inject Secret via Deployment

```yaml
# manifests/app-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secret-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: secret-demo
  template:
    metadata:
      labels:
        app: secret-demo
    spec:
      containers:
        - name: app
          image: health-demo-p8:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 3000
          env:
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: app-secret-p8
                  key: DB_PASSWORD
          volumeMounts:
            - name: secret-volume
              mountPath: /etc/secret
              readOnly: true
      volumes:
        - name: secret-volume
          secret:
            secretName: app-secret-p8
            items:
              - key: api-token.txt
                path: api-token.txt
```

---

## 🌐 Step 4 - Service

```yaml
# manifests/app-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: secret-demo-svc
spec:
  selector:
    app: secret-demo
  ports:
    - port: 80
      targetPort: 3000
```

---

## 🚀 Step 5 - Build, Apply & Test

```bash
make build
make apply
make port
```

Then:

```bash
curl localhost:8080
```

Expected output:

```
DB_PASSWORD (env): super-secret-db-password
API_TOKEN (file): abc-123-def-456
```

---

## 🧪 Step 6 - Rotate & Reload Secrets

```bash
make recreate-secret
make reload
```

---

## ⚠️ Debugging Tips

| Issue              | Fix                                                |
|-------------------|-----------------------------------------------------|
| Secret not mounted | Check `secretName`, `key`, and `path`              |
| Missing env var    | Check `env[].valueFrom.secretKeyRef.key`           |
| Stale values       | Restart pod (`make reload`)                        |
| File missing       | `kubectl exec` into pod and `cat` the path         |

---

## ✅ Outcomes

- Learned how to inject secrets into containers safely
- Compared env vs file-based secret usage
- Simulated secret rotation and debugging
- Reinforced separation of sensitive config from code

---

## 🧼 Makefile

```makefile
build:
	eval $$(minikube docker-env) && docker build -t health-demo-p8:latest .

apply:
	kubectl apply -f manifests/

port:
	kubectl port-forward svc/secret-demo-svc 8080:80

clean:
	kubectl delete -f manifests/ --ignore-not-found

reload:
	kubectl delete pod -l app=secret-demo

recreate-secret:
	kubectl delete secret app-secret-p8 --ignore-not-found
	kubectl create secret generic app-secret-p8 \
		--from-literal=DB_PASSWORD="new-pass" \
		--from-literal=api-token.txt="new-token"
```

---

Now you’re ready to take on real-world secret management scenarios! 🔐
