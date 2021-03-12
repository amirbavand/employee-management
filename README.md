# Employee management

A simple employee management tool using TypeScript, react and kubernetes

### Instalation guid and running

1. Install [Docker](https://docs.docker.com/get-docker/) on your computer.

2. Activate Kuberntes on your docker

3. In the termial install ingress on your kubernetes cluster using the following command

<code>kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
</code>

4. Create a secret on your cluster by running the following command on terminal

<code>kubectl create secret generic jwt-secret --from-literal=JWT_KEY=abcd
</code>
