ARG NODE_BUILD_VERSION="22.7.0-bookworm@sha256:54b7a9a6bb4ebfb623b5163581426b83f0ab39292e4df2c808ace95ab4cba94f"
ARG NODE_RUNTIME_VERSION="22.7.0-bookworm-slim@sha256:1289f8e0bf3a182990d1d046f8ab2a5d45814f8b40b41963650a42c30c91f39e"

# -------------------------------------------------------------------------------------------------

FROM node:${NODE_BUILD_VERSION} AS base

WORKDIR /usr/src/himama-photo-downloader/

# -------------------------------------------------------------------------------------------------

FROM node:${NODE_RUNTIME_VERSION} AS base-slim

WORKDIR /usr/src/himama-photo-downloader/

# -------------------------------------------------------------------------------------------------

FROM base AS dependencies

WORKDIR /usr/src/
COPY package.json package-lock.json tsconfig.json /usr/src/
RUN npm install --prefer-offline --frozen-lockfile

# -------------------------------------------------------------------------------------------------

FROM base AS dev

COPY --from=dependencies /usr/src/ /usr/src/
COPY . /usr/src/himama-photo-downloader/
WORKDIR /usr/src/himama-photo-downloader/
ENTRYPOINT [ "npm" ]
CMD [ "run", "dev" ]
