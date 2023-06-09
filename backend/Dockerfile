FROM node:16 AS builder


# RUN cd /tmp && \
#     apt update && \
#     wget https://downloadarchive.documentfoundation.org/libreoffice/old/7.4.1.1/deb/x86_64/LibreOffice_7.4.1.1_Linux_x86-64_deb.tar.gz && \
#     apt install -y libxinerama1 libfontconfig1 libdbus-glib-1-2 libcairo2 libcups2 libglu1-mesa libsm6 libnss3 && \
#     tar -zxvf LibreOffice_7.4.1.1_Linux_x86-64_deb.tar.gz && \
#     cd LibreOffice_7.4.1.1_Linux_x86-64_deb/DEBS && \
#     dpkg -i *.deb && \
#     rm -r /tmp/* && \
#     apt-get autoremove -y && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*


WORKDIR /tmp

RUN apt update && apt install -y libxinerama1 libfontconfig1 libdbus-glib-1-2 libcairo2 libcups2 libglu1-mesa libsm6 unzip && apt install ttf-mscorefonts-installer
# Download LibreOffice
RUN wget https://downloadarchive.documentfoundation.org/libreoffice/old/7.4.1.1/deb/x86_64/LibreOffice_7.4.1.1_Linux_x86-64_deb.tar.gz -O libo.tar.gz \
    && tar -zxvf libo.tar.gz
# Install LibreOffice
WORKDIR /tmp/LibreOffice_7.4.1.1_Linux_x86-64_deb/DEBS
RUN dpkg -i *.deb

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:16

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/print-files ./print-files

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]