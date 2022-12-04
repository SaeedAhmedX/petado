FROM node:16

RUN apt update

RUN apt install -y \
  build-essential \
  zlib1g-dev \
  libssl-dev \
  curl \
  libbz2-dev

RUN apt-get install -y default-mysql-client

# Adding a new user to avoid permission issues
RUN addgroup --gid 999 developer
RUN adduser --disabled-password --gecos '' --uid 999 --gid 999 developer

# Install the latest version of Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.19

# Switching user
USER developer

WORKDIR /workspace

COPY package*.json ./
COPY . .

ENTRYPOINT ["tail", "-f", "/dev/null"]
