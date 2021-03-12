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

5. Open the hosts file on your mac or linux using the following command
   <code>sudo nano /private/etc/hosts</code>

6. Add the bellow line to the end of host file

<code>127.0.0.1 employees.dev</code>

7. Clone the project and open in your computer

8. Run the following command

<code>skaffold dev</code>

9. Go to your chrome browser and navigate to employee.dev

10. on the page type "thisisunsafe"

11. Enjoy the app!!!
