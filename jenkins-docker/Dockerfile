FROM docker:27-cli AS dockercli
FROM bitnami/kubectl:latest AS kubectlbin
FROM jenkins/jenkins:lts

USER root

COPY --from=dockercli /usr/local/bin/docker /usr/local/bin/docker
COPY --from=kubectlbin /opt/bitnami/kubectl/bin/kubectl /usr/local/bin/kubectl

RUN chmod +x /usr/local/bin/docker /usr/local/bin/kubectl

USER jenkins
